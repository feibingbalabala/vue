import Vue from 'vue'
import VueRouter from 'vue-router'
import parent from './transition' // vue组件引入
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