
<template>
    <div>
		<div class="mui-content" v-cloak>	
			<div class="headesr_box">
				<h1 v-text="lang.mine">{{lang.mine}}</h1>
			</div>
			<div class="top_box">
				<div class="cont_box">
					<div>UID: {{user.loginName}}</div> 
					<div>{{user.userName}}{{user.yejiLevel}}</div>
				</div>
			</div>
			<div id="mescroll" class="mescroll">
				<!-- 空余资金 和 收益池 -->
				<div class="mine-money-row mui-row">
					<div class="mui-col-xs-6" @click="toTransactionDetails(3)">
						<div class="body">
							<h5>空余资金</h5>
							<div>
								<p class="text_box" style="margin-top:9px;">
									<span>USDT</span>：{{user.WALLET01}}<br/>
								</p>
								<p class="text_box"><span>WVS</span>：{{user.balance}}</p>
							</div>
							<div class="btn">
								<button type="button" style="margin-top:0px;" class="mui-btn mui-btn-primary" @click.stop="toRecharge" v-text="lang.precharge">{{lang.precharge}}</button>
							</div>
							<div class="btn">
								<button type="button" class="mui-btn mui-btn-outlined" @click.stop="toTransfer" v-text="lang.ptransfer">{{lang.ptransfer}}</button>
							</div>
						</div>
					</div>
					<div class="mui-col-xs-6" @click="toTransactionDetails(1)">
						<div class="body">
							<h5 class="income">收益池</h5>
							<p><span v-text="lang.balance">{{lang.balance}}</span>：{{user.WALLET08}}</p>
							<div class="btn">
								<button type="button" class="mui-btn mui-btn-primary" @click.stop="toShouMoney" v-text="lang.withdraw">{{lang.withdraw}}</button>
							</div>
							<div class="btn">
								<button type="button" class="mui-btn mui-btn-outlined bind-tap" @click.stop="reThrowFun(1)" v-text="lang.repeat">{{lang.repeat}}</button>
							</div>
						</div>
					</div>
				</div>

				<!-- 生态池 和 动态池 -->
				<div class="mine-money-row mui-row">
					<div class="mui-col-xs-6" @click="toTransactionDetails(0)">
						<div class="body">
							<h5>生态池</h5>
							<p><span v-text="lang.balance">{{lang.balance}}</span>：{{user.WALLET07}}</p>
							<div class="btn">
								<button type="button" class="mui-btn mui-btn-primary" @click.stop="toWithdraMoney" v-text="lang.withdraw">{{lang.withdraw}}</button>
							</div>
						</div>
					</div>
					<div class="mui-col-xs-6" @click="toTransactionDetails(2)">
						<div class="body">
							<h5>动态池</h5>
							<p><span v-text="lang.balance">{{lang.balance}}</span>：{{user.WALLET10}}</p>
							<div class="btn">
								<button type="button" class="mui-btn mui-btn-primary" @click.stop="toDynamicMoney" v-text="lang.withdraw">{{lang.withdraw}}</button>
							</div>
						</div>
					</div>
				</div>

				<!-- 节点 和 环球消费基金 -->
				<div class="mine-money-row mui-row">
					<div class="mui-col-xs-6" @click="toTransactionDetails(4)">
						<div class="body">
							<!-- 问号 -->
							<div class="question_icon" @click.stop="popupNodeRule = true"></div>
							<!-- 不是节点的展示 -->
							<div class="isNode mbClass" v-if="user.nodeLevel == '非节点'">
								<div>
									<p class="text_box" style="margin-top:9px;">充值成为节点,</p>
									<p class="text_box">领取最高奖励</p>
								</div>
							</div>
							<!-- 成为节点的展示 -->
							<div class="isNode" v-else>
								<h5>{{user.nodeLevel}}</h5>
								<div>
									<p class="text_box" style="margin-top:9px;">
										<span>已存</span>：{{user.nodeMoney}}
									</p>
									<p class="text_box"><span v-text="lang.balance"></span>：{{user.WALLET11}}</p>
								</div>
							</div>
							
							
							<div class="btn" >
								<button style="margin-top:0;" type="button" class="mui-btn mui-btn-primary" @click.stop="reThrowFun(2)">
								   <span v-if="user.nodeLevel == '非节点'">成为节点</span>	
								   <span v-else>充值</span>	
								</button>
							</div>
						</div>
					</div>
					<div class="mui-col-xs-6" @click="toTransactionDetails(5)">
						<div class="body">
							<h5>环球消费基金</h5>
							<p><span v-text="lang.balance">{{lang.balance}}</span>：{{user.WALLET12}}</p>
							<div class="btn">
								<button type="button" class="mui-btn mui-btn-primary" @click.stop="toLy">使用</button>
							</div>
						</div>
					</div>
				</div>
				
				<!-- 列表 -->
				<div class="mine-list-content" >
					<ul class="mui-table-view mine-table">
						<li class="mui-table-view-cell bind-tap" @click="popFun" data-type='name'>
							<a class="mui-navigate-right">
								<img src="@/assets/ownPage/mine_name.png" />
								<span v-text="lang.name">{{lang.name}}</span>
								<span class="right">{{user.userName}}</span>
							</a>
						</li>
						<li class="mui-table-view-cell" v-show="user.mobile">
							<a class="mui-navigate-right">
								<img src="@/assets/ownPage/mine_phone.png" />
								<span v-text="lang.phone">{{lang.phone}}</span>
								<span class="right">{{user.mobile}}</span>
							</a>
						</li>
						<li class="mui-table-view-cell" v-show="user.email">
							<a class="mui-navigate-right">
								<img src="@/assets/ownPage/mine_email.png" />
								<span v-text="lang.email">{{lang.email}}</span>
								<span class="right">{{user.email}}</span>
							</a>
						</li>
					</ul>
					<ul class="mui-table-view mine-table">
						<li class="mui-table-view-cell"  @click="toTransactionDetails(0)">
							<a class="mui-navigate-right">
								<img src="@/assets/ownPage/mine_name.png" />
								<span v-text="lang.tibi">{{lang.tibi}}</span>
							</a>
						</li>
					</ul>
					<ul class="mui-table-view mine-table" style="margin-bottom: 130px;">
						<li class="mui-table-view-cell" @click="toSystemSet">
							<a class="mui-navigate-right">
								<img src="@/assets/ownPage/mine_settings.png" />
								<span v-text="lang.psettings">{{lang.psettings}}</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 修改用户名 -->
		<pop-ups :isShow="isShopPop"  @confirmFun="confirmFun" @closeFun="closeFun"></pop-ups>

		<!-- 复投 -->
		<mt-popup  v-model="popupVisible" position="bottom">
			<throw-pop @throwSuccess="throwSuccess" :balance="user.WALLET08"></throw-pop>
		</mt-popup>

		<!-- 成为节点弹窗 -->
		<mt-popup v-model="popupNode"  position="bottom">
			<node-pop @successFn="successFn" :balance="user.WALLET01"></node-pop>
		</mt-popup>

		<!--复投和节点密码输入框 -->
		<mt-popup v-model="popupPass" position="bottom">
			<transaction-Pass @nodeSuccess="nodeSuccess" @reThowSuccess="reThowSuccess" :quy="depositNum" :type="isType"></transaction-Pass>
		</mt-popup>

		<!-- 节点规则 -->
		<mt-popup v-model="popupNodeRule" position="bottom">
			<node-rule></node-rule>
		</mt-popup>
		<!-- 底部tab -->
        <tabBar activeIcon="ownPage"></tabBar>
    </div>
