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

