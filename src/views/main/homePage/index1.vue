<template>
    <div class="home">
        <div id="refreshContainer" class="mui-content mui-fullscreen home-content" v-cloak>
			<div class="home-top">
				<div class="home-top-content">
					<div class="mui-row">
						<div class="mui-col-xs-6">
							<p class="name" lang="total_assets">总资产</p>
							<div class="value">{{info.totalAssets}}</div>
						</div>
						<div class="mui-col-xs-6">
							<p class="name" lang="yesterday_income">昨日收益</p>
							<div class="value">{{info.yesterdayIncome}}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="home-middle">
				<div class="level-row">
					<span class="name">{{info.userLevel}}</span>
					<span class="upgrade" lang="upgrade">升级</span>
				</div>
				<div class="chart-content">
					<div class="tip">{{info.investableAmount}}</div>
					<div class="rate">{{info.monthlyIncome}}</div>
					<div class="chart">
						<div class="content">
							<canvas id="round" class="round" width="160px" height="160px"></canvas>
							<div class="text">
								<div class="value">{{info.saved}}</div>
								<div class="name" lang="funds">已存入</div>
							</div>
						</div>
					</div>
					<button type="button" class="mui-btn mui-btn-block mui-btn-blue btn-again" lang="save_again">再存一笔</button>
					<button type="button" class="mui-btn mui-btn-block mui-btn-link" open-url="/pages/mine/withdraw1.html?type=WALLET07"
					 lang="pwithdraw1">本金提取</button>
				</div>
			</div>
			<div class="home-bottom">
				<span class="name" lang="wvsprice">WVS价格</span>
				<span class="value">{{info.WVS_USDT}} USDT</span>
			</div>
		</div>
        <!-- 底部tab -->
        <tabBar></tabBar>
    </div>
</template>

<script>
import TabBar from '@/components/tabbar/tabbar.vue'
export default {
    name:'homePage',
    data () {
        return {
            info:{}
        }
    },
    components:{
        TabBar
    }
}
</script>