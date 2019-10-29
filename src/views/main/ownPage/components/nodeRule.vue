<template>
  <div class="boxs">
	<h3>节点说明</h3>
	<p>充值成为节点，不但所有充值金额放大10倍，还可领取节点大礼包。</p>
	<p>充值1000USDT，可成为轻节点。</p>
	<p>充值5000USDT，可成为节点。</p>
	<p>充值10000USDT，可成为超级节点。</p>
	<p>充值30000USDT，可成为社区。</p>
	<p>节点礼包可叠加领取。</p>
	<p>节点余额通过团队绩效释放，总绩效每增加20000，则释放出2000。</p>
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
    name: 'nodeRule',
    data() {
      return {
        lang: i18n.init(lang),
      }
    },
    methods: {
    },
    components: {
    }
  }
</script>

<style lang="scss" scoped>
	.boxs{
		padding: 15px;
		h3{
			font-size: 18px;
			text-align: center;
			margin-bottom: 15px;
		}
	}
</style>
