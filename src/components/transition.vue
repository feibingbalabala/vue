<template>
  <div>
    <button @click="show = !show">show/hide text</button>
    <transition name="fade">
      <p v-show="show">this is an animation</p>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'demo',
    data() {
      return {
        show: true
      }
    }
  }
</script>
<style scoped>
/* 作用域：scoped 
   只作用域当前的vue文件，如果去掉则作用域全局作用域
*/
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
