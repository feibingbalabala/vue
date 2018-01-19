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
    return state.count += 100
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters
})