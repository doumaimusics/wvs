<template>
    <div class="mui-content findpass-content">
        <head-nav></head-nav>
        <div class="input-content" style="padding-top: 50px;">
            <div class="mui-input-row input-row">
                <input  type="text" class="mui-input-clear" :placeholder="lang.pl_account" v-model="fromObj.accountNumber"/>
            </div>
            <div class="mui-input-row input-row">
                <button type="button" class="mui-btn mui-btn-link code-btn" @click="getCode" v-text="lang.btnCode">{{lang.btnCode}}</button>
                <div class="code-input">
                    <input  type="text" class="mui-input-clear" :placeholder="lang.pl_code" v-model="fromObj.codeNumber"/>
                </div>
            </div>
            <div class="mui-input-row input-row">
                <input  type="password" v-validate="'required|npwd'" name="npwdLog" class="mui-input-clear" :placeholder="lang.pl_npwd" v-model="fromObj.passNumber1"/>
            </div>
            <div class="mui-input-row input-row">
                <input  type="password" v-validate="'required|qrwd'" name="qrwdLog" class="mui-input-clear" :placeholder="lang.pl_npwd2" v-model="fromObj.passNumber2"/>
            </div>
            <div class="btn-row">
                <button type="button" class="mui-btn mui-btn-block mui-btn-primary" @click="confirmFun" v-text="lang.btnConfirm">{{lang.btnConfirm}}</button>
            </div>
        </div>
    </div>
</template>

<script>
import headNav from '@/components/headNav/index.vue'
import i18n from '@/assets/mui/js/fun/i18n'
const lang = {
    lang: app.getLanguage(),
    res: {
        en: {
            pl_account: 'Please enter mobile number or email',
            pl_npwd: 'Please enter a new login password',
            pl_npwd2: 'Please enter the confirmation login password',
            f_pwdnoequal: 'Two new passwords are not equal',
            f_pwderr: 'Login password format is incorrect [6~18 length]',
            btnCode: 'Get Code',
            pl_code: 'Please enter verification code',
            btnConfirm: 'Confirm',
            changeSuccess: 'Password has been updated'
        },
        zh: {
            pl_account: '请输入手机号码或邮箱地址',
            pl_npwd: '请输入新的登录密码',
            pl_npwd2: '请输入确认登录密码',
            f_pwdnoequal: '两次输入新的密码不一致',
            f_pwderr: '登录密码格式不正确[6~18位]',
            btnCode: '获取验证码',
            pl_code: '请输入您收到的验证码',
            btnConfirm: '立即找回',
            changeSuccess: '找回密码成功'
        }
    }

}

export default {
    name:'forgetThepass',
    data(){
        return {
            lang: i18n.init(lang),
            fromObj:{
                accountNumber:'',   // 账户
                codeNumber:'',   // 验证码
                passNumber1: '',  // 新密码1
                passNumber2: '',  // 新密码2
            }
        }
    },
    methods:{
        getCode(){    // 获取验证码
            app.ajax({
                login: false,
                path: '/app!generateValidCode.action',
                data: {
                    loginName: this.fromObj.accountNumber,
                    vtype: 'FindPwd'
                }
            }).then(res => {
                if(res.data.status == "failure"){
                    Toast({ message: res.data.message, duration: 1500})
                } else {
                    let elem = document.querySelector('.code-btn');
                    this.$publicFun.sendCode(elem,60);   // 60秒倒计时
                    Toast({ message: res.data.message, duration: 1500})
                }
            })
        },
        confirmFun(){   // 确认按钮
            if(this.fromObj.accountNumber == ''){
                Toast({ message: this.lang.pl_account,duration: 1500})
            } else if(this.fromObj.codeNumber == ''){
                Toast({ message: '请输入验证码',duration: 1500})
            } else if(this.fromObj.passNumber1 == ''){
                Toast({ message: this.lang.pl_npwd,duration: 1500})
            } else if(this.fromObj.passNumber2 == ''){
                Toast({ message: this.lang.pl_npwd2,duration: 1500})
            } else {
                this.$validator.validate().then(result => {
                    if (!result) {
                        if (this.errors.has('npwdLog')) {
                            Toast({message:this.errors.collect('npwdLog')[0], duration: 1500});
                            return
                        } 
                        if (this.errors.has('qrwdLog')) {
                            Toast({message:this.errors.collect('qrwdLog')[0], duration: 1500});
                            return
                        } 
                        this.confirmReq()
                    } else {
                        if(this.fromObj.passNumber1 != this.fromObj.passNumber2){
                            Toast({ message: this.lang.f_pwdnoequal,duration: 1500})
                        } else {
                            this.confirmReq()
                        }
                    }
                })
            } 
        },
        
        confirmReq(){    // 确认请求接口
            app.ajax({
                login: false,
                path: '/app!findPwd.action',
                data:{
                    loginName:this.fromObj.accountNumber,
                    authCode:this.fromObj.codeNumber,
                    newpassword:this.fromObj.passNumber1,
                },
            }).then((res) => {
                if(res.data.status == "success"){
                    Toast({ message: res.data.message,duration: 1500});
                    this.$router.push({name:'login',query:{pas:1}});
                    let accounts = JSON.parse(localStorage.getItem('accounts'));   // 设置记录账号列表
                    if(accounts){
                        accounts.forEach((item,index,arr) => {
                            if(item.account == this.fromObj.accountNumber && item.password != this.fromObj.passNumber1){
                                item.password = this.fromObj.passNumber1;
                            }
                        })
                            localStorage.setItem("accounts",JSON.stringify(accounts))
                        }
                } else {
                    Toast({ message: res.data.message,duration: 1500});
                }
                
            })
        },
    },
    components:{
        headNav
    },
    created () {
        
    }
    
}
</script>

<style lang="scss" scoped>
    .findpass-content{
        background: #fff;
        height: 100vh;
        .sec1{
            border-bottom: 1px solid #f2f2f2;
        }
    }
</style>