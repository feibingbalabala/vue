# vue

> vue的基础配置，router实践，vuex的使用。

## 安装vue-cli的构建工具
1. 全局安装vue-cli：npm install vue-cli -g</br>
2. 检测是否安装成功：vue -v</br>
3. 在要新建项目的文件夹下执行npm init webpack <项目名称></br>
4. 弹出一些命名把：</br>
      name：项目名称；</br>
      version：版本号；</br>
      descriptin：描述；</br>
      router：路由；</br>
      ESLint：代码检查；</br>
      unit tests：单元测试；</br>
      e2e tests：自动化测试；</br>
5. cd 项目目录</br>
6. npm install下载依赖</br>

## 目录结构
  build：构建脚本目录；</br>
  config：配置目录；</br>
  src：源码目录；</br>

## 路由
__dirname在node js 下，指的是当前的本地路径。</br>
在src/main.js下
```
    import Vue from 'vue'
    import Router from './Router' // 这个引入的是src/Router.js
```
在src目录下新建Router.js注意首字母大写</br>
```
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const first = {
  template: '<div>first</div>'
}
const second = {
  template: '<div>second</div>'
}
const home = {
  template: '<div>Home</div>'
}

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: home
    },
    {
      path: '/first',
      component: first
    },
    {
      path: '/second',
      component: second
    }
  ]
})

new Vue({
  router,
  template: `<div id="r">
              <h1>导航</h1>
              <ul>
                <li><router-link to="/">home</router-link></li>
                <li><router-link to="/first">first</router-link></li>
                <li><router-link to="/second">second</router-link></li>
              </ul>
              <h1>显示区域</h1>
              <router-view></router-view>
            </div>`
}).$mount('#app') // 将组件挂载在入口文件也就是项目根目录的index.html下的<div id="app"></div>
```