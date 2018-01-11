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