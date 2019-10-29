<template>
  <div style="padding-top: 50px;padding-left: 15px;padding-right: 15px;" class="mui-content mui-fullscreen withdraw-content" v-cloak>
    <headNav></headNav>
    <div class="withdraw-top">
      <div class="body">
					<span class="name" v-text="lang.balance"></span>
					<div class="value">{{balances}} USDT</div>
				</div>
			</div>
			<div class="form-block">
				<div class="form-block-title" v-text="lang.taddress"></div>
				<div class="form-block-input">
					<textarea id="walletAddress" v-model="walletAddress" rows="3" v-bind:placeholder="lang.pl_address"></textarea>
				</div>
			</div>
			<div class="form-block">
				<div class="form-block-title" v-text="lang.tamount"></div>
				<div class="form-block-input">
					<div class="mui-input-row">
						<input id="money" v-model="money" type="text" class="mui-input-clear" v-bind:placeholder="lang.pl_tamount">
					</div>
				</div>
			</div>
			<div class="withdraw-arival">
				<span v-text="lang.actual"></span>
				<span style="float: right;" class="value">{{actual}} WVS</span>
			</div>
            <div class="withdraw-arival">
				<span v-text="lang.wvs_usdt">WVS价格</span>
				<span class="value" style="float:right;">{{wvs_usdt}} USDT</span>
			</div>
			<div class="withdraw-arival" style="margin-top: 1px;">
				<span v-text="lang.fee"></span>
				<span style="float: right;" class="value">{{fee}}WVS</span>
			</div>
			<div class="btn-row">
				<button v-on:click="submit" type="button" class="mui-btn mui-btn-block mui-btn-primary" v-text="lang.btnText"></button>
			</div>

			<confirmPassword></confirmPassword>
			<get-code :isSubmit="true" :vtype="'TIBI'" :isShow="isCodePop"  @getCodeFun="getCodeFun" @closeCodePop="closeCodePop"></get-code>

		</div>
</template>
<script>
  import TabBar from '@/components/tabbar/tabbar.vue'
  import headNav from '@/components/headNav/index.vue'
  import confirmPassword from '@/views/other/confirmPassword.vue'
  import i18n from '@/assets/mui/js/fun/i18n'
  import { Toast } from 'mint-ui';
  import getCode from '../../views/transferAccounts/components/getCode'  

  const lang = {
    lang: app.getLanguage(),
    res: {
      en: {
            balance: 'Balance：',
            taddress: 'Wallet Address',
            pl_address: 'Please enter the wallet address',
            tamount: 'Withdraw amount',
            pl_tamount: 'Please enter the withdraw amount',
            err_tamount: 'The withdraw amount must be a positive integer',
            tamountZero: 'Withdraw amount must be greater than 0',
            fee: 'Fee',
            actual: 'Actual arrival',
            btnText: 'Confirm withdraw',
            wvs_usdt: 'WVS Price'
        },
        zh: {
            balance: '余额：',
            taddress: '钱包地址(WVS)',
            pl_address: '请输入钱包地址',
            tamount: '提取数量',
            pl_tamount: '请输入提取数量',
            err_tamount: '提取数量必须是正整数',
            tamountZero: '提币金额必须大于0',
            fee: '手续费：',
            actual: '实际到账',
            btnText: '确认提取',
            wvs_usdt: 'WVS价格'
        }
    }
  };

  var requestData = null;
  var walletType;

  export default {
    name: 'withdraw1',
    data() {
      return {
        lang: i18n.init(lang),
        balances: 0,
        wvs_usdt:'',
        walletAddress: '',
        money: '',
        fee: 0,
        fee1: 0,
        fee2: 0,
        isCodePop:false,   // 是否显示手机验证码弹窗
      }
    },
		methods: {
      getCodeFun(data){   // 手机验证码弹窗显示
				this.isCodePop = true;
			},
			closeCodePop(data){  // 关闭手机验证码弹窗
				this.isCodePop = false;
			},
			tabConfirmPwd(){
				this.$store.dispatch('tabConfirmPwd')
			},
			submit(){   // 点击确认提币
				const vm = this
				if (this.walletAddress === ''){
					Toast(this.lang.pl_address)
					return
				} else if (this.money === '' || isNaN(parseInt(this.money))){
					Toast(this.lang.pl_tamount + '。且' + this.lang.err_tamount)
					return
				}
				this.tabConfirmPwd()
			},
			verifiSuccess(){
        this.getCodeFun();
      },
      submitWithCode(phoneCode){   // 确认提币
				app.ajax({
					path: '/app!tibi.action',
					data: {
						walletAddress:this.walletAddress,
						money:this.money,
						authCode:phoneCode,
						accountType: 'WALLET08',
					},
				}).then((res) => {
					if(res.data.status == 'success'){
            Toast({message: res.data.message,duration: 1500});
            this.$router.go(-1);
					} else {
						Toast({message: res.data.message,duration: 1500});
					}
				})
			},
		},
    computed: {
        actual: function() {
            var moneyVal = parseFloat(this.money);
            var val = 0;
            if (moneyVal) {
                val = ToMoney4(moneyVal / this.wvs_usdt - this.fee);
            }
            return val;
        }
    },
    components: {
      headNav,
      confirmPassword,
      getCode
    },
    mounted: function () {
      initView(this);
    },
    created () {
      this.balances = this.$route.query.balance;
    }

  };
