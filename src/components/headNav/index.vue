<template>
  <div class="headNavSec1">
    <div class="headNavSec2" v-on:click="$router.go(-1)" v-show="!$attrs.hideBackBtn">
      <img class="headNavImg1" src="../../assets/img/3_login_03.ada9998.png">
    </div>
    <span v-text="$route.meta.title"></span>
  </div>
</template>

<script>
  export default {
    name: 'headNav',
    methods: {
    },
    mounted (){
      let vm = this;
      // setInterval(function () {
      //   console.log(vm.$store.state.token1);
      // },2000)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .headNavSec1{
    height: 50px;
    line-height: 50px;
    color: #262833FF;
    text-align: center;
    background: #FFFFFFFF;
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    font-size: 16px;
    z-index: 10;
  }
  .headNavSec2{
    width: 40px;
    height: 50px;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .headNavImg1{
    width: 18px;
  }
</style>
