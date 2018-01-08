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