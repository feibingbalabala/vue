<template>
  <div id="app">
    <h1>vuex</h1>
    <p>{{ $store.state.count }}-{{count}}-{{countA}}</p>
    <p>
      <button @click="$store.commit('add')">add</button>
      <button @click="$store.commit('del')">del</button>
    </p>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    name: 'app',
    data() {
      return {
        count: 1
      }
    },
    computed: {
      countA: function() {
        return this.$store.state.count + 1;
      }
    }
    // computed: mapState({
    //   countA: function(state) {
    //     return state.count + 1
    //   }
    // })
  }
</script>
<style>

</style>

