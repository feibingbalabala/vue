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