# 前言
**人若不为形所累，眼前便是大罗天。** 何必执着于用的什么语言，用的什么框架呢？

# 简介
基于 `nest.js` 和 `vue3` 实现的前后端分离版 `黑马苍穹外卖项目`，采用 `monorepo` 的开发模式。

# 服务端
由于是采用 `Node.js` 进行的开发，而 `Node.js` 与 `Java` 之间存在着许多差异，以及一些不可抗力因素等，所以对部分功能进行了修改。

1. 在 `Java` 中 `WebSocket` 貌似可以和后台服务共用同一端口，而在 `Node` 中无法共用同一端口，所以后台服务运行在 **8080** 端口，`WebSocket` 服务运行在 **8081** 端口。
2. 在 `Java` 中可以向 `WebSocket` 路径传递 **Param**，而在 `Node` 中我采用的 `ws` 模块好像没法做到。
3. 不想花钱开通 `OSS` 服务，所以文件上传到本地目录了。
4. 开发阶段调用微信支付接口进行支付测试时必须支付 **0.01** 元，本来目前没有开通微信支付的硬性需求，所以就不浪费这个钱了，在调用 `/user/order/payment` 接口的时候会直接走支付成功的逻辑，为此我还修改了 `packages\wxapp\pages\pay\index.js` 的代码。
5. 由于小程序源码中 **再来一单** 请求方法定义的有问题，所以修改了下 `packages\wxapp\common\vendor.js` 的代码，见下图。
![36702288E8D7CB2B](E:\project\servers\sky_take_out\images\36702288E8D7CB2B.png)
6. 接入百度地图判断是否超出配送范围功能没做。

## 启动
```bash
# 进入到 packages/server 路径
pnpm start

# or
pnpm start:dev
```

## 部署

```bash
# 在 workspace 根路径下运行
pnpm build:server
```
等到命令执行完毕以后访问 workspace 根目录下的 `dist` 文件夹，找到文件夹中的 `sky_take_out_server.tar.gz`，将它上传到你的服务器，然后在服务器中执行以下命令。
```bash
# 载入 docker 镜像
docker load < sky_take_out_server.tar.gz

# 运行 docker 容器
docker run -d -p 8080:8080 -p 8081:8081 -v /var/sky_take_out/public:/app/public sky_take_out_server
```

# 前端-管理端
技术栈：vue3+ts+pinia

## 启动
```bash
# 进入到 packages/web 路径
pnpm dev
```

## 部署
```bash
# 在 workspace 根路径下执行
pnpm build:web

# or
# 进入到 packages/web 路径
pnpm build
```
执行完打包命令以后，访问 workspace 根目录的 `dish` 文件夹，找到 `sky` 文件夹，将它压缩好以后上传到你的服务器，然后找到你的 `nginx.conf` 文件，参考如下配置进行修改。

```conf
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    gzip  on;
    gzip_static on;

    server {
        listen       5174;
        server_name  localhost;
        proxy_set_header Host $host:$server_port;

        location / {
            root    /app;

            set $gz ".gz";
            if (-f $request_filename$gz) {
                rewrite $request_filename $request_filename$gz break;
            }

            try_files   $uri $uri/ /index.html;
        }
        
        location /api {
            proxy_pass http://127.0.0.1:8080;
        }
    }
}
```
**注意：**由于我在打包的时候就将产物进行了 gzip 压缩，所以在你的 nginx 配置中需要开启 `gzip_static`。
