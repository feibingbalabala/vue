<template>
  <div id="app">
    <h1>vuex</h1>
    <p>{{ $store.state.count }}</p>
    <p>
      <button @click="$store.commit('add')">add</button>
      <button @click="$store.commit('del')">del</button>
    </p>
  </div>
</template>
<script>
  
</script>
<style>

</style>

