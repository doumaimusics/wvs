<template>
  <div class="boxs">
	<h3>付款类型</h3>
    <ul class="list_box">
        <li @click="selectPayment('WALLET01')">USDT（余额：<span>{{wallet1}}</span> USDT)</li>
        <li @click="selectPayment('WALLET04')">WVS（余额：<span>{{wallet2}}</span> WVS）</li>
        <li @click="selectPayment('WALLET12')">基金（余额：<span>{{wallet3}}</span> USDT）</li>
    </ul>
  </div>
</template>

<script>
 
  import i18n from '@/assets/mui/js/fun/i18n'

  const lang = {
    lang: app.getLanguage(),
    res: {
      en: {},
	  zh: {}
    },
  };
  export default {
    name: 'paymentPop',
    data() {
      return {
        lang: i18n.init(lang),
      }
    },
    props:["wallet1","wallet2","wallet3","itemId"],
    methods: {
        selectPayment(type){
            this.$emit("paymentFun",type);
        }
    },
    components: {
    }
  }
</script>

<style lang="scss" scoped>
*{
    padding: 0;
    margin: 0;
    list-style: none;
    box-sizing: border-box;
}
	.boxs{
		padding: 15px;
		h3{
			font-size: 18px;
			text-align: center;
			margin-bottom: 15px;
        }
        .list_box{
            padding: 0 20px;
            li{
                width: 100%;
                border: 1px solid #A4A7B2;
                border-radius: 4px;
                margin-bottom: 15px;
                padding: 5px;
                text-align: center;
            }
        }
	}
</style>