function ToMoney4(value) {
	var val = parseFloat(value);
	if (isNaN(val)) {
		val = "";
	} else {
		val = val.toFixed(4);
	}
	return val;
}
  function initView(vm) {
    // var self = plus.webview.currentWebview();
    // walletType = self.type;

    document.querySelector('.mui-btn-primary').addEventListener("tap", function () {
      FormVerify(function (data) {
        if (data.money <= 0) {
          // mui.toast(i18n.t('tamountZero'));
          return;
        }
        data.accountType = 'WALLET08';
        OpenTransferPwdDialog({
          callback: function (pwd) {
            OpenVfCodeDialog({
              vtype: 'TIBI',
              callback: function (code) {
                data.authCode = code;
                app.ajax({
                  path: '/app!tibi.action',
                  data: data,
                  success: function (eResult) {
                    CloseVfCodeDialog();
                    // mui.toast(eResult.message);
                    // app.fireView(self.opener(), 'updateData');
                    initData();
                  }
                });
              }
            });
          }
        });
      });
    });

    initData(vm);
  }

  function initData(vm) {
    getBalance(vm);
    app.ajax({
      wait: false,
      close: false,
      path: '/app!getRate.action',
    }).then(function (eResult) {
			var data = eResult.data.data;
			vm.fee = data.fee;
			vm.fee1 = data.fee1;
      vm.fee2 = data.fee2;
      vm.wvs_usdt = data.wvs_usdt;
		}).catch(function (msg) {
			return true;
		});
  }

  function getBalance(vm) {
    app.ajax({
      wait: false,
      close: false,
      path: '/app!accountBalance.action',
      data: {
        accountType: walletType,
      },
    }).then(function (eResult) {
			vm.balance = eResult.data.data;
		}).catch(function (msg) {
			return true;
		});;
  }
</script>


<style>
  .withdraw-content {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .withdraw-top {
    padding: 22px 0px;
  }

  .withdraw-top .body {
    background: #E6E9F0FF;
    border-radius: 4px;
    line-height: 50px;
    padding: 0 18px;
    color: #fff;
  }

  .withdraw-top .name {
    font-size: 16px;
    float: left;
		color: #262833FF;
  }

  .withdraw-top .value {
    overflow: hidden;
    text-align: right;
    font-size: 16px;
		color: #1A80FFFF;
  }

  .withdraw-arival {
    padding: 0 16px;
    background: #fff;
    margin-top: 12px;
    color: #666666;
    line-height: 44px;
    font-size: 13px;
		text-align: left;
  }

  .withdraw-arival .value {
    font-size: 16px;
    color: #21A0FF;
    margin-left: 6px;
  }

  .withdraw-fee {
    text-align: right;
    font-size: 13px;
    color: #666666;
    padding: 12px;
    flex-grow: 1;
  }

  .withdraw-content .btn-row {
    margin-top: 18px;
  }

  .withdraw-content .btn-row button {
    margin-bottom: 10px;
  }
	.mui-btn-block{
		font-size: 16px;
	}
</style>
