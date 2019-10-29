<template>
	<div class="wrap">
		<div v-on:click="tabBuyAgain()" v-bind:class="{'bottom-view-mask': true, 'show': $store.state.buyAgainShow, 'close': !$store.state.buyAgainShow}"></div>
		<div v-bind:class="{'bottom-view': true, 'show': $store.state.buyAgainShow, 'close': !$store.state.buyAgainShow }">
			<div class="mui-slider">
				<div class="mui-slider-group">
					<!-- 存入弹窗 -->
					<div class="mui-slider-item info-item" v-bind:style="{display: transferIndex === 1 ? 'block' : 'none'}">
						<!-- <div class="info-title" lang="info_title">{{lang.info_title}}</div> -->
						<!-- 存入类型部分 -->
						<div class="title_box">
							<div class="title" v-text="lang.saveType"></div>
							<div class="btn_box">
								<div class="btn" :class="{selectBtn:saveType == 1}" @click="saveTypeTab(1)">USDT</div>
								<div class="btn" :class="{selectBtn:saveType == 2}" @click="saveTypeTab(2)">WVS</div>
							</div>
						</div>
						
						<div class="input-block">
							<!-- 存入数量显示部分 -->
							<div class="title" style="text-align: left" lang="amount">
								{{lang.amount}}
								<!-- USDT余额显示 -->
								<div class="money" v-if="saveType == 1"> <span class="balance" lang="balance">{{lang.balance}}</span><span id="money">{{balanceUSDT}}</span>USDT</div>
								<!-- WVS余额显示 -->
								<div class="money" v-else> <span class="balance" lang="balance">{{lang.balance}}</span><span id="money">{{balanceWVS}}</span>WVS</div>

							</div>
							<!-- 存入数量输入框部分 -->
							<div class="mui-input-row" >
								<input style="margin-bottom: 0; margin-right:20px; width:70%;" id="quy" v-model="quy" type="number" class="mui-input-clear" v-bind:placeholder="lang.amount_pl" lang="amount_pl">
								<span class="text_usdt" style="color:#285BDEFF;">USDT</span>
								<p style="color:#285bdeff;font-size:12px;" v-show="saveType == 2">实际扣除：<span>{{deduction}}</span>WVS</p>
							</div>
							
						</div>
						<div class="btn-row">
							<div class="line"></div>
							<button id="btnNext" v-on:click="setTransferIndex(2)" type="button" class="mui-btn mui-btn-block mui-btn-blue" lang="confirm">{{lang.confirm}}</button>
						</div>
					</div>
					
					<!-- 密码交易弹窗 -->
					<div class="mui-slider-item transfer-item" v-bind:style="{display: transferIndex === 2 ? 'block' : 'none'}" >
						<div class="transfer-header">
							<img class="back" v-on:click="setTransferIndex(1)" src="../../assets/svg/bottom-view-back.svg" />
							<div class="title" lang="pwd_title">{{lang.pwd_title}}</div>
						</div>
						<div class="input-block">
							<div class="mui-input-row">
								<input style="margin-bottom: 0;" id="pwd" v-model="password" type="password" class="mui-input-clear" lang="pwd_pl" v-bind:placeholder="lang.pwd_pl">
							</div>
						</div>
						<div class="btn-row">
							<div class="line"></div>
							<button id="btnPay" v-on:click="submit" type="button" class="mui-btn mui-btn-block mui-btn-blue" lang="confirm">{{lang.confirm}}</button>
						</div>
					</div>

					<!-- 存入成功弹窗 -->
					<div class="mui-slider-item finish-item" v-bind:style="{display: transferIndex === 3 ? 'block' : 'none'}">
						<div class="finish-item-top">
							<img src="../../assets/svg/bottom-view-finish.svg" />
							<p class="finish-text" lang="finish_text">{{lang.finish_text}}</p>
						</div>
						<div class="btn-row">
							<button id="btnFinish" type="button" class="mui-btn mui-btn-block mui-btn-grey" lang="finish">{{lang.finish}}</button>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import i18n from '../../assets/mui/js/fun/i18n'
	import '../../assets/mui/js/fun/payboard.min'
	import '../../assets/mui/css/buy-again.css'
	import '../../assets/mui/css/bottom-view.css'
	import { Toast } from 'mint-ui';
	const lang = {
		lang: app.getLanguage(),
		res: {
			en: {
				info_title: 'Save',
				saveType:'Save Type',
				deduction:'Actual Deduction',
				balance: 'Balance：',
				amount: 'Deposit Amount',
				amount_pl: 'Please enter the deposit amount, multiple of 100',
				amount_empty: 'Please enter the deposit amount',
				amount_error: 'The number of deposits does not meet the requirements. Please enter a multiple of 100.',
				confirm: 'Confirm',
				pwd_title: 'Transaction password',
				pwd_pl: 'Please enter the transaction password',
				finish_text: 'Saved Success',
				finish: 'Finish'
			},
			zh: {
				info_title: '存入',
				saveType:'存入类型',
      			deduction:'实际扣除',
				balance: '余额：',
				amount: '存入数量',
				amount_pl: '请输入存入数量，100的倍数',
				amount_empty: '请输入存入数量',
				amount_error: '存入数量不符合要求，请输入100的倍数',
				confirm: '确认',
				pwd_title: '交易密码',
				pwd_pl: '请输入交易密码',
				finish_text: '存入成功',
				finish: '完成'
			}
		},
	}

	export default {
		name: 'buyAgain',
		data () {
			return {
				lang: i18n.init(lang),   // 语言
				transferIndex: 1,   // 显示弹窗：1、存入；2、交易密码；3、确认提币
				quy: '',   // 存入数
				password: '',   // 交易密码
				saveType:1,   //存入类型选择：1:USDT; 2:WVS
			}
		},
		props:["balanceUSDT","balanceWVS","wvsPrice"],// USDT余额    WVS余额   wvs价格
		computed: {
			deduction(){    // 实际扣除数
				return Number(String(this.quy / this.wvsPrice).replace(/^(.*\..{4}).*$/,"$1"));
			}
		},
		methods: {
			saveTypeTab(n){    // 存入类型选择
				if(n == 1){
					this.saveType = 1;
				} else {
					this.saveType = 2;
				}
			},
			setTransferIndex(index = 1){
				if (index === 2){
					if (this.quy === '' || isNaN(parseInt(this.quy))){
						Toast(this.lang.amount_empty)
						return
					} else if(this.quy < 100){
						Toast(this.lang.amount_pl)
						return
					}
				}
				this.transferIndex = index
			},
			tabBuyAgain(){
				const vm = this
				this.$store.dispatch('tabBuyAgain');
				vm.transferIndex = 1;   // 显示弹窗：1、存入；2、交易密码；3、确认提币
				vm.quy = '';   // 存入数
				vm.password = '';   // 交易密码
			},
			submit(){
				const vm = this
				if (this.password === ''){
					Toast(this.lang.pwd_pl)
					return
				}
				Toast('loading')
				app.ajax({
					path: '/app!tranPasswordValid.action',
					data: {
						'password': vm.password
					},
				}).then(function (e) {
					if (e.data.status === 'success'){
						app.ajax({
							path: "/app!deposit.action",
							data: {
								quy: vm.quy,
								accountType:vm.saveType == 1  ? 'WALLET01' : 'WALLET04'
							},
						}).then(function (e) {
							if (e.data.status === 'success'){
								vm.setTransferIndex(3)
								setTimeout(function () {
									vm.setTransferIndex(1)
									vm.tabBuyAgain();
								}, 2000)
								vm.$emit("updateData",1)
							} else {
								Toast(e.data.message)
							}
						});
					} else {
						Toast(e.data.message);
					}
				}).catch(function () {
					Toast('fail')
				});
			}
		},
		mounted: function () {
			// 软键盘
			// var board = new PayBoard();
		}
	}


	var needRefresh, quy;

	//mui.plusReady(function() {
		// 	var self = plus.webview.currentWebview();
		//
		// 	toggleMask(true);
		//
		// 	document.querySelector('#btnPay').addEventListener('tap', function() {
		// 		var pwd = document.querySelector('#pwd').value;
		// 		if (!pwd) {
		// 			mui.toast(i18n.t('pwd_pl'));
		// 		} else {
		// 			app.ajax({
		// 				path: '/app!tranPasswordValid.action',
		// 				data: {
		// 					'password': pwd
		// 				},
		// 				success: function(e) {
		// 					app.ajax({
		// 						path: "/app!deposit.action",

		// 						data: {
		// 							quy: quy,
		// 							accountType: 'WALLET01'
		// 						},
		// 						success: function(eResult) {
		// 							needRefresh = true;
		// 							slider.gotoItem(2);
		// 						}
		// 					});
		// 				}
		// 			});
		// 		}
		// 	});
		//
		// 	getWallet();
		//
	//});

	function getWallet() {
		app.ajax({
			wait: false,
			close: false,
			path: '/app!accountBalance.action',
			data: {
				accountType: "WALLET01",
			},
			success: function(eResult) {
				console.log(eResult)
				var data = eResult.data;
				if(this.saveType == 1){
					this.balanceUSDT = data;
				} else {
					this.balanceWvs = data;
				}
				
			},
			error: function(msg) {
				return true;
			}
		});
	}

	function toggleMask(show) {
		if (show) {
			document.querySelector('.bottom-view-mask').className = 'bottom-view-mask show';
		} else {
			document.querySelector('.bottom-view-mask').className = 'bottom-view-mask close';
		}
	}
</script>
<style lang="scss" scoped>
	.mui-btn-primary, .mui-btn-blue{
		color: #285BDEFF;
		background: #fff;
		border: none;
	}
	.mui-btn-block{
		padding-bottom: 3px;
	}
	.bottom-view .transfer-item .input-block{
		padding-top: 30px;
		padding-bottom: 0;
	}
	.line{
		background: #E6E9EDFF;
		height: 1px;
		margin-left: -8px;
		margin-right: -8px;
	}
	.mui-slider{
		overflow: visible;
	}
	.title_box{
		display:flex;
		padding: 12px;
		box-sizing: border-box;
		.title{
			color: #285BDEFF;
			margin-right: 20px;
			padding: 5px;
		}
		.btn_box{
			display: flex;
			justify-content: space-around;
			.btn{
				padding:5px 15px;
				margin-right: 30px;
				border: 1px solid #E6E9EB;
				color: #285BDEFF;
			}
			.selectBtn{
				background: #285BDEFF;
				border: none;
				color: #fff;
			}
		}
		
	}
</style>
