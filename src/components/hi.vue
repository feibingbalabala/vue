<template>
  <div>
    <router-link to="/">hello</router-link>
    <h1>{{msg}}</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "this is hi"
    }
  }
}
</script>
