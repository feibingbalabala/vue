// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Router from './Router'
// import transition from './transition'
// import App from './App'
// import router from './router'

// Vue.config.productionTip = false

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   render: xx => xx(transition)
// })

// vuex
import store from './store'
import vuex from './components/vuex'

new Vue({
  el: '#app',
  store,
  render: xx => xx(vuex)
})