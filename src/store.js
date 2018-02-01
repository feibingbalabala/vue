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