<template>
  <div id="app">
    <img src="./assets/logo.png">
    <p>{{a}}</p>
    <button @click="add">123</button>
    <!-- <router-view/> -->
  </div>
</template>

<script>
export default {
  name: 'app',
  beforeCreate: function() {
    console.log('1-beforeCreate 初始化之后')
  },
  created: function() {
    console.log('2-created 创建完成')
  },
  beforeMount: function() {
    console.log('3-beforeMount 挂载之前')
  },
  mounted: function() {
    console.log('4-mounted 被创建')
  },
  beforeUpdate: function() {
    console.log('5-beforeUpdate 数据更新前')
  },
  updated: function() {
    console.log('6-updated 数据更新后')
  },
  activated: function() {
    console.log('7-activated')
  },
  deactivated: function() {
    console.log('8-deactivated')
  },
  beforeDestroy: function() {
    console.log('9-beforeDestory 销毁之前')
  },
  destroyed: function() {
    console.log('10-destroyed 销毁之后')
  },
  data() {
    return {
      a: 1
    }
  },
  watch: {
    'a': function(newdata,olddata) {
      console.log(olddata +'更新成'+newdata)
    }
  },
  methods: {
    add() {
      this.a = 2
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
