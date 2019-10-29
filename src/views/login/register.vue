<template>
    <div class="mui-content mui-fullscreen register-content" v-cloak>
        <head-nav></head-nav>
        <div style="padding-top:50px;">
            <div class="register-tabs mui-row">
                <div class="mui-col-xs-6" data-type='Phone' @click="tabFun(1)" :class="isPhone?'active':''" v-text="lang.tabMobile">{{lang.tabMobile}}</div>
                <div class="mui-col-xs-6" data-type='Email' @click="tabFun(2)" :class="isPhone?'':'active'" v-text="lang.tabEmail">{{lang.tabEmail}}</div>
            </div>
            <div class="input-content">
                <div class="mui-input-row input-row">
                    <img class="right-icon mui-icon mui-hidden" />
                    <input v-validate="'required|name'" name="userName" type="text" class="mui-input-clear" v-model="registerUserDTO.userName"  :placeholder="lang.name_pl"/>     
                </div>

                <div class="mui-input-row input-row" v-show="isPhone == true">
                    <input v-validate="'required|phone'" name="mobile" type="tel" class="mui-input-clear" :placeholder="lang.phone_pl" v-model="registerUserDTO.mobile"/>
                </div>

                <div class="mui-input-row input-row" v-show="!isPhone">
                    <input v-validate="'required|email'" name="emailAdd" type="email" class="mui-input-clear" :placeholder="lang.email_pl" v-model="registerUserDTO.email"/>
                </div>

                <div class="mui-input-row input-row">
                    <button type="button" class="mui-btn mui-btn-link code-btn" @click="handleSave" v-text="lang.btnCode">{{lang.btnCode}}</button>
                    <div class="code-input">
                        <input v-validate="'required|code'" name="authCode" type="text" class="mui-input-clear" :placeholder="lang.pl_code" v-model="registerUserDTO.authCode"/>
                    </div>
                </div>

                <div class="mui-input-row input-row">
                    <input v-validate="'required|logpwd'" name="loginPwd" type="password" class="mui-input-password" :placeholder="lang.loginpwd_pl" v-model="registerUserDTO.password1"/>
                </div>

                <div class="mui-input-row input-row">
                    <input v-validate="'required|tradpwd'" name="traderpwd" type="password" class="mui-input-password" :placeholder="lang.traderpwd_pl" v-model="registerUserDTO.password2"/>
                </div>

                <div class="mui-input-row input-row">
                    <input v-validate="'required|recom'" name="recommender" type="text" class="mui-input-clear"  :placeholder="lang.invite_pl" v-model="registerUserDTO.recommendUser"/>
                </div>

                <div class="agree-row">
                    <div class="mui-checkbox mui-left">
                        <label v-text="lang.agree_text"></label>
                        <input v-validate="'required|see'" name="isSee" type="checkbox" :placeholder="lang.agree_pl" v-model="registerUserDTO.agree">
                    </div>
                    <router-link tag="a" :to="{name:'userAgreement'}" class="agree-link" v-text="lang.agree_pl">{{lang.agree_pl}}</router-link>
                </div>

                <div class="btn-row" style="margin-top: 18px;">
                    <button type="button" class="mui-btn mui-btn-block mui-btn-primary" @click="registerFun" v-text="lang.btnConfirm">{{lang.btnConfirm}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import headNav from '@/components/headNav/index.vue'
import i18n from '@/assets/mui/js/fun/i18n'
import from from '@/assets/mui/js/fun/form'
import utils from '@/assets/mui/js/fun/utils'


const lang = {
	lang: app.getLanguage(),
    res: {
        en: {
            tabMobile: 'Mobile Number',
            tabEmail: 'Email',
            name_pl: 'Please enter nickname (not allowed special text)',
            name_err: 'Nickname does not allow special text',
            phone_pl: 'Please enter the phone number',
            phone_err: 'Phone number format is not correct',
            email_pl: 'Please enter email address',
            email_err: 'E-mail format is incorrect',
            loginpwd_pl: 'Please enter login password (6~18 length)',
            loginpwd_err: 'Login password format is incorrect',
            traderpwd_pl: 'Please enter the transaction password (6~18 length)',
            traderpwd_err: 'Transaction password format is incorrect',
            invite_pl: 'Please enter your referrer',
            agree_text: 'I have read and agreed',
            pagreement: 'Agreement',
            agree_pl: 'Please read the user agreement and agree',
            btnCode: 'Get Code',
            pl_code: 'Please enter verification code',
            btnConfirm: 'Confirm',
            confirmSuccess: 'Register Success'
        },
        zh: {
            tabMobile: '手机注册',
            tabEmail: '邮箱注册',
            name_pl: '请输入用户昵称（不允许特殊符号）',
            name_err: '用户昵称不允许特殊符号',
            phone_pl: '请输入手机号码',
            phone_err: '手机号格式不正确',
            email_pl: '请输入邮件地址',
            email_err: '邮箱格式不正确',
            loginpwd_pl: '请输入登录密码（6~18位）',
            loginpwd_err: '登录密码格式不正确',
            traderpwd_pl: '请输入交易密码（6~18位）',
            traderpwd_err: '交易密码格式不正确',
            invite_pl: '请输入您的推荐人',
            agree_text: '我已阅读并同意',
            pagreement: '用户协议',
            agree_pl: '请阅读用户协议，并同意',
            btnCode: '获取验证码',
            pl_code: '请输入您收到的验证码',
            btnConfirm: '提交注册',
            confirmSuccess: '注册成功'
        }
    }
}
export default {
    name:'register',
    data () {
        return {
            lang: i18n.init(lang),
            isPhone:true,
            registerUserDTO:{
                userName:'',
                mobile:'',
                email:'',
                authCode:'',
                password1:'',
                password2:'',
                recommendUser:'',
                agree:'',
            },
            loginName:'',
        }
    },
    methods:{
        tabFun(i){   // tab切换
            if(i == 1){
                this.isPhone = true;
            } else {
                this.isPhone = false;
            }
        },

        handleSave() {   // 点击获取验证码的验证
            this.$validator.validate().then(result => {
                if (!result) {
                    if (this.errors.has('userName')) {
                        Toast({message:this.errors.collect('userName')[0], duration: 1500});
                        return
                    } 
                    if(this.isPhone) {                    
                       if (this.errors.has('mobile')) {
                            Toast({message:this.errors.collect('mobile')[0], duration: 1500});
                            return
                        } else {
                            this.getCode();
                        } 
                    } else {
                        if (this.errors.has('emailAdd')) {
                            Toast({message:this.errors.collect('emailAdd')[0], duration: 1500});
                            return
                        } else {
                            this.getCode();
                        }
                    }
                    
                }
            })
        },

        getCode(){   // 请求验证码
            app.ajax({
                login: false,
                path: '/app!generateValidCode.action',
                method:'post',
                data: {
                    loginName: this.isPhone ? this.registerUserDTO.mobile : this.registerUserDTO.email,
                    vtype: 'Register'
                },
            }).then((res) => {
                if(res.data.status == "success"){
                    let elem = document.querySelector('.code-btn');
                    this.$publicFun.sendCode(elem,60);   // 60秒倒计时
                } else {
                    Toast({
                        message: res.data.message,
                        duration: 1500
                    })
                }
            })
        },
        

        registerFun(){   // 点击注册按钮   
            this.$validator.validate().then(result => {
                if (!result) {
                    if (this.errors.has('userName')) {
                        Toast({message:this.errors.collect('userName')[0], duration: 1500});
                        return
                    } 
                    if(this.isPhone) {                    
                       if (this.errors.has('mobile')) {
                            Toast({message:this.errors.collect('mobile')[0], duration: 1500});
                            return
                        }
                    } else {
                        if (this.errors.has('emailAdd')) {
                            Toast({message:this.errors.collect('emailAdd')[0], duration: 1500});
                            return
                        } 
                    }
                    if (this.errors.has('authCode')) {
                        Toast({message:this.errors.collect('authCode')[0], duration: 1500});
                        return
                    }
                    if (this.errors.has('loginPwd')) {
                        Toast({message:this.errors.collect('loginPwd')[0], duration: 1500});
                        return
                    }
                    if (this.errors.has('traderpwd')) {
                        Toast({message:this.errors.collect('traderpwd')[0], duration: 1500});
                        return
                    }
                    if (this.errors.has('recommender')) {
                        Toast({message:this.errors.collect('recommender')[0], duration: 1500});
                        return
                    }
                    if (this.errors.has('isSee')) {
                        Toast({message:this.errors.collect('isSee')[0], duration: 1500});
                        return
                    }
                    this.getData()
                } else {
                    this.getData()
                }
            })
        },
        getData(){   // 注册请求
            // this.isPhone ? 
            let data = {
                "registerUserDTO.userName": this.registerUserDTO.userName,
                "registerUserDTO.authCode": this.registerUserDTO.authCode,
                "registerUserDTO.password1": this.registerUserDTO.password1,
                "registerUserDTO.password2": this.registerUserDTO.password2,
                "registerUserDTO.recommendUser": this.registerUserDTO.recommendUser,
                "registerUserDTO.userType": this.isPhone ? 'Phone' : 'Email'
            }
            if(this.isPhone){
                this.$set(data,'registerUserDTO.mobile',this.registerUserDTO.mobile);
            } else {
                this.$set(data,'registerUserDTO.email',this.registerUserDTO.email);
            }
            app.ajax({
                login: false,
                path: '/app!regiserUser.action',
                data: data
            }).then((res) => {
                if(res.data.status == 'success'){
                    this.$router.go(-1);
                } else {
                    Toast({message:res.data.message, duration: 1500});
                }
            })
        }
    },
    created(){
    },
    components:{
        headNav
    }
}


</script>

<style lang="scss" scoped>
    .register-content{
        height: 100vh;
        background: #fff;
        .sec1{
            border-bottom: 1px solid #f2f2f2;
        }
    }
</style>