</template>

<script>
import i18n from '@/assets/mui/js/fun/i18n'
import TabBar from '@/components/tabbar/tabbar.vue'
import PopUps from './components/popUps.vue'   // 修改名称
import ThrowPop from './components/reThrowPop.vue'   // 复投
import NodePop from './components/nodePop.vue'   // 节点
import TransactionPass from './components/transactionPass.vue'   // 密码输入框
import NodeRule from './components/nodeRule'   // 节点规则



const lang = {
	lang: app.getLanguage(),
	res: {
		en: {
			mine: 'Mine',
			income: 'Income',
			psettings: 'Settings',
			invite: 'Invite',
			email: 'Email',
			phone: 'Phone',
			balance: 'Balance',
			withdraw: 'Withdraw',
			pwithdraw: 'Income withdrawal',
			precharge: 'Recharge',
			ptransfer: 'Transfer',
			name: 'NickName',
			ptransferList: 'Recharge Record',
			tibi: 'Extract',
			ptibi: 'Extract',
			repeat: 'Repeat',
			pwithdraw1: 'Principal Extract',
			pwithdraw2: 'Dynamic Extract',
			d_username_pl: 'Please enter nickname',
		},
		zh: {
			mine: '我的',
			income: '收益池',
			psettings: '系统设置',
			invite: '邀请好友',
			email: '邮箱地址',
			phone: '手机号码',
			balance: '余额',
			withdraw: '提币',
			pwithdraw: '收益提取',
			precharge: '充值',
			ptransfer: '转账',
			name: '昵称',
			ptransferList: '交易明细',
			tibi: '交易明细',
			ptibi: '可用提现',
			repeat: '复投',
			pwithdraw1: '本金提取',
			pwithdraw2: '动态提取',
			d_username_pl: '请输入用户昵称',
		},
    }
			
}
export default {
    name:'homePage',
    data () {
        return {
			lang: i18n.init(lang),
			user:{
				userName:'',
				nodeLevel:'节点'
			},
			isType:0, // 0复投密码弹窗 1节点密码弹窗
			isShopPop:false,   // 修改名字
			popupVisible:false,   // 复投弹框
			popupNode:false,   // 节点
			popupPass:false,   // 密码框
			popupNodeRule:false,   // 节点规则弹框
			depositNum:'',   // 复投和节点存入数传给后端
        }
	},
	methods:{
		reThrowFun(n){   // 1:复投,2:节点
			if(n == 1){
				this.popupVisible = true;
			} else {
				this.popupNode = true;
			}
		},
		throwSuccess(val){   // 复投弹出框确认
			if(val){
				this.popupVisible = false;
				this.popupPass = true;
				this.isType = 1;
				this.depositNum = val;
			}
		},
		reThowSuccess(val){    // 复投存入成功
			if(val == 1) {
				this.popupPass = false;
				this.initData();
			}
		},
		successFn(val){    // 节点密码弹框确认
			if(val){
				this.popupNode = false;
				this.popupPass = true;
				this.isType = 0;
				this.depositNum = val;
			}
		},
		nodeSuccess(val){    // 节点存入成功
			if(val == 1) {
				this.popupPass = false;
				this.initData();
			}
		},
		toSystemSet(){   // 系统设置
			this.$router.push({
				name:'systemSetUp'
			})
		},
		toRecharge(){   // 跳转充值页面
			this.$router.push({
				name:'rechargePage'
			})
		},
		toTransfer(){   // 跳转转账
			this.$router.push({
				name:'transferAccounts'
			})
		},
		toShouMoney(){   // 跳转收益提币
			this.$router.push({
				name:'withdrawMoney',
				query:{
					balance:this.user.WALLET08    // 收益池余额
				}
			})
		},
		toWithdraMoney(){   // 跳转本地提币
			this.$router.push({
				name:'withdraw1'
			})
		},
		toDynamicMoney(){   //  跳转动态提取
			this.$router.push({
				name:'dynamicMoney',
				query:{
					balance:this.user.WALLET10
				}
			})
		},
		toTransactionDetails(i){   // 跳转交易明细
			this.$router.push({
				name:'transactionDetails',
				query:{n:i}
			})
		},

		initData(){   // 初始化
			app.ajax({
			wait: false,
			close: false,
			path: '/app!getMyData.action',
			}).then((res) => {
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

		toLy(){
			this.$router.push({
				name:'tourism'
			})
		},

		popFun(){   // 修改姓名弹窗
			this.isShopPop = true;
			
		},
		confirmFun(data){   // 修改用户名确认按钮
			if(data == ''){
				Toast({ message: this.lang.d_username_pl,duration: 1500,});
			} else {
				app.ajax({
					path: '/app!changeUserNameByLoginName.action',
					data: { 'userName': data },
				}).then((res) => {
					if(res.data.status == 'success') {
						Toast({ message: res.data.message,duration: 1500});
						this.isShopPop = false;
						this.initData()
					}
				})
				
			}		
		},
		closeFun(data){
			this.isShopPop = false;
		}
	},
    components:{
		TabBar,
		PopUps,
		ThrowPop,
		NodePop,
		TransactionPass,
		NodeRule
	},
	created(){
		this.initData();
	}
}		
</script>

<style lang="scss" scoped>
	.mui-content{
		height: 100vh;
		position: relative;
		box-sizing: border-box;
		.headesr_box{
			height: 100px;
			width: 100%;
			position: relative;
			background: url('../../../assets/img/bg_top3x.png') no-repeat;
			background-size: cover;
			padding-top: 10px;
			h1{
				text-align: center;
				font-size: 16px;
				color: #fff;
			}
		}
		.top_box{
			width: 100%;
			padding: 0 15px;
			position: absolute;
			top: 75px;
			left: 0;
			.cont_box{
				background: #fff;
				border-radius: 4px;
				display: flex;
				justify-content: space-around;
				line-height: 50px;
			}
		}
		.mescroll{
			padding-top: 38px;
			background: #F2F2F2;
			.text_box{
				margin-top: 0;
			}
		}
	}
	.mbClass{
		margin-bottom: 14px;
	}
	.mint-popup {
		width: 100%;
		background: #fff;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		box-sizing: border-box;
		padding-top: 20px;	
	  }
	  .body{
		position: relative;
		.question_icon{
			width: 20px;
			height: 20px;
			background: url(../../../assets/ownPage/btn_more.png) no-repeat;
			background-size: cover;
			position: absolute;
			top:10px;right:10px;
		}
	}
	  
</style>