<template>
	<div class="wrap confirmPassword">
		<div v-on:click="tabBuyAgain()" v-bind:class="{'bottom-view-mask': true, 'show': $store.state.buyAgainShow, 'close': !$store.state.buyAgainShow}"></div>
		<div v-bind:class="{'bottom-view': true, 'show': $store.state.buyAgainShow, 'close': !$store.state.buyAgainShow }">
			<div class="mui-slider">
				<div class="mui-slider-group">
					<div class="mui-slider-item transfer-item">
						<div class="transfer-header">
							<div class="title" lang="pwd_title">{{lang.pwd_title}}</div>
						</div>
						<div class="input-block">
							<div class="mui-input-row">
								<input v-bind:placeholder="lang.pwd_pl" id="pwd" v-model="password" type="password" class="mui-input-clear" lang="pwd_pl">
							</div>
						</div>
						<div class="btn-row">
							<button id="btnPay" v-on:click="submit" type="button" class="mui-btn mui-btn-block mui-btn-blue" lang="confirm">{{lang.confirm}}</button>
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
				balance: 'Balance',
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
				balance: '余额',
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
		name: 'confirmPassword',
		data () {
			return {
				lang: i18n.init(lang),
				password: '',
			}
		},
		methods: {
			tabBuyAgain(){
				this.$store.dispatch('tabBuyAgain')
			},
			submit(){
				const vm = this
				if (this.password === ''){
					Toast(this.lang.pwd_pl)
					return
				}
				vm.$store.commit('setState', {
					'buyAgainShow': false
				})
				vm.$parent.verifiSuccess({password: vm.password});
				this.password = '';
			}
		},
		mounted: function () {
			// 软键盘
			// var board = new PayBoard();
		}
	}

</script>
