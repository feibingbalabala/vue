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
## 子路由
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
    
    const firstFirst = {
      template: '<div>firstFirst</div>'
    }
    const firstSecond = {
      template: '<div>firstSecond</div>'
    }
    const home = {
      template: '<div>Home</div>'
    }
    const firstChild = {
      template: '<div><h2>firstChild</h2><router-view></router-view></div>'
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
          component: firstChild,
          children: [
            {path: '/', component: first},
            {path: 'first', component: firstFirst},
            {path: 'second', component: firstSecond}
          ]
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
                  <ol>
                    <li><router-link to="/">home</router-link></li>
                    <li><router-link to="/first">first</router-link></li>
                    <li>
                      <ol>
                        <li><router-link to="/first/first">first</router-link></li>
                        <li><router-link to="/first/second">first</router-link></li>
                      </ol>
                    </li>
                    <li><router-link to="/second">second</router-link></li>
                  </ol>
                  <h1>显示区域</h1>
                  <router-view></router-view>
                </div>`
    }).$mount('#app')
```
## 路由传参
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
    
    const firstFirst = {
      template: '<div>firstFirst<P>id：{{$route.params.id}}</P></div>'
    }
    const firstSecond = {
      template: '<div>firstSecond</div>'
    }
    const home = {
      template: '<div>Home</div>'
    }
    const firstChild = {
      template: '<div><h2>firstChild</h2><router-view></router-view></div>'
    }
    const router = new VueRouter({
      mode: 'history',
      base: __dirname,
      routes: [
        {
          path: '/',
          name: 'Home',
          component: home
        },
        {
          path: '/first',
          // name: 'Home-first', // 由于first有子路由，所以这个name并不会生效，只能在下面设置
          component: firstChild,
          children: [
            {path: '/',name: 'Home-first', component: first},
            {path: 'first', name: 'Home-first-first', component: firstFirst}, // 1、通过路由表传参
            {path: 'second', name: 'Home-first-second', component: firstSecond}
          ]
        },
        {
          path: '/second',
          name: 'Home-second',
          component: second
        }
      ]
    })
    
    new Vue({
      router,
      template: `<div id="r">
                  <h1>导航</h1>
                  <P>{{ $route.name }}</P>
                  <ol>
                    <li><router-link to="/">home</router-link></li>
                    <li><router-link to="/first">first</router-link></li>
                    <li>
                      <ol>
                        <li><router-link :to="{name: 'Home-first-first', params: {id: 123}}">first</router-link></li> 
                        // 2、通过绑定的参数传递，这里还可以用path: '填写路径'
                        <li><router-link to="/first/second">first</router-link></li>
                      </ol>
                    </li>
                    <li><router-link to="/second">second</router-link></li>
                  </ol>
                  <h1>显示区域</h1>
                  <router-view></router-view>
                </div>`
    }).$mount('#app')
```
## 路由表的组件群
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
    
    const home2 = {
      template: '<div>Home2</div>'
    }
    const router = new VueRouter({
      mode: 'history',
      base: __dirname,
      routes: [
        {
          path: '/',
          components: {
            default: home,
            left: first,
            right: second
          }
        },
        {
          path: '/first',
          components: {
            default: home2,
            left: first,
            right: second
          }
        }
      ]
    })
    
    new Vue({
      router,
      template: `<div id="r">
                  <h1>导航</h1>
                  <ol>
                    <li><router-link to="/">home</router-link></li>
                    <li><router-link to="/first">first</router-link></li>
                  </ol>
                  <h1>显示区域</h1>
                  <router-view></router-view>
                  <router-view name="left" style="float: left;width: 50%; background-color: #ff6600;height: 300px"></router-view>
                  <router-view name="right" style="float: left;width: 50%; background-color: #fff600;height: 300px"></router-view>
                </div>`
    }).$mount('#app')
```
## URL传值
```
    import Vue from 'vue'
    import VueRouter from 'vue-router'
    
    Vue.use(VueRouter)
    
    const router = new VueRouter({
      mode: 'history',
      base: __dirname,
      routes: [
        {
          path: '/'
        },
        {
          path: '/params/:aaa/:bbb'//冒号绑定数据
        },
        {
          path: '/params-regex/:id(\\d+)'//正则表达式，数字开头的所有。
        }
      ]
    })
    
    new Vue({
      router,
      template: `<div>
                  <h1>good morning</h1>
                  <ul>
                    <li>
                      <router-link to="/">HOME</router-link>
                    </li>
                    <li>
                      <router-link to="params/111/222">params</router-link>
                    </li>
                    <li>
                      <router-link to="params-regex/111">params-regex</router-link>
                    </li>
                  </ul>
                  <p>show</p>
                  <p>aaa：{{$route.params.aaa}}</p>
                  <p>bbb：{{$route.params.bbb}}</p>
                  <p>id：{{$route.params.id}}</p>
                </div>`
    }).$mount('#app')
```