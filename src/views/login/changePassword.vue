<template>
    <div class="mui-content findpass-content">
        <head-nav></head-nav>
        <div class="input-content" style="padding-top: 28px;">
            <div class="mui-input-row input-row">
                <input  type="password" class="mui-input-clear"   :placeholder="lang.pl_opwd" v-model="oldpassword" />
            </div>
            <div class="mui-input-row input-row">
                <input  type="password" class="mui-input-clear"  lang="pl_npwd" :placeholder="lang.pl_npwd" v-model="newpassword"/>
            </div>
            <div class="mui-input-row input-row">
                <input  type="password" class="mui-input-clear" lang="pl_npwd2" :placeholder="lang.pl_npwd2" v-model="newpassword_eq"/>
            </div>
            <div class="btn-row">
                <button type="button" class="mui-btn mui-btn-block mui-btn-primary" @click="modifyPass">确认修改</button>
            </div>
        </div>
    </div>
</template>

<script>
import headNav from '@/components/headNav/index.vue'

import i18n from '@/assets/mui/js/fun/i18n'
import from from '@/assets/mui/js/fun/form'
import utils from '@/assets/mui/js/fun/utils'

const regexs = {
    email: /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/,
    url: /^([a-zA-z]+:\/\/)?[^\s]*$/,
    idcard: /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/,
    phone: /^1[2-9]\d{9}$/,
    tel: /^0\d{2}[-]?\d{8}|0\d{3}[-]?\d{7}$/,
    loginname: /^(?![0-9]+$)[0-9A-Za-z]{3,12}$/,
    username: /^[\u4e00-\u9fa5A-Za-z0-9]*$/,
    pwd: /^\S{6,18}$/,   // 密码格式
    num: /^[0-9]*$/,
    skaccount: /^[^\u4e00-\u9fa5]{0,}$/,
};
const lang = {
    lang: app.getLanguage(),
    res: {
        en: {
            pl_opwd: 'Please enter your original login password',
            pl_npwd: 'Please enter a new login password',
            pl_npwd2: 'Please enter the confirmation login password',
            f_pwdnoequal: 'Two new passwords are not equal',
            f_pwderr: 'Login password format is incorrect [6~18 length]',
            changeSuccess: 'Password has been updated'
        },
        zh: {
            pl_opwd: '请输入原始登录密码',
            pl_npwd: '请输入新的登录密码',
            pl_npwd2: '请输入确认登录密码',
            f_pwdnoequal: '两次输入新的密码不一致',
            f_pwderr: '登录密码格式不正确[6~18位]',
            changeSuccess: '修改密码成功'
        }
    }

}
export default {
    name:'forgetThepass',
    data(){
        return {
            lang: i18n.init(lang),
            oldpassword:'',   // 原始密码
            newpassword:'',  // 新密码
            newpassword_eq:''  // 确认新密码
        }
    },
    methods: {
        modifyPass(){   // 确认按钮
            if(this.oldpassword == ''){
                Toast({message:this.lang.pl_opwd, duration: 1500});
            } else if(this.newpassword == '') {
                Toast({message:this.lang.pl_npwd, duration: 1500});
            } else if(this.newpassword_eq == '') {
                Toast({message:this.lang.pl_npwd2, duration: 1500});
            } else {   
                // 格式不正确
                if(this.newpassword && this.newpassword_eq && !regexs.pwd.test(this.newpassword) && !regexs.pwd.test(this.newpassword_eq)){
                    Toast({message:this.lang.f_pwderr, duration: 1500});
                } else {
                    if(this.newpassword != this.newpassword_eq ) {   // 两次新密码是否一致
                        Toast({message:this.lang.f_pwdnoequal, duration: 1500});
                    } else {
                        app.ajax({
                            path: '/app!changePwd.action',
                            data: {
                                oldpassword:this.oldpassword,   // 原始密码
                                newpassword:this.newpassword,  // 新密码
                                vtype:1
                            },
                        }).then((res) => {
                            if(res.data.status == 'success') {
                                this.$router.go(-1)
                                Toast({message:res.data.message, duration: 1500});
                            } else {
                                Toast({message:res.data.message, duration: 1500});
                            }
                        })
                    }
                }
            }
            
        }
    },
    components:{
        headNav
    }
    
}
</script>

<style lang="scss" scoped>
    .findpass-content{
        background: #fff;
        height: 100vh;
        padding-top: 50px;
        .sec1{
            border-bottom: 1px solid #ccc;
        }
    }
</style>