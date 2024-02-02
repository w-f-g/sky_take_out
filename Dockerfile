# 指定基础镜像
# FROM node:18.16.1-alpine3.18 AS base
FROM node:20.11.0-alpine3.18 AS base
# ENV PNPM_HOME="/pnpm"
# ENV PATH="$PNPM_HOME:$PATH"
RUN npm config set registry https://registry.npmmirror.com/
RUN npm install -g pnpm
# 
# RUN corepack enable

# 基于上面定义的 base 镜像，对 pnpm workspace 中的 packages 进行构建
FROM base AS build
# 指定 /app 为工作目录
WORKDIR /app
# 将本地 pnpm workspace 工程中的代码拷贝到镜像中的 /app 工作目录
COPY . /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
# 将 pnpm workspace 中的所有 package 执行 build 操作
RUN pnpm run -r build
# pnpm deploy 表示使用 pnpm 包管理器执行部署操作
# 指定只部署 server 包中的模块，并且只安装 production 环境下的依赖，部署在容器中的 /server 目录下
RUN pnpm deploy --filter=server --prod /server

# 基于上面定义的 base 镜像，对 server 模块进行构建
FROM base AS server
# 指定 /app 为工作目录
WORKDIR /app
# 将上面定义的 build 镜像中 server 模块的构建产物拷贝到 /app 工作目录
# COPY --from=build /server .
COPY --from=build /server/public ./public
COPY --from=build /server/template ./template
COPY --from=build /server/node_modules ./node_modules
COPY --from=build /server/dist ./dist
COPY --from=build /server/package.json /server/.env.production ./
# 设置时区，解决定时任务时间不准的问题
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
# 导出 8080 和 8081 端口
EXPOSE 8080 8081
# 启动 server 服务
CMD ["node", "/app/dist/main.js"]