# vue-music

<p>这是一个基于vue2.x全家桶和真实线上数据接口开发的一个媲美原生的移动端音乐App，已完成页面包括有歌单推荐页，歌手列表页，歌手详情页，播放器页面，排行榜页面和搜索页面。</p>

## 实现功能

- 轮播图无缝滚动效果
- 歌手与索引的左右联动效果
- 点击歌单、歌手以及排行榜会通过子路由切换到相应的详情页面
- 播放器以及迷你播放器组件切换的过渡动画
- 歌曲的播放、进度条操作、切换歌曲、切换播放模式、歌词联动功能
- 歌曲搜索，热门搜索展示，搜索历史的保存以及弹窗操作的功能

## 项目截图

<div align=center>
  <img src="https://github.com/xiaoyongsheng123/musicApp/blob/master/img/1.gif" width="30%">
  <img src="https://github.com/xiaoyongsheng123/musicApp/blob/master/img/2.gif" width="30%">
  <img src="https://github.com/xiaoyongsheng123/musicApp/blob/master/img/3.gif" width="30%">
  <img src="https://github.com/xiaoyongsheng123/musicApp/blob/master/img/4.gif" width="30%">
  <img src="https://github.com/xiaoyongsheng123/musicApp/blob/master/img/5.gif" width="30%">
  <img src="https://github.com/xiaoyongsheng123/musicApp/blob/master/img/6.gif" width="30%">
</div>

## 主要技术栈

- `Vue.js`(版本2.x)：`MVVM`框架
- `Vuex`：状态管理模式，采用集中式储存管理应用的所有组件的状态。
- `Vue Router`：`vue`构建单页面应用的前端路由
- `axios`、`jsonp`：服务端通讯，分别通过代理后端和跨域访问的方式抓取线上数据接口
- `better-scroll`：轻量且流畅的移动端滚动库
- `webpack 2.0`：构建工具
- `es6`：源码

## 组件关系图

## 要点总结

- 内容较多，在此另开一篇文章<a href="https://blog.csdn.net/xys666/article/details/82349957" target="_blank">https://blog.csdn.net/xys666/article/details/82349957</a>

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

