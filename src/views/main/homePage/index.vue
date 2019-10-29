<template>
  <div class="home">
      <div id="refreshContainer" v-cloak>
        <!-- 总资产和昨日收益展示 -->
          <div class="home-top-box">
              <div class="home-top-contents">
                    <div class="mui-row">
                        <div class="mui-col-xs-6">
                            <p class="names" v-text="lang.total_assets">{{lang.total_assets}}</p>
                            <div class="value">{{info.totalAssets}}</div>
                        </div>
                        <div class="mui-col-xs-6">
                            <p class="names" v-text="lang.yesterday_income">{{lang.yesterday_income}}</p>
                            <div class="value">{{info.yesterdayIncome}}</div>
                        </div>
                    </div>
              </div>
          </div>

            <!-- 中间区域 -->
            <div class="home-middle">
              <!-- 等级展示区 -->
              <div class="level-row">
                  <div class="name">{{info.userLevel}}</div>
                  <div class="upgrade" v-on:click="goToShare()">

                      <img src="../../../assets/home/icon_update.png" />
                      <span style="margin-left:5px;">升级</span>
                  </div>
              </div>

              <div class="chart-content">
                <!-- 可投资额 -->
                <div class="tip">{{info.investableAmount}}</div>
                <!-- 月收益 -->
                <div class="rate">{{info.monthlyIncome}}</div>
                <!-- canvas -->
                <div class="chart">
                  <div class="content">
                    <!-- canvas部分 -->
                    <canvas id="round" class="round" width="136px" height="136px"></canvas>
                    <div class="text">
                      <div class="name" v-text="lang.funds">{{lang.funds}}</div>
                      <div class="value">{{info.saved}}</div>
                    </div>
                  </div>
                </div>
                <!-- 按钮 -->
               <div class="btn_box">
                  <div v-on:click="tabBuyAgain" class="btn btn1"  v-text="lang.save_again">{{lang.save_again}}</div>
                  <router-link class="btn btn2" style="margin-left: 10px;" to="/withdraw1" tag='div' >
                    {{lang.pwithdraw1}}
                  </router-link>
               </div>

                <!-- 底部wvs价格展示 -->
                <div class="home-bottom">
                  <span class="name" v-text="lang.wvsprice">{{lang.wvsprice}}</span>
                  <span class="value">{{info.WVS_USDT}} USDT</span>
                </div>
              </div>
            </div>
      </div>

      <!-- 智能挖坑弹窗 -->
      <buyAgain :balanceUSDT="info.WALLET01" :balanceWVS="info.balance" :wvsPrice="info.WVS_USDT" @updateData="updateData"></buyAgain>
      <tabBar activeIcon="homePage" class="bgActive"></tabBar>
  </div>

</template>

