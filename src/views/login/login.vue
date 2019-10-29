<template>
    <div class="mui-content login-content">
        <div class="top_box">
			<h1 class="title">会员登录</h1>
		</div>
        <div class="logo">
            <img src="@/assets/login/logo.png"/>
            <h5>WVS</h5>
        </div>
        <div class="input-content">
            <div class="input-title" v-text="lang.login_account">{{lang.login_account}}</div>
            <!-- 账户 -->
            <div class="mui-input-row input-row arrow-row">
                <span class="mui-icon mui-icon-arrowdown right-icon" @click="isAccountList"></span>
                <input type="text" v-model="loginFrom.account" class="mui-input-clear" :placeholder="lang.pl_account"/>
            </div>

            <!-- 记录账号都输入框 -->
            <div class="account_box" v-show="isAccount && accountList.length != ''">
                <ul>
                    <li v-for="(item,index) in accountList" :key="index" @click="selectAccount(item)">
                        {{item.account}}
                    </li>
                </ul>
            </div>
            <!-- 密码 -->
            <div class="input-title" v-text="lang.login_pwd">{{lang.login_pwd}}</div>
            <div class="mui-input-row input-row">
                <input  v-model="loginFrom.password" type="password" class="mui-input-clear" :placeholder="lang.pl_pwd"/>
            </div>

            <div class="btn-row">
                <button type="button" class="mui-btn mui-btn-block mui-btn-primary" v-text="lang.login" @click="btnSub">{{lang.login}}</button>
            </div>
            <div class="link-row">
                <a class="forgot-pwd" @click="toForgeThePass" v-text="lang.findpwd">{{lang.findpwd}}</a>
                <a class="register" @click="toRegister" v-text="lang.register">{{lang.register}}</a>
            </div>
        </div>
    </div>
</template>

<script>
import i18n from '@/assets/mui/js/fun/i18n'
import '@/assets/mui/js/fun/login'
const lang = {
    lang: app.getLanguage(),
    res: {
        en: {
            pregister: 'Register',
            pfindpwd: 'Forget Password',
            findpwd: 'Forget Password？',
            register: 'Register',
            login: 'Login',
            pl_account: 'Mobile number or Email',
            pl_pwd: 'Please enter your password',
            login_pwd: 'Password',
            login_account: 'Account',
            rq_account: 'Please enter a login account',
        },
        zh: {
            pregister: '用户注册',
            pfindpwd: '忘记密码',
            findpwd: '忘记密码？',
            register: '没有账号？立即注册',
            login: '登录',
            pl_account: '注册手机号码或邮箱地址',
            pl_pwd: '请输入登录密码',
            login_pwd: '登录密码',
            login_account: '登录账号',
            rq_account: '请输入登录账号',
        }
    },
}

export default {
    name:'login',
    data() {
        return {
            isAccount:false,   // 是否显示记录密码框
            lang: i18n.init(lang),  // 语言
            loginFrom:{
                account:'',    // 账户
                password:''    // 密码
            },
            accountList:[],   // 存账号
        }
    },
    methods:{
       isAccountList(){    // 记录登录账号弹窗
            this.isAccount = !this.isAccount;
       },
       selectAccount(item){    // 点击选择账号
            this.loginFrom.account = item.account;
            this.loginFrom.password = item.password;
            this.isAccount = false;
       },
       btnSub(){    // 点击登录
            if(this.loginFrom.account==''){
                Toast({ message: '请输入登录账户', duration: 1500});
            } else if(this.loginFrom.password==''){
                Toast({ message: '请输入登录密码', duration: 1500});
            } else {
                app.ajax({
                    login: false,
                    close: false,
                    path: '/app!userLogin.action',
                    data: {
                        'loginName': this.loginFrom.account,
                        'password': this.loginFrom.password
                    },
                }).then((res) => {
                    if(res.data.status == "success"){
                        var userInfo = res.data.data;
                        console.log(userInfo)
                        this.$store.commit('$_setStorage', {user: this.loginFrom.account});
                        this.$store.commit('$_setLogin', '1');
                        this.$store.commit('$_setMobile', userInfo.mobile ? userInfo.mobile : userInfo.email);
                        this.$store.commit('$_setPassWord', this.loginFrom.password);
                        this.$store.commit('$_setLanguage', 'zh');
                        this.$store.commit('$_setLoginName',userInfo.loginName);
                        this.$store.commit('$_setUserName',userInfo.userName);
                        this.$store.commit('$_setToken', userInfo.token);
                        this.$store.commit('$_setUserType', userInfo.userType);
                        Toast({ message: '登录成功', type: 'success',duration: 1500});
                        this.$router.push({
                            name:'homePage'
                        });

                        /* 添加选择账号 */
                        if(this.accountList.length == 0){
                            this.accountList.push(this.loginFrom);
                        } else {
                            let isTrue = this.accountList.every((item,index,arr) => {   // 过滤掉重复账号
                                return item.account != this.loginFrom.account 
                            })
                            if(isTrue){ // 判断是不是有重复账号，有就不追加，没有就添加
                                this.accountList.unshift(this.loginFrom)
                            }
                        }
                        localStorage.setItem("accounts",JSON.stringify(this.accountList))
                    } else {
                        Toast({ message: res.data.message, duration: 1500});
                    }
                })
            }
        },
        toForgeThePass(){   // 忘记密码
            this.$router.push({
                name:'forgetThepass'
            })
        },
        toRegister(){  // 注册页面
            this.$router.push({
                name:'register'
            })
        }
    },
    created() {
        this.loginFrom.account = localStorage.getItem('mobile')  ? localStorage.getItem('mobile') : '';  // 获取手机号
        this.loginFrom.password = localStorage.getItem('passWord') ? localStorage.getItem('passWord') : '';   // 获取密码 
        if(this.$route.query.pas == 1){   // 如果修改登录密码成功跳转过来让密码清空,重新输入密码，或者重新在列表里选择登录账号
            this.loginFrom.password = '';
        }
        let accountLi = JSON.parse(localStorage.getItem("accounts"));
        if(accountLi){
            this.accountList = accountLi;
        }
    },
}
</script>

<style lang="scss" scoped>
    ul,li{
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .login-content{
        height: 100vh;
        background: #fff;
        .top_box{
            width: 100%;
            height: 44px;
           
            text-align: center;
            color: #262833;
            h1.title{
                font-size: 16px; line-height: 44px;
                margin: 0;
            }
        }
        .input-content{
        }
        .mui-btn-primary, .mui-btn-blue{
            background: #285BDE;
            border:none;
        }
        .mui-bar{
            background: #fff;
            box-shadow: none;
            border-bottom: 1px solid #E6E9ED
        }
        .logo{
            padding-top: 0px;
        }
        .account_box{
            width: 100%;
            height: 200px;
            border-radius: 4px;
            box-shadow:0px 0px 10px #E6E9ED;
            overflow-x:hidden;
            overflow-y:auto;
            ul{
                padding: 20px;
                li{
                    line-height: 32px;
                    margin-bottom: 10px;
                    border-bottom: 1px solid rgb(242, 242, 242);
                }
            }
        }
    }
</style>
