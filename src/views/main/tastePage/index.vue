<template>
	<div class="mui-content mui-fullscreen taste-content" v-cloak style="padding-top: 44px;overflow: hidden;">
		<img class="img1" src="../../../assets/img/banner_top3x.png" />
		<div class="mui-bar mui-bar-nav" style="box-shadow: 0 0 0 #fff;background: transparent;">
			<h1 style="color: #fff;" class="mui-title" v-text="lang.taste">趣味</h1>
		</div>
		<div id="mescroll" class="mescroll">
			<div class="taste-top">
				<div class="taste-top-content">
					<div class="taste-top-body">
							<span class="title">
								{{lang.title_text0}}
								{{info.number}}
								{{lang.title_text1}}
							</span>
							<div class="text" style="font-size: 16px;font-weight: bold;line-height: 30px;">
								<span class="prize_pool">当前奖池：</span>
								<span>{{info.totalPrize}}</span>
							</div>
							<div class="text text1" v-show="info.endTime" style="font-size: 11px;line-height: 30px;color: #FFE5A0FF;">
								<span class="prize_pool">开奖时间：</span>
								<span>{{info.endTime}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="taste-taps">
					<div class="mui-row">
						<div class="mui-col-xs-6" :class="tabType==0?'active':''" data-type='0' v-on:click="tabType=0">
							<img class="ico" src="../../../assets/svg/taste-tab-top.svg" />
							<p class="title" v-text="lang.recommend_tab_title">每周直推TOP 10</p>
						</div>
						<div class="mui-col-xs-6" :class="tabType==1?'active':''" data-type='1' v-on:click="tabType=1">
							<img class="ico" src="../../../assets/svg/taste-tab-prize.svg" />
							<p class="title" v-text="lang.random_tab_title">随机抽奖</p>
						</div>
					</div>
				</div>
				<div class="taste-bottom" style="padding-left: 15px;padding-right: 15px;padding-bottom: 70px">
					<div class="taste-table" v-show="tabType==0">
						<div style="background: #fff;">
							<div style="padding-left: 15px;padding-right: 15px;">
								<div class="theader">
									<div class="td" v-text="lang.td0">名次</div>
									<div class="td">UID</div>
									<div class="td" v-text="lang.td2">占比</div>
								</div>
							</div>
							<div v-show="info.recommendRanking.length>0" id="list" style="padding-left: 15px;padding-right: 15px;background: #fff;overflow-y: scroll;">
								<div class="tr" :class="item.clz" v-show="info.recommendRanking.length>0" v-for="item in info.recommendRanking"
										 :key='item.uid'>
									<div class="td">
										<span class="index">{{item.ranking}}</span>
									</div>
									<div class="td">{{item.uid}}</div>
									<div class="td per">{{item.proportion}}%</div>
								</div>
							</div>
						</div>
						<div class="item-empty" v-show="info.recommendRanking.length==0" v-text="lang.ms_emptytip">暂无数据</div>
					</div>
					<div class="taste-prize-content" v-show="tabType==1">
						<div class="taste-prize-time">
							<span class="title" v-text="lang.last_prize">上期中奖名单</span>
							<span class="value" id="period" v-on:click="selectedShow=true">
								<span class="period">{{periodSelect|period}}</span>
								<i class="iconfont icon-xiala"></i>
							</span>
						</div>
						<div class="taste-table">
							<div class="theader">
								<div class="td" v-text="lang.td0">名次</div>
								<div class="td">UID</div>
								<div class="td" v-text="lang.td2">占比</div>
							</div>
							<div v-show="info.randomRanking.length>0" id="list1" style="padding-left: 15px;padding-right: 15px;background: #fff;overflow-y: scroll;">
								<div class="tr" :class="item.clz" v-show="info.randomRanking.length>0" v-for="item in info.randomRanking" :key='item.uid'>
									<div class="td">
										<span class="index">{{item.ranking}}</span>
									</div>
									<div class="td">{{item.uid}}</div>
									<div class="td per">{{item.proportion}}%</div>
								</div>
							</div>
							<div class="e-view" v-html="periodStatus"></div>
							<div class="item-empty" v-show="!periodStatus && info.randomRanking.length==0" v-text="lang.ms_emptytip">暂无数据</div>
						</div>
					</div>
				</div>
			</div>
			<div v-show="selectedShow" v-on:click="selectedShow=false" v-bind:class="{'bottom-view-mask': true, 'show': true}"></div>
			<div id="periodPopover" class="selected1" v-show="selectedShow">
				<div class="popover-content">
					<div class="title" v-text="lang.selection_period">选择期数</div>
					<div class="mui-row taste-prize-list">
<!--						<div class="mui-col-xs-3 item selectItem">-->
<!--							<div class="item-content">121</div>-->
<!--						</div>-->
						<div class="mui-col-xs-3 item selectItem" v-for="item in info.numbers" :key="item" :data-data="item">
							<div class="item-content">{{item|period}}</div>
						</div>
					</div>
				</div>
			</div>
		<tabBar activeIcon="taste"></tabBar>
	</div>
</template>

<script>
	import TabBar from '@/components/tabbar/tabbar.vue'
	import i18n from '@/assets/mui/js/fun/i18n'
	import { Toast } from 'mint-ui';
	const lang = {
		lang: app.getLanguage(),
		res: {
			en: {
				taste: "Taste",
				title_text0: 'The ',
				title_text1: ' period',
				recommend_tab_title: 'TOP 10 every week',
				random_tab_title: 'Random draw',
				td0: 'ranking',
				td2: 'proportion',
				last_prize: 'Last prize list',
				the: 'The ',
				period: ' period',
				selection_period: 'Selection period'
			},
			zh: {
				taste: "趣味",
				title_text0: '第 ',
				title_text1: ' 期',
				recommend_tab_title: '每周直推TOP 10',
				random_tab_title: '随机抽奖',
				td0: '名次',
				td2: '占比',
				last_prize: '上期中奖名单',
				the: '第',
				period: '期',
				selection_period: '选择期数'
			}
		}
	};

	var mescroll = null;
	export default {
		name: 'tastePage',
		data() {
			return {
				lang: i18n.init(lang),
				selectedShow: false,
				tabType: 0,
				info: {
					number: 1,
					endTime: null,
					startTime: null,
					numbers: [],
					totalPrize: 0,
					recommendRanking: [],
					randomRanking: []
				},
				periodStatus: '',
				periodSelect: 1,
			}
		},
		filters: {
			period: function(value) {
				return '第' + value + '期';
			}
		},
		components: {
			TabBar
		},
		mounted: function() {
			document.getElementById('list').style.maxHeight = (window.screen.availHeight - 270) + 'px'
			document.getElementById('list1').style.maxHeight = (window.screen.availHeight - 270) + 'px'
			const vm = this
			app.ajax({
				close: false,
				wait: false,
				data: {},
				path: "/app!taste.action",
			}).then(function(eResult) {
				setListClass(eResult.data.data.recommendRanking);
				setListClass(eResult.data.data.randomRanking);
				vm.periodSelect = eResult.data.data.number;
				vm.info = eResult.data.data;
			}).catch(function(msg) {
				Toast(msg);
				return true;
			});

			var index = 1;
			vm.periodSelect = index;
			vm.info.randomRanking = [];
			app.ajax({
				close: false,
				wait: false,
				path: "/app!historyWinningList.action",
				data: {
					jiShu: index
				},
			}).then(function(eResult) {
				setListClass(eResult.data.data.randomRanking);
				vm.info.randomRanking = eResult.data.data.randomRanking;
				vm.periodStatus = '';
			}).catch(function(msg) {
				return true;
			});
		}
	};

	function setListClass(list) {
		for (var i = 0; i < list.length; i++) {
			if (i > 2) break;
			if (i == 0) list[i].clz = 'first';
			else if (i == 1) list[i].clz = 'second';
			else list[i].clz = 'third';
		}
	}
</script>

<style scoped>
	.selected1{
		position: fixed;
		left: 0;
		bottom: 0;
		background: #fff;
		width: 100%;
		z-index: 11;
	}
	.selected1 .title{
		text-align: center;
		line-height: 50px;
		font-size: 18px;
	}
	.bottom-view-mask {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		opacity: 0;
		background: #000;
		transition: opacity 0.5s ease 0.3s;
		-webkit-transition: opacity 0.5s ease 0.3s;
		-moz-transition: opacity 0.5s ease 0.3s;
		z-index: 11;
	}
	.bottom-view-mask.show {
		opacity: 0.5;
	}
	.selectItem{
		text-align: center;
		width: 100%;
		line-height: 30px;
	}
	.img1{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
	}
	.taste-top-body .title{
		position: absolute;
		left: 0;
		top: 0;
		color: #F4542DFF;
		background: url("../../../assets/img/bg_number3x.png");
		width: 65px;
		height: 34px;
		background-size: 100% 100%;
		line-height: 31px;
		font-size: 11px;
		padding: 0;
		text-align: left;
		padding-left: 10px;
	}
	.taste-top{
		padding: 0;
	}
	.taste-top-body{
		padding-top: 0;
	}
	.text1{
		background: url('../../../assets/img/bg_date2x.png') center center no-repeat;
		background-size: 150px 18px;
	}
</style>
