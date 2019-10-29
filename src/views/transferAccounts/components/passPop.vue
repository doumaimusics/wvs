<template>
    <div class="pop_box">
        <mt-popup v-model="isShow" :closeOnClickModal="false">
            <div class="title_box">
                <h3 v-text="lang.ptraderpwd">{{lang.ptraderpwd}}</h3>
                <div class="close_box" @click="close">x</div>
            </div>
            <div class="input_box">
                <div class="input">
                    <input type="password" v-model="passWord" :placeholder="lang.pwd_pl">
                    <!-- <div class="clear_icon">x</div> -->
                </div>
                <p class="pass_msg" v-show="passMsg">{{passMsg}}</p>
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
            ptraderpwd: 'Trader Password',  
            confirm: 'Confirm',     
			pwd_pl: 'Please enter the transaction password',                   
        },
        zh: {
            pwd_pl: '请输入交易密码',
            ptraderpwd: '交易密码',
            confirm: '确认',
        }
    }
			
}
export default {
    data(){
        return {
            lang: i18n.init(lang),
            passWord:'',
            passMsg:''
        }
    },
    methods:{
        close(){   //关闭事件
            this.$emit('closeFun')
        },
        confirmFun(){   // 验证密码
            if(this.passWord == ''){
                Toast({message: '请输入转账密码',duration: 1500,position:'bottom'});
            } else {
                app.ajax({
                    path: '/app!tranPasswordValid.action',
                    data: {
                        password: this.passWord
                    },
                }).then((res) => {
                    if(res.data.status == 'success'){
                        this.$emit("getCodeFun")
                        this.close();
                    } else {
                        this.passMsg = res.data.message
                    }
                })
            }
		},
    },
    props:["isShow"],

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
            padding: 20px 0 53px 0;
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
            margin-bottom: 48px;
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