import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  buyAgainShow: false,
  shareMaskShow: false,
  user:null,
  isLogin:'0',
  mobile:'',  //手机号码
  passWord:'',  // 密码
  loginName:'',   // 用户Id
  userName:'',  // 用户名
  token:'',   // token
  userType:''  // 账户类型：手机或者邮箱
};


export default new Vuex.Store({
  state,
  getters:{
    getStorage(state){   // 获取本地存储的登录信息
      if(!state.user){
        state.user = JSON.parse(localStorage.getItem(key));
        state.isLogin = localStorage.getItem(isLogin);
        state.mobile = localStorage.getItem(mobile);
        state.passWord = localStorage.getItem(passWord);
        state.loginName = localStorage.getItem(loginName);
        state.userName = localStorage.getItem(userName);
        state.token = localStorage.getItem(token);
        state.userType = localStorage.getItem(userType);

      }
      return state.user
    }
  },
  mutations: {
    $_setMobile(state, value){// 设置手机号本地存储
        state.mobile = value;
        localStorage.setItem('mobile',value);
    },
    $_setPassWord(state, value) {   // 设置等密码
        state.passWord = value;
        localStorage.setItem('passWord', value);
    },
    $_setLoginName(state, value) { // 设置登录名字
        state.loginName = value;
        localStorage.setItem('loginName', value);
    },
    $_setUserName(state, value) { // 设置userName
        state.userName = value;
        localStorage.setItem('userName', value);
    },
    $_setToken(state, value) { // 设置token
        state.token = value;
        localStorage.setItem('token', value);
    },
    $_setUserType(state, value) { // 设置账户类型
        state.userType = value;
        localStorage.setItem('userType', value);
    },
    $_setLogin(state, value){   // 设置登录信息本地存储
      state.isLogin = value;
      localStorage.setItem('isLogin', value);
    },
    $_setStorage(state, value){   // 设置用户信息本地存储
      state.user = value;
      localStorage.setItem('key', JSON.stringify(value));
    },
    $_setLanguage(state, value){   // 设置语言
      state.user = value;
      localStorage.setItem('lang', value);
    },
    $_removeStorage(state, value){  // 删除本地存储
      state.user = null;
      localStorage.removeItem('isLogin');
      localStorage.removeItem('loginName');
      localStorage.removeItem('userName');
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
      localStorage.removeItem('lang');

    },
    setState(state, params) {
      for (let k in params) {
        state[k] = params[k]
      }
    }

  },
  actions: {
    tabBuyAgain(){
      state.buyAgainShow = !state.buyAgainShow
    },
    tabConfirmPwd(){
      state.buyAgainShow = !state.buyAgainShow
    },
  }
});
