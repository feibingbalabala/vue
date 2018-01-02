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
}).$mount('#app')