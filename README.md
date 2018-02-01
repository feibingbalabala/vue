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
                      <router-link to="/params/111/222">params</router-link>
                    </li>
                    <li>
                      <router-link to="/params-regex/111">params-regex</router-link>
                    </li>
                  </ul>
                  <p>show</p>
                  <p>aaa：{{$route.params.aaa}}</p>
                  <p>bbb：{{$route.params.bbb}}</p>
                  <p>id：{{$route.params.id}}</p>
                </div>`
    }).$mount('#app')
```

## query和params的区别
params需要在路由表做绑定设置，<br/>
query直接在:to="{path: '', query: {}}"<br/>
设置 append 属性后，则在当前（相对）路径前添加基路径。例如，我们从 /a 导航到一个相对路径 b，如果没有配置 append，则路径为 /b，如果配了，则为 /a/b.<br/>
exact: "是否激活" 默认类名的依据是 inclusive match （全包含匹配）。 举个例子，如果当前的路径是 /a 开头的，那么 <router-link to="/a"> 也会被设置 CSS 类名。
```
    import Vue from 'vue'
    import VueRouter from 'vue-router'
    
    Vue.use(VueRouter)
    
    const Home = {
      template: `<div>
                    <h2>Home</h2>
                </div>`
    }
    const users = {
      template: `<div>
                    <h2>Users</h2>
                    <router-view></router-view>
                </div>`
    }
    const user = {
      template: `<div>
                    <h2>User</h2>
                    {{ $route.params.username}} -
                    {{ $route.query.id}}
                </div>`
    }
    const router = new VueRouter({
      mode: 'history',
      base: __dirname,
      routes: [
        {
          path: '/',
          name: 'Home',
          component: Home
        },
        {
          path: '/users',
          component: users,
          children: [
            {
              path: ':username',
              name: 'user',
              component: user
            }
          ]
        }
      ]
    })
    
    new Vue({
      router,
      template: `<div>
                  <h1>导航</h1>
                  <ul>
                    <li>
                      <router-link to="/">HOME</router-link>
                    </li>
                    <li>
                      <router-link to="/first">first</router-link>
                    </li>
                      <ol>
                        <li>
                            <router-link :to="{path: '/users/wos', query: {id: '123'}}">ABS</router-link>
                        </li>
                      </ol>
                  </ul>
                  <router-view></router-view>
                </div>`
    }).$mount('#app')
```
## 路由重定向
路由重定向可以有三种方式。
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
            {path: 'first', name: 'Home-first-first', component: firstFirst}, 
            {path: 'second', name: 'Home-first-second', component: firstSecond},
            {path: 'third', redirect: 'first'} // 1、路由重定向
          ]
        },
        {
          path: '/second',
          name: 'Home-second',
          component: second
        },
        // 2、带参数的路由重定向start
        {
          path: '/four/:id',
          name: 'Home-four',
          component: firstFirst
        },
        {
          path: '/five/:id',
          redirect: '/four/:id'
        },
        // 2、带参数的路由重定向end
        // 3、用函数的方式进行重定向
        {
          path: '/six/:id',
          redirect: item => {
            const {hash, params, query} = item;
            console.log(item);
            if (params.id == '001') {
              return '/second'
            }
          }
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
                        <li><router-link to="/first/second">second</router-link></li>
                        <li><router-link to="third">third</router-link></li>
                      </ol>
                    </li>
                    <li><router-link to="/second">second</router-link></li>
                    <li><router-link to="/four/890">four</router-link></li>
                    <li><router-link to="/five/250">five</router-link></li>
                    <li><router-link to="/six/001">six</router-link></li>
                  </ol>
                  <h1>显示区域</h1>
                  <router-view></router-view>
                </div>`
    }).$mount('#app')
```
## 别名alias
我的理解就是不同的url映射同一个模版
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
            {path: 'first', name: 'Home-first-first', component: firstFirst}, 
            {path: 'second', name: 'Home-first-second', component: firstSecond},
            {path: 'third', redirect: 'first'} // 1、路由重定向
          ]
        },
        {
          path: '/second',
          name: 'Home-second',
          component: second,
          alias: '/thired'
        },
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
                        <li><router-link to="/first/second">second</router-link></li>
                        <li><router-link to="third">third</router-link></li>
                      </ol>
                    </li>
                    <li><router-link to="/second">second</router-link></li>
                    <li><router-link to="/thired">thired</router-link></li>
                  </ol>
                  <h1>显示区域</h1>
                  <router-view></router-view>
                </div>`
    }).$mount('#app')
```
## 路由动画

