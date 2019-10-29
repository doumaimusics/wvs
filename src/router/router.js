import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/*
vue - router≥ 3.0 版本回调形式以及改成promise api的形式了， 返回的是一个promise， 如果没有捕获到错误， 控制台始终会出现如图的警告， 针对于路由跳转相同的地址， 目前的解决方案: this.$router.push('/location').catch(err => {
  console.log(err)
})
或者如下代码
*/
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

/*
requireAuth 判断是否需要登录
*/

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      redirect: {
        name: 'homePage'
      }

    },
    // 登录
    {
      path: '/login',
      name:'login',
      component:() => import('@/views/login/login'),
      meta:{
        title: '会员登录',
        requireAuth: true
      }
    },
    // 注册
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/login/register'),
      meta:{
        title: '注册',
        requireAuth: false
      }
    },
    // 忘记密码页面
    {
      path: '/forgetThepass',
      name: 'forgetThepass',
      component: () => import('@/views/login/forgetThepass'),
      meta: {
        title:'忘记密码',
        requireAuth: false
      }
    },

    // 首页
    {
      path:'/homePage',
      name:'homePage',
      component: () => import('@/views/main/homePage/index'),
      meta:{
        title:'首页',
        requireAuth:true
      }
    },
    // 趣味
    {
      path: '/interestPage',
      name: 'interestPage',
      component: () => import('@/views/main/interestPage/index'),
      meta:{
        title: '趣味',
        requireAuth: true
      }
    },
    // 分享
    {
      path: '/sharePage',
      name: 'sharePage',
      component: () => import('@/views/main/sharePage/index'),
      meta: {
        title: '分享',
        requireAuth: true
      }
    },
    // 我的
    {
      path: '/ownPage',
      name: 'ownPage',
      component: () => import('@/views/main/ownPage/index'),
      meta: {
        title: '我的',
        requireAuth: true
      }
    },
    // 用户协议
    {
      path: '/userAgreement',
      name: 'userAgreement',
      component: () => import('@/views/agreement/userAgreement'),
      meta: {
        title: '用户协议',
        requireAuth: false
      }
    },
    // 充值页面
    {
      path: '/recharge',
      name: 'rechargePage',
      component: () => import('@/views/recharge/rechargePage'),
      meta: {
        title: '充值',
        requireAuth: true
      }
    },
    // 转账
    {
      path: '/transferAccounts',
      name: 'transferAccounts',
      component: () => import('@/views/transferAccounts/transferAccounts'),
      meta: {
        title: '转账',
        requireAuth: true
      }
    },
    // 收益提取
    {
      path: '/withdrawMoney',
      name: 'withdrawMoney',
      component: () => import('@/views/withdrawMoney/withdrawMoney'),
      meta: {
        title: '收益提取',
        requireAuth: true
      }
    },
    // 动态提取
    {
      path: '/dynamicMoney',
      name: 'dynamicMoney',
      component: () => import('@/views/withdrawMoney/dynamicMoney'),
      meta: {
        title: '动态提取',
        requireAuth: true
      }
    },
    // 交易明细
    {
      path: '/transactionDetails',
      name: 'transactionDetails',
      component: () => import('@/views/transactionDetails/transactionDetails'),
      meta: {
        title: '交易明细',
        // requireAuth: true
      }
    },
    // 系统设置
    {
      path: '/systemSetUp',
      name: 'systemSetUp',
      component: () => import('@/views/systemSetUp/systemSetUp'),
      meta: {
        title: '系统设置',
        requireAuth: true
      }
    },
    // 修改登录密码
    {
      path: '/changePassword',
      name: 'changePassword',
      component: () => import('@/views/login/changePassword'),
      meta:{
        title: '登录密码',
        requireAuth: true
      }
    },
    // 交易密码
    {
      path: '/transactionPassword',
      name: 'transactionPassword',
      component: () => import('@/views/transactionPassword/transactionPassword'),
      meta: {
        title: '交易密码',
        requireAuth: true
      }
    },
    // 语言切换
    {
      path: '/langSetPage',
      name: 'langSetPage',
      component: () => import('@/views/langSetPage/langSetPage'),
      meta: {
        title: '语言切换',
        requireAuth: false
      }
    },
    {
      path: '/withdraw1',
      name: 'withdraw1',
      component: () => import('@/views/mine/withdraw1'),
      meta: {
        title: '本金提取',
        requireAuth: true
      }
    },
    {
      path: '/taste',
      name: 'taste',
      component: () => import('@/views/main/tastePage'),
      meta: {
        title: '趣味'
      }
    },
    {
      path: '/share',
      name: 'share',
      component: () => import('@/views/main/sharePage'),
      meta: {
        title: '分享'
      }
    },
    {
      path: '/inviteList',
      name: 'inviteList',
      component: () => import('@/views/mine/inviteList'),
      meta: {
        title: '邀请记录'
      }
    },
    {
      path: '/tourism',
      name: 'tourism',
      component: () => import('@/views/main/tourism/index'),
      meta: {
        title: '旅游'
      }
    },

  ],
  
})