<script>
  import TabBar from '@/components/tabbar/tabbar.vue'
  import buyAgain from '../../../views/other/buyAgain.vue'
  import i18n from '../../../assets/mui/js/fun/i18n'
  const lang = {
    lang: app.getLanguage(),
    res: {
      en: {
        total_assets: 'Total assets',
        yesterday_income: 'Yesterday income',
        upgrade: 'Upgrade',
        funds: 'Funds',
        save_again: 'Save another',
        pwithdraw: 'Income Extract',
        pwithdraw1: 'Principal Extract',
        pwithdraw2: 'Dynamic Extract',
        wvsprice: 'WVS Price：',
      },
      zh: {
        total_assets: '总资产',
        yesterday_income: '昨日收益',
        upgrade: '升级',
        funds: '已存入',
        save_again: '智能挖矿',
        pwithdraw: '收益提取',
        pwithdraw1: '本金提取',
        pwithdraw2: '动态提取',
        wvsprice: 'WVS价格：'
      }
    },
  };
  export default {
    name: 'homePage',
    data () {
      return {
        inputs:'',
        lang: i18n.init(lang),
        info:{
          investableAmount: " ",
          yesterdayIncome: 0,
          WVS_USDT: 0,
          totalAssets: 0,
          saved: 0,
          userLevel: " ",
          maxAmount: 0,
          monthlyIncome: " "
        },
        showByAgain: false,
      }
    },
    methods: {
      tabBuyAgain(){
        this.$store.dispatch('tabBuyAgain')
      },
			goToShare(){
				this.$store.commit('setState', {
					'shareMaskShow': true
				})
				this.$router.push('/share');
      },
      getDataInfo(){    // 初始化接口
          const vm = this
          app.ajax({
            wait: false,
            close: false,
            path: '/app!getHomeData.action',
          }).then(function (eResult) {
            console.log(eResult)
            var data = eResult.data.data;
            vm.info = data;
            console.log(data)
            vm.$nextTick(function () {
              setRoundValue(data.saved / data.maxAmount);
            });
          });
      },
      updateData(val){   // 点击确认存入后请求初始化接口
        if(val == 1) {
          this.getDataInfo()
        }
      }
    },
    components: {
      TabBar,
      buyAgain
    },
    mounted: function () {
       setRoundValue(0);
       this.getDataInfo()
    }
  }
  function setRoundValue(rate) {
    var canvas = document.getElementById('round');
    var canvasSize = canvas.offsetWidth;

    var borderWidth = 5;   //边框宽度

    var centerX = parseInt(canvasSize / 2);
    var centerY = parseInt(canvasSize / 2);

    var radius = centerX - borderWidth;

    var ctx = canvas.getContext('2d');
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = 'transparent';   // 圆轨道的颜色
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
    ctx.stroke();
    ctx.restore();

    if (rate >= 1) {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(192, 80, 77, 0.7)';
      ctx.lineCap = 'round';
      ctx.lineWidth = borderWidth;
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
      ctx.stroke();
    } else {
      var angle = (3.5 - rate * 2) % 2 * Math.PI;
      ctx.beginPath();
      ctx.strokeStyle = '#33FFEF';   // 画圆的颜色
      ctx.lineCap = 'round';
      ctx.lineWidth = borderWidth;
      ctx.arc(centerX, centerY, radius, 1.5 * Math.PI, angle, true);
      ctx.stroke();
    }
  }
</script>


<style lang="scss" scoped>
    .home{
        width: 100%;
        height: 667px;
        background: url(../../../assets/home/bg_home.png) no-repeat; 
        background-size: cover;
        box-sizing: border-box;
        #refreshContainer{
          width:100%;
          .home-top-box{
             width: 100%;
            .home-top-contents{
              width: 100%;
              height: 85px;
              background: url(../../../assets/home/bg_home1.png) no-repeat;
              background-size: cover;
              padding: 20px 0;
              text-align: center;
              color:#33FFEF;
              margin-bottom: 3px;
              p.names{
                font-size: 13px;
                color:#33FFEF;
              }
              .value{
                font-size: 24px;
              }
            }
          }
          .home-middle{
            width: 100%;
            height: 482px;
            background: url(../../../assets/home/bg_home2.png) no-repeat;
            background-size: cover;
            .level-row{
              padding: 0px 30px 0 35px;
              display: flex;
              justify-content: space-between;
              .name{
                font-size: 18px;
                color: #33FFEF;
                padding-top: 10px;
              }
              .upgrade{
                width: 60px;
                height: 25px;
                border-radius: 4px;
                border: 1px solid #33FFEF;
                font-size: 13px;
                color: #33FFEF;
                padding: 0;
                margin: 0;
                line-height: 25px;
                display: flex;
                margin-top: 20px;
                img{
                  margin: 5px 0 0 5px;
                }
              }
            }
            .chart-content{
              padding: 0 35px;
              .tip{
                font-size: 11px;
                color: #33FFEF;
              }
              .chart{
                width: 205px;
                height: 205px;
                background: url(../../../assets/home/circle.png) no-repeat;
                background-size: cover; 
                margin:0 auto 24px auto;
                .content{
                  width: 136px;
                  height: 136px;
                }
              }
              .btn_box{
                  width: 100%;
                  display: flex;
                  .btn{
                    width: 150px;
                    height: 60px;
                    border-radius: 4px;
                    padding-left: 55px;
                    font-size: 15px;
                    color: #fff;
                    line-height: 60px;
                  }
                  .btn.btn1{
                      background: url(../../../assets/home/icon_mining.png) no-repeat #285BDE;
                      background-position:30px center;
                  }
                  .btn.btn2{
                      background: url(../../../assets/home/icon_money.png) no-repeat #285BDE;
                      background-position:30px center;
                  }
              }
            }
          }
        }
        .bgActive{
          background-color: #0D0E3E;
        }
    }
</style>