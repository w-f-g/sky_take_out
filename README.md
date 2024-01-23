---
typora-copy-images-to: images
---

# 前言
**人若不为形所累，眼前便是大罗天。** 何必执着于用的什么语言，用的什么框架呢？

# 简介
基于 `nest.js` 和 `vue3` 实现的前后端分离版 `黑马苍穹外卖项目`，采用 `monorepo` 的开发模式。

# 服务端
由于是采用 `Node.js` 进行的开发，而 `Node.js` 与 `Java` 之间存在着许多差异，以及一些不可抗力因素等，所以对部分功能进行了修改。

1、在 `Java` 中 `WebSocket` 貌似可以和后台服务共用同一端口，而在 `Node` 中无法共用同一端口，所以后台服务运行在 **8080** 端口，`WebSocket` 服务运行在 **8081** 端口。
2、在 `Java` 中可以向 `WebSocket` 路径传递 **Param**，而在 `Node` 中我采用的 `ws` 模块好像没法做到。
3、不想花钱开通 `OSS` 服务，所以文件上传到本地目录了。
4、开发阶段调用微信支付接口进行支付测试时必须支付 **0.01** 元，本来目前没有开通微信支付的硬性需求，所以就不浪费这个钱了，在调用 `/user/order/payment` 接口的时候会直接走支付成功的逻辑，为此我还修改了 `packages\wxapp\pages\pay\index.js` 的代码。
5.由于小程序源码中 **再来一单** 请求方法定义的有问题，所以修改了下 `packages\wxapp\common\vendor.js` 的代码，见下图。
![36702288E8D7CB2B](E:\project\servers\sky_take_out\images\36702288E8D7CB2B.png)
6.接入百度地图判断是否超出配送范围功能没做。