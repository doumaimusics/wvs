<template>
  <div class="boxs">
    <div class="pop_box">
      <h3 v-text="lang.info_titles"></h3>
      <div class="title_box">
        <div class="title" v-text="lang.amount"></div>
        <div>{{lang.balance}}：<span>{{balance}} USDT</span></div>
      </div>
      <div class="input_box">
        <div class="input">
          <input v-model="number" type="text" :placeholder="lang.amount_pl">
        </div>
      </div>
      <div v-on:click="submit" class="btn_box bdr-t" v-text="lang.confirm">{{lang.confirm}}</div>
    </div>
  </div>
</template>

<script>
 
  import i18n from '@/assets/mui/js/fun/i18n'

  const lang = {
    lang: app.getLanguage(),
    res: {
      en: {
				info_titles: 'Save',
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
				info_titles: '存入',
				balance: '余额',
				amount: '存入数量',
				amount_pl: '请输入存入USDT数量，1000的倍数',
				amount_empty: '请输入存入数量',
				amount_error: '存入数量不符合要求，请输入1000的倍数',
				confirm: '确认',
				pwd_title: '交易密码',
				pwd_pl: '请输入交易密码',
				finish_text: '存入成功',
				finish: '完成'
			}
    },
  };
  export default {
    name: 'nodePop',
    data() {
      return {
        lang: i18n.init(lang),
        number: '',   // 存入数量
		isPassShow:false,   // 是否显示密码框
      }
    },
    methods: {
      submit() {   // 点击确认
        if (this.number === '' || isNaN(parseInt(this.number))) {
          Toast(this.lang.amount_pl)
          return
        } else if(this.number < 1000) {
          Toast(this.lang.amount_error)
          return
		} else if(this.number > this.balance){
			Toast('存入失败，USDT余额不足')
		}
		 else {
		  this.$emit("successFn",this.number);
		  this.number = '';
        }
      },
    },
    components: {
    },
    props: ['balance']
  }
</script>

<style lang="scss" scoped>
  /* 1PX下边框 */
  .bdr-t:after {
    height: 1px;
    content: '';
    width: 100%;
    border-top: 1px solid #f0f0f0;
    position: absolute;
    top: 0;
    right: 0;
    transform: scaleY(0.5);
    -webkit-transform: scaleY(0.5);
    z-index: 10;
  }

.boxs{
			.pop_box{
				h3 {
					font-size: 16px;
					color: #262833;
					text-align: center;
					margin-bottom: 40px;
				}
				.title_box {
					display: flex;
					justify-content: space-between;
					padding: 0 30px;
					font-size: 13px;
					color: #A4A7B2;
					margin-bottom: 15px;

					.title {
						font-size: 16px;
						color: #262833;
					}
					div {
						span {
						color: #285BDE;
						}
					}
				}
				.input_box {
					height: 45px;
					padding: 0 30px;
					margin-bottom: 30px;

					.input {
						background: #F2F4F7;
						border-radius: 4px;

						input {
						border: none;
						background: #F2F4F7;
						height: 45px;
						border-radius: 4px;
						margin-bottom: 0;
						}
					}
				}
				.btn_box {
					height: 60px;
					position: relative;
					text-align: center;
					font-size: 16px;
					color: #285BDE;
					line-height: 60px;
				}
			}
		}
  
</style>
