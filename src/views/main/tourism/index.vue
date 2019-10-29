<template>
  <div class="home">
    <headNav hideBackBtn="true" style="background:#2360D0; color:#fff;"></headNav>
    <div class="sec1">
      <div v-on:click="tabChange(0)" v-bind:class="{sec2: 'true', sec2_1: tabIndex === 0}">热销</div>
      <div v-on:click="tabChange(1)" v-bind:class="{sec2: 'true', sec2_1: tabIndex === 1}">我的</div>
    </div>

    <!-- 滚动区域 -->
    <div id="wrap" class="sec4">
      <v-loadmore :top-method="loadTop" :auto-fill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <div class="sec3 sec3Tourism" v-for="(item,index) in dataList" :key="index">
          <div class="sec5">
            <!-- 左边图片区 -->
            <div class="sec6">
              <img v-show="tabIndex === 0" v-bind:src="'http://web.wvsin.com/' + item.imgUrl" />
              <img v-show="tabIndex === 1" v-bind:src="'http://web.wvsin.com/' + item.ticketImgUrl"/>
              <!-- <img v-bind:src="'http://web.wvsin.com/' + item.imgUrl"/> -->
            </div>
            <!-- 右边文字展示区域 {{item.ticketDesc}}-->
            <div class="sec6_1">
              <p class="p1">{{item.name || item.ticketName}}</p>
              <p class="p2">{{item.ticketDesc}}</p>

              <!-- 热销显示 -->
              <div class="sec7" v-show="tabIndex === 0">
                <div class="p3">
                  <span>已售：{{item.selledNum}}</span>
                </div>

                <div class="price_box">
                    <div class="price">
                      <span>${{item.price}}</span>={{(item.price / (user.WVS_USDT || 1)).toFixed(4)}}/wvs
                    </div>
                    <div class="btn" v-on:click="submit(item.id)">购买</div>
                </div>
              </div>
              <!-- 我的显示 -->
              <div class="sec7" v-show="tabIndex === 1">
                <div class="right_text">
                   <div class="s5" v-if="item.usedTime !== null">
                      <span >
                          使用时间：{{item.usedTime && item.usedTime.slice(0, item.usedTime.search('T'))}}
                      </span>
                  </div>
                  <div class="s5" v-else>
                      <span>
                          购买时间：{{item.updateTime.slice(0, item.updateTime.search('T'))}}
                      </span>
                  </div>
                </div>
                <div class="price_box">
                  <div class="s2">{{item.amount}}</div>
                  <div class="btn" :class="{btnActive:item.status === 9}">{{item.status === 9 ? '已使用' : '未使用'}}</div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </v-loadmore>
      <div v-show="dataList.length ===  0" style="text-align: center">
        <img style="width: 40%;height: auto;margin-top: 40px;" src="../../../assets/img/lvyou.png">
      </div>
    </div>
    <!-- 付款类型 -->
		<mt-popup v-model="isPayment" position="bottom">
        <payment-pop :wallet1="user.WALLET01"
        :wallet2="user.balance"
        :wallet3="user.WALLET12"
        :itemId="iNowId"
        @paymentFun="paymentFun"></payment-pop>
		</mt-popup>
    <!-- 密码 -->
    <confirmPassword></confirmPassword>
    <!-- 底部tab -->
    <tabBar activeIcon="tourism"></tabBar>
  </div>
</template>

