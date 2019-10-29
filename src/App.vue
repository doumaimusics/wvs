<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import TabBar from '@/components/tabbar/tabbar.vue'
export default {
  components:{
    TabBar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.mint-toast{
  z-index: 999999999999!important;
}

</style>
