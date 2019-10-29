<template>
  <div class="box">
    <div class="pop_box">
      <h3 v-text="lang.info_title"></h3>
      <div class="title_box">
        <div class="title" v-text="lang.amounts"></div>
        <div><span v-text="lang.balance"></span>：<span>{{balance}} USDT</span></div>
      </div>
      <div class="input_box">
        <div class="input">
          <input v-model="throwNum" type="text" :placeholder="lang.amount_pls">
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
        info_title: 'Repeat',
        balance: 'Balance',
        amounts: 'Repeat Amount',
        amount_pls: 'Please enter the repeat amount, multiple of 10',
        amount_empty: 'Please enter the repeat amount',
        amount_errors: 'The number of repeat does not meet the requirements. Please enter a multiple of 10.',
        confirm: 'Confirm',
        pwd_title: 'Transaction password',
        pwd_pl: 'Please enter the transaction password',
        finish_text: 'Repeat Success',
        finish: 'Finish'
      },
      zh: {
        info_title: '复投',
        balance: '余额',
        amounts: '复投数量',
        amount_pls: '请输入复投数量，10的倍数',
        amount_empty: '请输入复投数量',
        amount_errors: '复投数量不符合要求，请输入10的倍数',
        confirm: '确认',
        pwd_title: '交易密码',
        pwd_pl: '请输入交易密码',
        finish_text: '复投成功',
        finish: '完成'
      }
    },
  };
  export default {
    name: 'reThrowPop',
    data() {
      return {
        lang: i18n.init(lang),
        throwNum: '',   // 复投数
      }
    },
    props:["balance"],
    methods: {
      submit() {
        if (this.throwNum === '' || isNaN(parseInt(this.throwNum))) {
          Toast(this.lang.amount_pls)
          return
        } else if(this.throwNum < 10) {
          Toast(this.lang.amount_errors)
          return
        } else if(this.throwNum > this.balance){
          Toast('余额不足，请重新输入')
        } else {
          this.$emit("throwSuccess",this.throwNum);
          this.throwNum = '';
        }
      },
    },
    components: {
    },
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

.box{
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
