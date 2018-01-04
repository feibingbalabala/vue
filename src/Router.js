import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = {
  template: `<div>
                <h2>Home</h2>
            </div>`
}
const about = {
  template: `<div>
                <h2>about</h2>
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
      path: '/about',
      name: 'about',
      component: about
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
                <li>
                  <router-link to='about' append>append</router-link>
                </li>
                <li>
                  <router-link to='/about' exact>exact</router-link>
                </li>
              </ul>
              <router-view></router-view>
            </div>`
}).$mount('#app')