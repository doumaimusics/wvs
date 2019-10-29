<template>
	<div class="wrap">
		<div class="mui-slider">
			<div class="mui-slider-group">
				<div class="mui-slider-item transfer-item">
					<div class="transfer-header">
						<div class="title" v-text="lang.pwd_title"></div>
					</div>
					<div class="input-block">
						<div class="mui-input-row">
							<input v-bind:placeholder="lang.pwd_pl" id="pwd" v-model="password" type="password" class="mui-input-clear" >
						</div>
					</div>
					<div class="btn-row">
						<button id="btnPay" v-on:click="submit" type="button" class="mui-btn mui-btn-block mui-btn-blue" v-text="lang.confirm"></button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import i18n from '@/assets/mui/js/fun/i18n'
	import { Toast } from 'mint-ui';
	const lang = {
		lang: app.getLanguage(),
		res: {
			en: {
				confirm: 'Confirm',
				pwd_title: 'Transaction password',
				pwd_pl: 'Please enter the transaction password',
				finish_text: 'Saved Success',
				finish: 'Finish'
			},
			zh: {
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
		props:['isPassShow','quy',"type"],     // type:0复投密码 ，1交易密码
		methods: {
			nodePass(){     // 节点密码交易
				app.ajax({
					path: '/app!depositNode.action',
					method: 'get',
					data: {
						'password': this.password,
						'loginName':localStorage.getItem('loginName'),
						'quy':this.quy,
						'accountType':'WALLET01'
					},
				}).then((e) => {
					if (e.data.status === 'success'){
						Toast(e.data.message);
						this.$emit("nodeSuccess",1);
						this.password = '';
					} else {
						Toast(e.data.message);
					}
				})
			},
			reThrowPass(){   // 复投密码交易
				  app.ajax({
				    path: "/app!deposit.action",
				    data: {
				      quy: this.quy,
				      accountType: 'WALLET08'
				    },
				  }).then( (res)=> {
					if(res.data.status == "success"){   // 
						  Toast(res.data.message);
						  this.$emit("reThowSuccess",1);
						  this.password = '';
				    } else {
					  	Toast(res.data.message);
					  	this.password = '';
				    }
				  })
			},
			submit(){
				if (this.password === ''){
					Toast(this.lang.pwd_pl)
					return
				} else {
					if(this.type == 0) {
						this.nodePass()
					} else {
						this.reThrowPass()
					}
				}
				
			}
		},
		mounted: function () {
		}
	}

</script>

<style lang="scss" scoped>
	.wrap{
		padding: 0 20px;
		text-align: center;
		.title{
			margin-bottom: 20px;
		}
	}
</style>
