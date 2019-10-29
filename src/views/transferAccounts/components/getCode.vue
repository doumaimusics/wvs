<template>
    <div class="pop_box">
        <mt-popup v-model="isShow" :closeOnClickModal="false">
            <div class="title_box">
                <h3 v-text="lang.d_code_title">{{lang.d_code_title}}</h3>
                <div class="close_box" @click="close">x</div>
            </div>
            <div class="input_box">
                <div class="input">
                    <input type="number" v-model="phoneCode" :placeholder="lang.d_code_pl">
                    <!-- <div class="clear_icon">x</div> -->
                </div>
            </div>
            <div class="get_code_box" >
                <button class="get_code_btn" v-text="lang.d_code_btn" @click="getCodeFun"></button>
            </div>
            <div class="btn_box" @click="confirmFun" v-text="lang.confirm">{{lang.confirm}}</div>
        </mt-popup>
    </div>
</template>

<script>
import i18n from '@/assets/mui/js/fun/i18n'
const lang = {
	lang: app.getLanguage(),
	res: {
		en: {
            d_code_pl: 'please enter verification code',
            d_code_title: 'Mobile verification code',
            d_code_btn: 'Get Code'
        },
        zh: {
            d_code_pl: '请输入手机验证码',
            d_code_title: '手机验证码',
            d_code_btn: '获取验证码'
        }
    }

}
export default {
    data(){
        return {
            lang: i18n.init(lang),
            phoneCode:'',  // 手机验证码
        }
    },
    methods:{
        close(){   //关闭事件
            this.$emit('closeCodePop')
        },
        getCodeFun(){   // 获取手机验证码
            app.ajax({
                login: false,
                path: '/app!generateValidCode.action',
                data: {
                    vtype: this.vtype || 'ZUANGZHANG',
                },
            }).then((res) => {
                if(res.data.status == "success"){
                    let elem = document.querySelector('.get_code_btn');
                    this.$publicFun.sendCode(elem,60);   // 60秒倒计时
                    Toast({
                        message: res.data.message,
                        duration: 1500
                    })
                } else {
                    Toast({
                        message: res.data.message,
                        duration: 1500
                    })
                }
            })
        },
        confirmFun(){   // 验证密码
            if(this.phoneCode == ''){
                Toast({message: this.lang.d_code_pl,duration: 1500});
            } else {
                console.log(111)
                // 调用父组件的方法
                if (this.isSubmit){
                    this.$parent.submitWithCode(this.phoneCode)
                    this.close()
                    return
                }
                app.ajax({
                    path: '/app!zhuanzhang.action',
                    method:'get',
                    data: {
                        inLoginName:this.inLoginName,
                        money:this.money,
                        remark:this.remark,
                        authCode:this.phoneCode,
                        accountType:'USDT'
                    },
                }).then((res) => {
                    if(res.data.status == 'success'){
                        this.close();
                        Toast({message: res.data.message,duration: 1500});
                    } else {
                        this.close();
                        Toast({message: res.data.message,duration: 1500});
                    }
                })
            }
        }
    },
    props:["isShow","inLoginName","money","remark","isSubmit","vtype"],
}
</script>

<style>
    .mint-cell-wrapper,.mint-field-core{
        background-image: none;
    }
</style>
<style lang="scss" scoped>
    .mint-popup{
        width: 300px;
        border-radius: 10px;
        box-sizing: border-box;
        .title_box{
            text-align: center;
            position: relative;
            padding: 20px 0 20px 0;
            h3{
                font-size: 16px;
            }
            .close_box{
                width: 18px;
                height: 18px;
                position: absolute;
                right: 18px;top:22px;
                line-height: 18px;
                font-size: 18px;
            }
        }
        .input_box{
            padding:0  28px;
            height: 45px;
            margin-bottom: 20px;
            .input{
                display: flex;
                height: 100%;
                input{
                    background: #F2F4F7;
                    text-align: center;
                    border: none;
                    height: 100%;
                    padding:0;
                    font-size: 12px;
                }
            }
            .pass_msg{
                color: #DD524D;
                font-size: 12px;
            }
        }
        .get_code_box{
            margin-bottom: 20px;
            padding: 0 28px;
            .get_code_btn{
                width: 100%;
                border-radius: 4px;
                border: 1px solid #285bde;
                line-height: 30px;
                text-align: center;
                color: #285BDE;
            }
        }
        .btn_box{
            height: 60px;
            text-align: center;
            color: #285BDE;
            font-size: 16px;
            line-height: 60px;
            border-top: 1px solid #E6E9ED;
        }
    }
</style>
