<template>
    <div class="transactionPassword">
        <head-nav></head-nav>

        <div class="from_box">
            <div class="from_item">
                <h3>新交易密码</h3>
                <div class="item_box">
                    <div class="input_box">
                       <input type="password" :placeholder="lang.pl_npwd" v-model="newpassword"/> 
                    </div>
                </div>
            </div>
            <div class="from_item">
                <h3>确认密码</h3>
                <div class="item_box">
                    <div class="input_box">
                        <input type="password" :placeholder="lang.pl_npwd2" v-model="newpassword_eq">
                    </div>
                    
                </div>
            </div>
            <div class="from_item">
                <h3>验证码</h3>
                <div class="item_box">
                    <div class="input_box" >
                        <input type="text" :placeholder="lang.pl_code" v-model="authCode">
                        <button class="code_box" @click="getCode" v-text="lang.btnCode">{{lang.btnCode}}</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn_box" @click="confirmFun" v-text="lang.btnConfirm">{{lang.btnConfirm}}</div>
    </div>
</template>

<script>
import headNav from '@/components/headNav/index.vue'
import i18n from '@/assets/mui/js/fun/i18n'
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
            pl_npwd: 'Please enter a new trading password',
            pl_npwd2: 'Please enter the confirmation trading password',
            f_pwdnoequal: 'Two new passwords are not equal',
            f_pwderr: 'Trading password format is incorrect [6~18 length]',
            btnCode: 'Get Code',
            pl_code: 'Please enter verification code',
            btnConfirm: 'Confirm',
            changeSuccess: 'Password has been updated'
        },
        zh: {
            pl_npwd: '请输入新的交易密码',
            pl_npwd2: '请输入确认交易密码',
            f_pwdnoequal: '两次输入新的密码不一致',
            f_pwderr: '交易密码格式不正确[6~18位]',
            btnCode: '获取验证码',
            pl_code: '请输入验证码',
            btnConfirm: '确认修改',
            changeSuccess: '修改密码成功'
        }
    }

}
export default {
    name:'transactionPassword',
    data(){
        return {
            lang: i18n.init(lang),
            newpassword:'',
            newpassword_eq:'',
            authCode:''
        }
    },
    methods:{
        getCode(){   // 获取验证码
            if(this.newpassword == ''){
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
                            path: '/app!generateValidCode.action',
                            data: {
                                vtype: 'Zhifu'
                            },
                        }).then((res) => {
                            if(res.data.status == 'success') {
                                let elem = document.querySelector('.code_box');
                                this.$publicFun.sendCode(elem,60);   // 60秒倒计时
                                Toast({message:res.data.message, duration: 1500});
                            } else {
                                Toast({message:res.data.message, duration: 1500});
                            }
                        })
                    }
                }
            }
        },
        confirmFun(){   // 确认修改
            if(this.newpassword == ''){
                Toast({message:this.lang.pl_npwd, duration: 1500});
            } else if(this.newpassword_eq == '') {
                Toast({message:this.lang.pl_npwd2, duration: 1500});
            } else if(this.authCode == ''){
                Toast({message:this.lang.pl_code, duration: 1500});
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
                                newpassword:this.newpassword,
                                authCode:this.authCode
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

    .transactionPassword{
        width: 100%;
        height: 100vh;
        padding:80px 15px 15px 15px;
        box-sizing: border-box;
        font-size:16px;
        background: #f2f2f2;
        h3{
            color: #262833;
        }
        .from_box{
            background: #fff;
            border-radius: 4px;
            padding: 20px 0;
            margin-bottom: 60px;
            .from_item{
                margin-bottom: 20px;
                h3{
                    font-size:16px;
                    margin-bottom: 14px;
                    border-left: 3px solid #1A80FF;
                    padding-left: 12px;
                }
                .item_box{
                    padding: 0 15px;
                    .input_box{
                        background: #F2F4F7;
                        display: flex;
                        input{
                            border: none;
                            background: #F2F4F7;
                            margin-bottom: 0;
                            font-size: 13px;
                        }
                        .code_box{
                            width: 50%;
                            // height: 40px;
                            border:none;
                            background: #F2F4F7;
                            font-size: 12px;
                            color: #1A80FF;
                        }
                    }
                }
                
            }
        }
        .btn_box{
            line-height: 45px;
            background: #285BDE;
            color: #fff;
            font-size: 16px;
            border-radius: 4px;
            text-align: center;
        }

    }
</style>