### 页面动画
新建：src/transition.vue
```
    <template>
      <div>
        <button @click="show = !show">show/hide text</button>
        <transition name="fade">
          <p v-show="show">this is an animation</p>
        </transition>
      </div>
    </template>
    <script>
      export default {
        name: 'demo',
        data() {
          return {
            show: true
          }
        }
      }
    </script>
    <style scoped>
    /* 作用域：scoped 
       只作用域当前的vue文件，如果去掉则作用域全局作用域
    */
    .fade-enter-active, .fade-leave-active {
      transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-active {
      opacity: 0;
    }
    </style>
```
src/main.js
```
import Vue from 'vue'
import transition from './transition'

new Vue({
   el: '#app',
   render: xx => xx(transition)
})
```
### 路由动画
src/Router.js
```
    import Vue from 'vue'
    import VueRouter from 'vue-router'
    
    Vue.use(VueRouter)
    
    const home = {
      template: `
        <div>
          <h2>home</h2>
          <p>This is home</p>
        </div>
      `
    }
    
    const parent = {
      template: `
        <div>
          <h2>parent</h2>
          <p>This is parent</p>
        </div>
      `
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
          path: '/parent',
          component: parent
        }
      ]
    })
    
    new Vue({
      router,
      template: `
        <div id="app">
          <h1>This is transition</h1>
          <ul>
            <li>
              <router-link to="/">home</router-link>
            </li>
            <li>
              <router-link to="/parent">parent</router-link>
            </li>
          </ul>
          // mode：动画模式，有两个参数out-in：我先出去你在进来，in-out：我先进来你再出去
          <transition name="fade" mode="in-out">
            <router-view></router-view>
          </transition>
        </div>
      `
    }).$mount("#app")
```
main.js
```
import Vue from 'vue'
import Router from './Router'
```
入口文件index.html
```
    <style>
      .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s;
      }
      .fade-enter, .fade-leave-active {
        opacity: 0;
      }
    </style>
```
### 动画修改
src/Router.js
```
    import Vue from 'vue'
    import VueRouter from 'vue-router'
    
    Vue.use(VueRouter)
    
    const home = {
      template: `
        <div>
          <h2>home</h2>
          <p>This is home</p>
        </div>
      `
    }
    
    const parent = {
      template: `
        <div>
          <h2>parent</h2>
          <p>This is parent</p>
        </div>
      `
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
          path: '/parent',
          component: parent
        }
      ]
    })
    
    new Vue({
      router,
      data() {
        return {
          transition: 'fade'
        }
      },
      template: `
        <div id="app">
          <h1>This is transition</h1>
          <ul>
            <li>
              <router-link to="/">home</router-link>
            </li>
            <li>
              <router-link to="/parent">parent</router-link>
            </li>
          </ul>
          <transition :name="transition" mode="in-out">
            <router-view></router-view>
          </transition>
        </div>
      `,
      watch: {
        '$route' (to, from) {
          if (from.path == '/parent') {
            this.transition = 'fade'
          } else {
            this.transition = 'fade2'
          }
        }
      }
    }).$mount("#app")
```
main.js
```
import Vue from 'vue'
import Router from './Router'
```
入口文件index.html
```
    <style>
      .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s;
      }
      .fade-enter, .fade-leave-active {
        opacity: 0;
      }
      .fade2-enter-active, .fade2-leave-active {
        transition: opacity 2s;
      }
      .fade2-enter, .fade2-leave-active {
        opacity: 0;
      }
    </style>
```
## 404页面
`*`的配置，在早期版本需要放在最后一个，他就像是switch那种遍历到了`*`就不循环下去了。
3.0.1版本后可以放在任何位置。
```
    import Vue from 'vue'
    import VueRouter from 'vue-router'
    
    Vue.use(VueRouter)
    
    const home = {
      template: `
        <div>
          <h2>home</h2>
          <p>This is home</p>
        </div>
      `
    }
    
    const parent = {
      template: `
        <div>
          <h2>parent</h2>
          <p>This is parent</p>
        </div>
      `
    }
    
    const error = {
      template: `
        <div>
          <h2>error</h2>
          <p>This is error404</p>
        </div>
      `
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
          path: '/parent',
          component: parent
        },
        {
          path: '*',
          component: error // 404的配置
        }
      ]
    })
    
    new Vue({
      router,
      data() {
        return {
          transition: 'fade'
        }
      },
      template: `
        <div id="app">
          <h1>This is transition</h1>
          <ul>
            <li>
              <router-link to="/">home</router-link>
            </li>
            <li>
              <router-link to="/parent">parent</router-link>
            </li>
            <li>
              <router-link to="/paradsent">404页面</router-link>
            </li>
          </ul>
          <transition :name="transition" mode="in-out">
            <router-view></router-view>
          </transition>
        </div>
      `
    }).$mount("#app")
```
## hash路由和history路由
[文档](https://router.vuejs.org/zh-cn/essentials/history-mode.html)
```
    import Vue from 'vue'
    import VueRouter from 'vue-router'
    import parent from './components/transition' // vue组件引入
    Vue.use(VueRouter)
    
    const home = {
      template: `
        <div>
          <h2>home</h2>
          <p>This is home</p>
        </div>
      `
    }
    
    
    const router = new VueRouter({
      mode: 'hash', // router默认hash路由也就是url上有一个#，可以使用history
      base: __dirname,
      routes: [
        {
          path: '/', 
          component: home
        },
        {
          path: '/parent',
          component: parent
        }
      ]
    })
    
    new Vue({
      router,
      data() {
        return {
          transition: 'fade'
        }
      },
      template: `
        <div id="app">
          <h1>This is transition</h1>
          <ul>
            <li>
              <router-link to="/">home</router-link>
            </li>
            <li>
              <router-link to="/parent">parent</router-link>
            </li>
          </ul>
          <transition :name="transition" mode="in-out">
            <router-view></router-view>
          </transition>
        </div>
      `
    }).$mount("#app")
```
## 路由钩子
```
    import Vue from 'vue'
    import VueRouter from 'vue-router'
    import parent from './components/transition' // vue组件引入
    Vue.use(VueRouter)
    
    const home = {
      template: `
        <div>
          <h2>home</h2>
          <p>This is home</p>
        </div>
      `,
      beforeRouteEnter: (to, from, next) => {
        console.log("0",to);
        console.log("0",from);
        next(); // 可以跳转 路由进入时
      },
      beforeRouteLeave: (to, from, next) => {
        console.log("1",to);
        console.log("1",from);
        next(); // 可以跳转 路由离开时
      }
    }
    
    
    const router = new VueRouter({
      mode: 'history', // router默认hash路由也就是url上有一个#，可以使用history
      base: __dirname,
      routes: [
        {
          path: '/', 
          component: home
        },
        {
          path: '/parent',
          component: parent,
          beforeEnter: (to, from, next) => {
            console.log(to);
            console.log(from);
            next(); // 可以跳转
            // next(false); // 不可以跳转
            // next({path: '/'}) // 指定路径
          }
        }
      ]
    })
    
    new Vue({
      router,
      data() {
        return {
          transition: 'fade'
        }
      },
      template: `
        <div id="app">
          <h1>This is transition</h1>
          <ul>
            <li>
              <router-link to="/">home</router-link>
            </li>
            <li>
              <router-link to="/parent">parent</router-link>
            </li>
          </ul>
          <transition :name="transition" mode="in-out">
            <router-view></router-view>
          </transition>
        </div>
      `
    }).$mount("#app")
```

## vuex
npm install vuex --save <br />
src/stroe.js
```
    import Vue from 'vue';
    import Vuex from 'vuex';
    Vue.use(Vuex);
    
    const state = {
      count: 4
    }
    
    const mutations = {
      add(state) {
        state.count ++
      },
      del(state) {
        state.count --
      }
    }
    
    export default new Vuex.Store({
      state,
      mutations
    })
```
src/main.js
```
    import Vue from 'vue'
    // vuex
    import store from './store'
    import vuex from './components/vuex'
    
    new Vue({
      el: '#app',
      store,
      render: xx => xx(vuex)
    })
```
src/components/vuex.vue
```
    <template>
      <div id="app">
        <h1>vuex</h1>
        <p>{{ $store.state.count }}</p>
        <p>
          <button @click="$store.commit('add')">add</button>
          <button @click="$store.commit('del')">del</button>
        </p>
      </div>
    </template>
    <script>
      
    </script>
    <style>
    
    </style>
```
## state
静态数据的命名<br/>
这里需要注意一个点，vuex中的参数命名不能和data()中的相同，否则会出现命名重定义这个问题<br />
src/components/vuex.vue
```
<template>
  <div id="app">
    <h1>vuex</h1>
    <p>{{ $store.state.count }}-{{count}}-{{countA}}</p>
    <p>
      <button @click="$store.commit('add')">add</button>
      <button @click="$store.commit('del')">del</button>
    </p>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    name: 'app',
    data() {
      return {
        count: 1
      }
    },
    computed: {
      countA: function() {
        return this.$store.state.count + 1;
      }
    }
    // computed: mapState({
    //   countA: function(state) {
    //     return state.count + 1
    //   }
    // })
    // computed: mapState([
    //   "count"
    // ])
  }
</script>
<style>

</style>
```
### state多个参数
src/stroe.js
```
    import Vue from 'vue';
    import Vuex from 'vuex';
    Vue.use(Vuex);
    
    const state = {
      count: 4,
      num: 0
    }
    
    const mutations = {
      //传递第二参数
      add(state, n) {
        state.count ++;
        state.num = n;
      },
      del(state) {
        state.count --
      }
    }
    
    export default new Vuex.Store({
      state,
      mutations
    })
```
src/components/vuex.vue
```
    <template>
      <div id="app">
        <h1>vuex</h1>
        <p>state.count:{{ $store.state.count }}</p>
        <p>count:{{count}}</p>
        <p>countA:{{countA}}</p>
        <p>numA: {{numA}}</p>
        <p>
          <!-- 传递第二参数 -->
          <button @click="$store.commit('add', 1)">add</button>
          <button @click="$store.commit('del')">del</button>
        </p>
      </div>
    </template>
    <script>
      import {mapState} from 'vuex'
      export default {
        name: 'app',
        data() {
          return {
            count: 1
          }
        },
        computed: {
          countA: function() {
            return this.$store.state.count + 1;
          },
          numA: function() {
            return this.$store.state.num;
          }
        },
        // computed: mapState({
        //   countA: function(state) {
        //     return state.count + 1
        //   }
        // })
        // computed: mapState([
        //   "count"
        // 如果需要这么去使用的话，注意data()是否有相同的参数。
        // ])
      }
    </script>
    <style>
    
    </style>
```
## mutations
修改state的状态，必须通过commit来触发改变。<br />
mapMutations可以将vuex中的mutations方法取出来。<br />
src/components/vuex.vue
```
    <template>
      <div id="app">
        <h1>vuex</h1>
        <p>state.count:{{ $store.state.count }}</p>
        <p>count:{{count}}</p>
        <p>countA:{{countA}}</p>
        <p>numA: {{numA}}</p>
        <p>
          <!-- 传递第二参数 -->
          <button @click="$store.commit('add', 1)">add</button>
          <button @click="del">del</button>
        </p>
      </div>
    </template>
    <script>
      import {mapState, mapMutations} from 'vuex'
      export default {
        name: 'app',
        data() {
          return {
            count: 1
          }
        },
        computed: {
          countA: function() {
            return this.$store.state.count + 1;
          },
          numA: function() {
            return this.$store.state.num;
          }
        },
        methods: mapMutations([
          'add',
          'del'
        ])
      }
    </script>
    <style>
    
    </style>
```
## getter
就是一个计算属性，就是多个状态改变，这个getter也会改变。<br/>
computed: 不推荐使用尖头函数<br/>
es6中箭头函数的this指向的是上一层，并不是本层，（在conputed可能发生事件穿透。）<br />
src/stroe.js
```
    import Vue from 'vue';
    import Vuex from 'vuex';
    Vue.use(Vuex);
    
    const state = {
      count: 4,
      num: 0
    }
    
    const mutations = {
      add(state) {
        state.count ++;
      },
      del(state) {
        state.count --
      }
    }
    
    const getters = {
      count: function(state) {
        return state.count += 100
      }
    }
    
    export default new Vuex.Store({
      state,
      mutations,
      getters
    })
```
src/components/vuex.vue
```
<template>
  <div id="app">
    <h1>vuex</h1>
    <p>state.count:{{ $store.state.count }}</p>
    <p>count:{{count}}</p>
    <p>
      <!-- 传递第二参数 -->
      <button @click="$store.commit('add', 1)">add</button>
      <button @click="del">del</button>
    </p>
  </div>
</template>
<script>
  import {mapState, mapMutations, mapGetters} from 'vuex'
  export default {
    name: 'app',
    data() {
      return {}
    },
    computed: {
      ...mapState([
        "count"
      ]),
      // count() {
      //   return this.$store.getters.count
      // },
      ...mapGetters([
        "count"
      ])
    },
    methods: {
      ...mapMutations([
      'add',
      'del'
    ])}
  }
</script>
<style>

</style>
```
## Action

action是一个异步状态的更新（例如执行ajax），mutation是同步状态的更新。<br />
src/stroe.js
```
    import Vue from 'vue';
    import Vuex from 'vuex';
    Vue.use(Vuex);
    
    const state = {
      count: 4,
      num: 0
    }
    
    const mutations = {
      //传递第二参数
      add(state, n) {
        state.count ++;
        state.num = n;
      },
      del(state) {
        state.count --
      }
    }
    
    const getters = {
      count: function(state) {
        return state.count += 10
      }
    }
    
    const actions = {
      // 这个context代表整个state
      addplus (context) {
        context.commit('add', {a: 1});
        setTimeout(() => {
          context.commit('del')
        }, 300);
        console.log('first do')
      },
      delplus ({commit}) {
        commit('del')
      }
    }
    
    export default new Vuex.Store({
      state,
      mutations,
      getters,
      actions
    })
```
src/components/vuex.vue
```
<template>
  <div id="app">
    <h1>vuex</h1>
    <p>state.count:{{ $store.state.count }}</p>
    <p>count:{{count}}</p>
    <p>
      <!-- 传递第二参数 -->
      <button @click="$store.commit('add', 1)">add</button>
      <button @click="del">del</button>
    </p>
    <h2>action</h2>
    <p>
      <button @click="addplus">addplus</button>
      <button @click="delplus">delplus</button>
    </p>
  </div>
</template>
<script>
  import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
  export default {
    name: 'app',
    data() {
      return {}
    },
    computed: {
      ...mapState([
        "count"
      ]),
      // count() {
      //   return this.$store.getters.count
      // },
      // ...mapGetters([
      //   "count"
      // ])
    },
    methods: {
      ...mapMutations([
        'add',
        'del'
      ]),
      // action方法1
      // ...mapActions([
      //   'addplus',
      //   'delplus'
      // ]),
      // action方法2
      ...mapActions({
        addplus: 'addplus',
        delplus: 'delplus'
      }),
    }
  }
</script>
<style>

</style>

```