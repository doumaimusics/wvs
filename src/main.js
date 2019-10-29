import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './assets/mui/js/fun/app.js'

import Apps from '@/assets/mui/js/fun/app'

import Api from './api/index'
import PublicFun from './utils/publicFun'    // 公用方法

import './mintUi'   // 按需引入mintUi 组建   如需配置到mintUi.js去配置
Vue.prototype.$api = Api; //配置axios请求,  使用  this.$api.post(url,data,res)



import '@/assets/mui/css/mui.css' // mui.css样式
import '@/assets/mui/css/app.css'   // app.css

import  './utils/validate'   // 表单验证

router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.requireAuth)) {    // 需要登录
    if(window.localStorage.token && window.localStorage.isLogin === '1'){
      next()
    } else if (to.path !== '/login') {
      let token = window.localStorage.token;
      if (token === 'null' || token === '' || token === undefined){
          next({path: '/login'})
          Toast({ message: '检测到您还未登录,请登录后操作！', duration: 1500 })
      }
    } else {
      next()
    }
  } else {   // 不需要登录
    next()
  }
})
Vue.prototype.$publicFun = PublicFun   // 挂载全局公用方法
Vue.prototype.$apps = Apps    //  app.js公用方法
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

