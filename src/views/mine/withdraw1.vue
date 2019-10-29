<template>
  <div style="padding-top: 50px;padding-left: 15px;padding-right: 15px;" class="mui-content mui-fullscreen withdraw-content" v-cloak>
    <headNav></headNav>
    <div class="withdraw-top">
      <!-- 余额 -->
      <div class="body">
					<span class="name" v-text="lang.balance"></span>
					<div class="value">{{balance}} USDT</div>
				</div>
			</div>
      <!-- 钱包地址 -->
			<div class="form-block">
				<div class="form-block-title" v-text="lang.taddress"></div>
				<div class="form-block-input">
					<textarea id="walletAddress" v-model="walletAddress" rows="3" v-bind:placeholder="lang.pl_address"></textarea>
				</div>
			</div>
      <!-- 提取数量 -->
			<div class="form-block">
				<div class="form-block-title" v-text="lang.tamount"></div>
				<div class="form-block-input">
					<div class="mui-input-row">
						<input id="money" v-model="money" type="text" class="mui-input-clear" v-bind:placeholder="lang.pl_tamount">
					</div>
				</div>
			</div>

      <!-- 实际到账数 -->
			<div class="withdraw-arival">
				<span v-text="lang.actual"></span>
				<span style="float: right;" class="value">{{actual}} WVS</span>
			</div>

      <!-- wvs价格 -->
			<div class="withdraw-arival" style="margin-top: 12px;">
				<span v-text="lang.wvs_usdt"></span>
				<span style="float: right;" class="value">{{wvs_usdt}} USDT</span>
			</div>

      <!-- 手续费 -->
			<div class="withdraw-arival" style="margin-top: 1px;">
				<span v-text="lang.fee"></span>
				<span style="float: right;" class="value">{{fee1}} %</span>
			</div>

      <!-- 按钮 -->
			<div class="btn-row">
				<button v-on:click="submit" type="button" class="mui-btn mui-btn-block mui-btn-primary" v-text="lang.btnText"></button>
			</div>

			<confirmPassword></confirmPassword>
			<!-- 手机验证码弹窗 -->
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
        fee: 'Fee：',
        actual: 'Actual arrival',
        btnText: 'Confirm withdraw',
        amount_error: 'The number of deposits does not meet the requirements. Please enter a multiple of 100.',
        wvs_usdt: 'WVS Price'
      },
      zh: {
        balance: '余额：',
        taddress: '钱包地址(WVS)',
        pl_address: '请输入钱包地址',
        tamount: '提取数量',
        pl_tamount: '请输入提取数量，100的倍数',
        err_tamount: '提取数量必须是正整数',
        tamountZero: '提币金额必须大于0',
        fee: '手续费：',
        actual: '实际到账',
        btnText: '确认提取',
        amount_error: '提取数量不符合要求，请输入100的倍数',
        wvs_usdt: 'WVS 价格'
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
        balance: 0,
        walletAddress: '',
        fee: 0,
        fee1: 0,   // 手续费
        fee2: 0,
				isCodePop:false,   // 是否显示手机验证码弹窗
				account: '',   // 收款账户
				remark: '',   // 备注
        money: '',   // 提取数量
        wvs_usdt:0,   // wvs价格
			}
    },
		methods: {
			tabConfirmPwd(){
				this.$store.dispatch('tabConfirmPwd')
			},
			getCodeFun(data){   // 手机验证码弹窗显示
				this.isCodePop = true;
			},
			closeCodePop(data){  // 关闭手机验证码弹窗
				this.isCodePop = false;
			},
			submit(){
				const vm = this
				if (this.walletAddress === ''){
					Toast(this.lang.pl_address)
					return
				} else if (this.money === '' || isNaN(parseInt(this.money))){
					Toast(this.lang.pl_tamount + '。且' + this.lang.err_tamount)
					return
				} else if (this.money % 100 != 0) {
					Toast(this.lang.amount_error)
					return;
				}

				this.tabConfirmPwd()
			},
			verifiSuccess(){
				this.getCodeFun()
			},
			submitWithCode(phoneCode){   // 确认提币
				app.ajax({
					path: '/app!tibi.action',
					data: {
						walletAddress:this.walletAddress,
						money:this.money,
						authCode:phoneCode,
						accountType: 'WALLET07',
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
      actual: function () {    // 实际到账数
        var moneyVal = this.money;
        var val = 0;
        val =  Number(String(moneyVal / this.wvs_usdt).replace(/^(.*\..{4}).*$/,"$1"));
        return val;
      },
    },
    components: {
      headNav,
			confirmPassword,
			getCode
    },
    mounted: function () {
      initView(this);
    },

  };

  function initView(vm) {
    // var self = plus.webview.currentWebview();
    // walletType = self.type;

    document.querySelector('.mui-btn-primary').addEventListener("tap", function () {
      FormVerify(function (data) {
        if (data.money <= 0) {
          // mui.toast(i18n.t('tamountZero'));
          return;
        }
        if (data.money % 100 != 0) {
          // mui.toast(i18n.t('amount_error'));
          return;
        }
        data.accountType = 'WALLET07';
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
      path: '/app!getHomeData.action',
    }).then(function (eResult) {
      console.log(eResult)
      vm.balance = eResult.data.data.saved;
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