<script>
  import TabBar from '@/components/tabbar/tabbar.vue'
  import headNav from '@/components/headNav/index.vue'
  import i18n from '../../../assets/mui/js/fun/i18n'
  import {Toast} from 'mint-ui';
  import confirmPassword from '@/views/other/confirmPassword.vue'
  import {Loadmore} from 'mint-ui';
  import PaymentPop from './components/paymentPop'   // 付款类型弹窗

  const lang = {
    lang: app.getLanguage(),
    res: {
      en: {
        total_assets: 'Total assets',
      },
      zh: {
        total_assets: '总资产',
      }
    },
  };
  export default {
    name: 'tourism',
    data() {
      return {
        lang: i18n.init(lang),
        tabIndex: 0,
        dataList: [],
        info:{
          WVS_USDT: 0,
        },
        page: 1,  // 第几页
        pageSize:"10",  // 每页显示条数
        total:'',   // 总页是
        allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
        scrollMode:"auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        isPayment:false,   // 付款类型弹窗
        user:'',
        iNowId:'', //商品id
        accountType:'',
      }
    },
    methods: {
      tabConfirmPwd(){
        this.$store.dispatch('tabConfirmPwd')
      },
      initData(){   // 初始化
        app.ajax({
            wait: false,
            close: false,
            path: '/app!getMyData.action',
          }).then((res) => {
            console.log(res)
            if(res.data.status == "success"){
              this.user = res.data.data;
            } else {
              Toast({
                message: res.data.message,
                duration: 1500
              })
            }
          })
      },
      getData(){   // 获取列表
        const vm = this
        let data = {
          page: this.page,
        }
        let url = "/app!tickets.action"
        if (vm.tabIndex === 1){
          data.phone = window.localStorage.getItem('mobile')
          url = '/app!mytickets.action'
        }
        app.ajax({
          wait: false,
          close: false,
          path: url,
          data
        }).then((rs) => {
            this.dataList = rs.data.data;
            this.page = rs.data.page;
            this.pageSize = rs.data.rows;
            this.total = rs.data.total;
        });
      },
       loadTop(){   // 下拉加载
        this.page = 1
        this.getData();
        this.allLoaded = false;
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom(){   // 上拉刷新
        this.more();// 上拉触发的分页查询
        this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
      more(){ // 分页查询
          console.log(this.page);
          console.log(this.total);
          var u = navigator.userAgent;
          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
          var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          if(this.page != this.total){
              this.page = parseInt(this.page) + 1;
              const vm = this
              let data = {
                page: this.page,
              }
              let url = "/app!tickets.action"
              if (vm.tabIndex === 1){
                data.phone = window.localStorage.getItem('mobile')
                url = '/app!mytickets.action'
              }
              app.ajax({
                wait: false,
                close: false,
                path: url,
                data
              }).then((rs) => {
                  this.dataList = this.dataList.concat(rs.data.data);
                  this.isHaveMore(rs.data.total);  // 上拉判断是否还有下一页数据要加载 
              });    
              this.$refs.loadmore.onBottomLoaded(); // 固定方法，查询完要调用一次，用于重新定位。
              if(isiOS == true) {
                  this.scrollMode = "touch";
              }    
          } else {
              this.allLoaded = true;// 是否还有下一页，如果没有就禁止上拉刷新
              Toast({message: '已经是最后一页了',duration: 1500,});
          }
      },
      handleBottomChange(status) {
          // this.bottomStatus = status; //上拉状态变换
      },

      isHaveMore: function(isHaveMore) {
          // 是否还有下一页，如果没有就禁止上拉刷新
          // this.allLoaded = true; //true是禁止上拉加载
          if(isHaveMore == true) {
              this.allLoaded = false;
          }
      },

      submit(id){    // 点击购买
        this.isPayment = true;
        this.iNowId = id;
      },
      paymentFun(value){   // 选择支付方式
        if(value){
          this.isPayment = false;
          this.accountType = value;
          this.tabConfirmPwd();
        }
      },
      tabChange(index){   // tab切换
        this.page = 1
        this.tabIndex = index
        this.data = []
        this.getData()

      },
     
      verifiSuccess(params){//下单
        const vm = this
        app.ajax({
          path: '/app!buyTicket.action',
          data: {
            ticketId: this.iNowId,
            password: params.password,
            accountType: this.accountType
          },
        }).then((res) => {
          if(res.data.status == 'success'){
            Toast({message: res.data.message,duration: 1500});
            vm.getData();
            vm.initData();
          } else {
            Toast({message: res.data.message,duration: 1500});
          }
        }).catch(function (e) {
          Toast(e.toString())
        })
      },
      
    },
    components: {
      headNav,
      TabBar,
      confirmPassword,
      'v-loadmore': Loadmore,
      PaymentPop
    },
    created () {
      this.initData();
      this.getData();
    }
  }
</script>

<style lang="scss" scoped>
.home{
  padding-top: 0px;
}
.mint-popup {
		width: 100%;
		background: #fff;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		box-sizing: border-box;
		padding-top: 20px;	
	  }
  .sec1{
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #fff;
    border-top: solid 1px #b2b2b2;
    border-bottom: solid 1px #b2b2b2;
    display: flex;
    justify-content: space-around;
    padding-left: 20px;
    padding-right: 20px;
    position: fixed;
    top: 50px;
    left: 0;
    z-index: 10;
  }
  .sec2{
    font-size: 16px;
    width: 49.99%;
    text-align: center;
  }
  .sec2_1{
    border-bottom: solid 1px #285bde;
  }
  .sec3{
    width: 100%;
    background: #fff;
    border-radius: 5px;
    margin-bottom: 15px;
    // box-shadow: 5px 3px 10px #cecfd0;
  }
  .sec4{
    width: 100%;
    padding: 115px 15px;
    height: 100vh;
    overflow: scroll;
    box-sizing: border-box;
    background: #F2F4F7;
  }
  .sec5{
    width: 100%;
    display: flex;
    // display: -webkit-box;
  }
  .sec6{
    width: 114px;
    height: 203px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
     img{
        width: 100%;
        height: 100%;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
  }
  .sec6_1{
    width: 60%;
    box-sizing: border-box;
    padding: 16px 0px 0px 16px;
    .p1{
      font-size: 15px;
      color: #262833;
      margin-bottom: 12px;
      text-align: left;
    }
    .p2{
      width: 100%;
      height: 84px;
      font-size: 12px;
      color: #A4A7B2;
      margin-bottom: 9px;
      display: -webkit-box; 
      -webkit-line-clamp:4;//设置要显示几行
      overflow: hidden; 
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
    }
  }
  
  .sec7{
     .p3{
       margin-bottom: 4px;
       span{
          color: #a4a7b2;
          font-size: 12px;
          padding: 0px 5px;
          border:1px solid #A4A7B2;
          border-radius: 2px;
          text-align: center;
       }
    }
  }
  .sec7 {
    .price_box{
      display: flex;
      justify-content: space-between;
      .price{
        color: #EC6F00;
        font-size: 12px;
        margin-right: 5px;
        span{
          font-size: 18px;
        }
      }
      .btn{
        width: 60px;
        height: 30px;
        background: #285BDE;
        border-radius: 4px;
        text-align: center;
        line-height: 30px;
        color: #fff;
        font-size: 12px;
      }
      .btnActive{
        background: #A4A7B2;
      }
    }
    .right_text{
      margin-bottom: 4px;
    }
  }
  .sec7 .s2{
    font-size: 16px;
    color: #dd4742;
  }
  .sec7 .s3{
    font-size: 16px;
    color: #ffffff;
    display: block;
    padding: 1px 5px;
    background: #285bde;
    border-radius: 4px;
  }
  .sec7 .s4{
    color: #285bde;
  }
  .sec7 .s5{
    span{
      color: #a4a7b2;
      font-size: 12px;
      padding: 0px 5px;
      border:1px solid #A4A7B2;
      border-radius: 2px;
      text-align: center;
    }
  }
  
  
</style>
<style>
  .sec3Tourism{
    width: 100%;
    background: #fff;
    border-radius: 5px;
    margin-bottom: 15px;
    /* box-shadow: 5px 3px 10px #cecfd0; */
  }
</style>
