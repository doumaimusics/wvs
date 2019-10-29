<template>
    <div class="mui-content">
        <head-nav></head-nav>
        <div class="address_box">
            <h3 v-text="lang.walletAddress">{{lang.walletAddress}}</h3>
            <p>{{addressStr}}</p>
             <div class="btn_box" :data-clipboard-text="addressStr" @click="copyFun" v-text="lang.btnCopy">{{lang.btnCopy}}</div>
        </div>

        <div class="address_box">
            <h3 v-text="lang.walletCode">{{lang.walletCode}}</h3>
            <div class="code_box">
                <div id="qrcode" ref="qrcode"></div>
            </div>
            
        </div>
    </div>
</template>

<script>
import headNav from '@/components/headNav/index.vue'
import i18n from '@/assets/mui/js/fun/i18n'
import Clipboard from 'clipboard';   // 复制
import QRCode from 'qrcodejs2'    // 生成二维码
const lang = {
	lang: app.getLanguage(),
	res: {
		en: {
            walletAddress: 'Wallet Address',
            walletCode: 'Wallet Address Qrcode',
            btnCopy: 'Copy wallet address',
            addressError: 'Failed to get address'
        },
        zh: {
            walletAddress: '充值钱包地址',
            walletCode: '充值钱包地址二维码',
            btnCopy: '复制钱包地址',
            addressError: '获取地址失败'
        }
    }
			
}
export default {
    data() {
        return {
            lang: i18n.init(lang),
            addressStr:''
        }
    },
    methods:{
        initData(){
            app.ajax({
                wait: false,
                close: false,
                path: '/app!getMyWalletAddress.action',
            }).then((res) => {
                if(res.data.status == "success") {
                    this.addressStr = res.data.data.USDT;
                    if (this.addressStr) {
                        var qrcode = new QRCode(this.$refs.qrcode, {
                            text: this.addressStr,
                            width: 147,
                            height: 147,
                            colorDark: '#000000',
                            colorLight: '#ffffff',
                            correctLevel: QRCode.CorrectLevel.H
                        })
                    }
                } else {
                    Toast({
                        message: res.data.message,
                        duration: 1500
                    });
                }
            })
        },
        copyFun(){   // 复制
            var clipboard = new Clipboard('.btn_box')  
            clipboard.on('success', e => {  
                Toast({
                    message: '复制成功',
                    duration: 1500
                }); 
                // 释放内存  
                clipboard.destroy()  
            })  
            clipboard.on('error', e => {  
                // 不支持复制  
                console.log('该浏览器不支持自动复制')  
                // 释放内存  
                clipboard.destroy()  
            })  
        }
    },
    components:{
        headNav
    },
    created(){
        this.initData()
    }
}
</script>

<style lang="scss" scoped>
    .mui-content{
        width: 100%;
        height: 100vh;
        padding: 80px 16px 15px;
        box-sizing: border-box;
        .address_box{
            width: 100%;
            background: #fff;
            border-radius: 4px;
            padding: 20px 0;
            margin-bottom: 15px;
            h3{
                font-size: 16px;
                color: #262833;
                border-left: 3px solid #1A80FF;
                padding-left: 12px;
                margin-bottom: 20px;
            }
            p{
                margin-bottom: 22px;
                font-size: 16px;
                color: #A4A7B2;
                padding:0 18px 0 15px;
                word-wrap:break-word;
            }
            .code_box{
                width: 160px;
                height: 160px;
                margin: 10px auto;
                padding: 7px;
            }
            .btn_box{
                width: 315px;
                height: 45px;
                background: #285BDE;
                margin: 0 auto;
                border-radius: 4px;
                text-align: center;
                line-height: 45px;
                color: #fff;
                font-size: 16px;
            }
        }
    }
</style>