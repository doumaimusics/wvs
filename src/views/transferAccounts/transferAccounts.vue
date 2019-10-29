<template>
    <div class="transfer">
        <head-nav></head-nav>
        <div class="top_box">
            <h3>余额</h3>
            <p>{{WALLET01}} USDT</p>
        </div>
        <div class="from_box">
            <div class="from_item">
                <h3 v-text="lang.caccount">{{lang.caccount}}</h3>
                <div class="item_box">
                    <div class="input_box">
                       <input type="text" :placeholder="lang.pl_caccount" v-model="account">
                    </div>
                </div>
                <div class="account_name" v-show="accountName">{{accountName}}</div>
            </div>
            <div class="from_item">
                <h3 v-text="lang.tamount">{{lang.tamount}}</h3>
                <div class="item_box">
                    <div class="input_box">
                        <input type="text" :placeholder="lang.pl_tamount" v-model="money">
                    </div>

                </div>
            </div>
            <div class="from_item">
                <h3 v-text="lang.remarks">{{lang.remarks}}</h3>
                <div class="item_box">
                    <div class="input_box" >
                        <input type="text" :placeholder="lang.pl_remarks" v-model="remark">
                    </div>
                </div>
            </div>
        </div>
        <p style="color:#285BDE;">*仅支持USDT的转账</p>
        <div class="btn_box" @click="popFun" v-text="lang.btnText">{{lang.btnText}}</div>

        <!-- 交易密码弹窗 -->
        <pass-pop :isShow="isShopPop"  @getCodeFun="getCodeFun"  @closeFun='closeFun'></pass-pop>

        <!-- 手机验证码弹窗 -->
        <get-code :isShow="isCodePop" :inLoginName="account" :money="money" :remark="remark" @closeCodePop="closeCodePop"></get-code>
    </div>
</template>

<script>
var findAccountNameTimeId = null;
var requestData = null;
import headNav from '@/components/headNav/index.vue'
import i18n from '@/assets/mui/js/fun/i18n'
import PassPop from './components/passPop'
import GetCode from './components/getCode'
const lang = {
	lang: app.getLanguage(),
	res: {
		en: {
            balance: 'Balance：',
            accountType: 'Account type',
            balance: 'Balance',
            caccount: 'Collection Account',
            tamount: 'Transfer amount',
            pl_caccount: 'Please enter the collection account',
            pl_tamount: 'Please enter a positive integer',
            rq_tamount: 'Please enter the transfer amount',
            err_tamount: 'The transfer amount must be a positive integer',
            remarks: 'Remarks',
            pl_remarks: 'Please enter remarks',
            btnText: 'Confirm transfer',
            tamountZero: 'Transfer amount must be greater than 0',
            income: 'Income'
        },
        zh: {
            balance: '余额：',
            accountType: '账号类型',
            balance: '余额',
            caccount: '收款账号',
            tamount: '转账数量',
            pl_caccount: '请输入收款账号',
            pl_tamount: '请输入转账数量',
            rq_tamount: '请输入转账数量',
            err_tamount: '转账数量必须是正整数',
            remarks: '转账备注',
            pl_remarks: '请输入备注信息',
            btnText: '确认转账',
            tamountZero: '转账金额必须大于0',
            income: '收益池'
        }
    }

}
export default {
    name:'transferAccounts',
    data(){
        return {
            lang: i18n.init(lang),
            WALLET01: 100,   // 余额
            account: '',   // 收款账户
            remark: '',   // 备注
            money: '',   // 转账数量
            accountName: '',   // 账户
            isShopPop:false,   // 是否显示交易密码框
            isCodePop:false,   // 是否显示手机验证码弹窗
        }
    },
    methods:{
        tabBuyAgain(){
            this.$store.dispatch('tabBuyAgain')
        },

        popFun(){   // 点击确认转账弹窗
            var r = /^\+?[1-9][0-9]*$/;　　//正整数
            if(this.account == ''){
                Toast({message: this.lang.pl_caccount,duration: 1500});
            } else if(this.money == ''){
                Toast({message: this.lang.pl_tamount,duration: 1500});
            } else {
                if(this.money && this.money <= 0){
                    Toast({message: this.lang.tamountZero,duration: 1500});
                } else if(this.money && !r.test(this.money)) {
                    Toast({message: this.lang.err_tamount,duration: 1500});
                } else {
                    this.isShopPop = true;
                }
            }
        },

		closeFun(data){   // 关闭交易密码弹窗
			this.isShopPop = false;
        },

        getCodeFun(data){   // 手机验证码弹窗显示
            this.isCodePop = true;
        },

        closeCodePop(data){  // 关闭手机验证码弹窗
            this.isCodePop = false;
            this.getWallet()
        },

        getWallet() {   // 初始化 获取余额数据
            app.ajax({
                wait: false,
                close: false,
                path: '/app!accountBalance.action',
                data: {
                    accountType: 'WALLET01',
                }
            }).then((res) => {
                if(res.data.status == 'success' ){
                    this.WALLET01 = res.data.data;
                } else {
                    Toast({ message: res.data.message, duration: 1500});
                }
            })
        }

    },
    created() {
        this.getWallet();
    },

    components:{
        PassPop,
        headNav,
        GetCode
    },

    watch: {
        account(val) {    // 检测账户是否存在
            if (findAccountNameTimeId != null) {
                clearTimeout(findAccountNameTimeId);
                findAccountNameTimeId = null;
            }
            if (!this.account) {
                this.accountName = '';
            } else {
                findAccountNameTimeId = setTimeout(()=> {
                    app.ajax({
                        login: false,
                        wait: false,
                        close: false,
                        path: '/app!findUserByMobileOrLoginName.action',
                        data: {
                            loginName: this.account
                        },
                    }).then((res) => {
                        this.accountName = res.data.data;
                    })
                }, 400);
            }
        },
    },
}
</script>

<style lang="scss" scoped>

    .transfer{
        width: 100%;
        height: 100vh;
        padding:80px 15px 15px 15px;
        box-sizing: border-box;
        font-size:16px;
        background: #f2f2f2;
        h3{
            color: #262833;
        }
        .top_box{
            border-radius: 4px;
            background: #E6E9F0;
            padding: 23px 15px;
            margin-bottom: 15px;
            display: flex;
            justify-content: space-between;
            h3{
                font-size:16px;
            }
            p{
                color: #1A80FF;
            }
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
                        input{
                            border: none;
                            background: #F2F4F7;
                            margin-bottom: 0;
                            font-size: 13px;
                        }
                    }
                }
                .account_name{
                    padding: 0 15px;
                    margin-top: 5px;
                    font-size: 12px;
                    color: #ff0000;
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
