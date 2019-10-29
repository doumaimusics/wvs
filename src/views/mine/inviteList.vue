<template>
	<div id="inviteList" >
		<headNav></headNav>
		<div class="invitelist-count mui-row">
			<div class="mui-col-xs-6"><span style="color: #262833FF" v-text="lang.total">总业绩</span>：<span id="countTotal">{{teamQuy}}</span> </div>
			<div class="mui-col-xs-6"><span style="color: #262833FF" v-text="lang.small">小部门业绩</span>：<span id="countSmall">{{minDepartment}}</span></div>
		</div>
		<div class="sec2" v-bind:style="{display: listData && listData.length === 0 ? 'block' : 'none'}">
			<img class="img1" src="../../assets/img/img_empty2x.png" />
		</div>
		<!-- <div class="mui-content mui-fullscreen invitelist-content"> -->
			<div id="mescroll" class="mescroll">
				<v-loadmore :top-method="loadTop" :auto-fill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
					<div id="datalist" class="invitelist">
						<div class="item" v-for="(n,index) in listData" :key="index">
							<div class="row">
								<span class="time">{{n.registerTime.DateFormat('yyyy-MM-dd')}}</span>
								<span class="name">{{n.userName}}</span>
							</div>
							<p class="num">{{n.declarationCenters}}</p>
						</div>
					</div>
				</v-loadmore>
			</div>
		<!-- </div> -->
		<confirmPassword></confirmPassword>
	</div>
</template>


<script>
	import headNav from '@/components/headNav/index.vue'
	import i18n from '@/assets/mui/js/fun/i18n'
	import confirmPassword from '@/views/other/confirmPassword.vue'
	import {Loadmore} from 'mint-ui';
	const lang = {
		lang: app.getLanguage(),
		res: {
			en: {
				total: 'Total performance',
				small: 'Small Sector Performance',
			},
			zh: {
				total: '总业绩',
				small: '小部门业绩'
			}
		}
	};
	export default {
		name: 'inviteList',
		data() {
			return {
				lang: i18n.init(lang),
				teamQuy: 0,
				minDepartment: 0,
				page: 1,   // 第几页
				pageSize:10,
				total:'',  // 总页数
				listData: [],  // list数据
				allLoaded: false,  // 是否可以上拉
				scrollMode:'auto',				
			}
		},
		methods: {
			getData(){   // 获取列表
				const vm = this
				app.ajax({
					wait: false,
					close: false,
					path: "/app!myCecommendList.action",
					data: {
						page: this.page,
					}
				}).then((rs) =>{
					this.listData = rs.data.data;
					this.page = rs.data.page;
					this.pageSize = rs.data.rows;
					this.total = rs.data.total;
				});
			},

			loadTop(){   // 下拉加载
				this.page = 1;
				this.getData();
				this.allLoaded = false;
				this.$refs.loadmore.onTopLoaded();   // ui框架的方法
			},

			loadBottom() {  // 上拉加载
				console.log("上拉")
				this.more();  // 上拉触发分页查询
				this.$refs.loadmore.onBottomLoaded();
			},

			more(){  // 分页查询
				let u = navigator.userAgent;
				let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;  // 安卓终端
				let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				if(this.page != this.total){
					this.page = parseInt(this.page) + 1;
					app.ajax({
						wait: false,
						close: false,
						path: "/app!myCecommendList.action",
						data: {
							page: this.page,
						}
					}).then((rs) => {
						this.listData = this.listData.concat(rs.data.data);
						this.isHaveMore(rs.data.total);
					})
					this.$refs.loadmore.onBottomLoaded();
					if(isiOS == true){
						this.scrollMode = "touch"
					}
				} else {
					this.allLoaded = true;
					Toast({
						message:'已经是最后一页了',
						duration:1500
					})
				}
			},

			isHaveMore(isHaveMore){
				if(isHaveMore == true){
					this.allLoaded = false;
				}
			},

			getInit(){   // 初始化接口
				app.ajax({
					wait: false,
					close: false,
					path: '/app!myCecommendStat.action',
				}).then((eResult) => {
					var data = eResult.data.data;
					//总业绩
					this.teamQuy = data.teamQuy
					this.minDepartment = data.minDepartment
				});
			}
		},
		components: {
			headNav,
			confirmPassword,
			'v-loadmore': Loadmore,
		},
		mounted: function () {
			const vm = this
			// document.getElementById('inviteList').style.minHeight = window.screen.availHeight + 'px'
		},
		created () {
			this.getData();
			this.getInit()
		}
	};
</script>
<style scoped>
	body,.mui-content{
		background: #fff;
	}
	.invitelist-content{
		top: 0;
	}
	.invitelist-count{
		width: 100%;
		position: fixed;
		top: 50px;
		left: 0;
		z-index: 10;
	}
	.mescroll{
		height: 100vh;
		overflow:scroll;
		padding-top: 100px;
	}
	.mui-fullscreen{
		position: relative!important;
	}
	.sec2{
		width: 100%;
		text-align: center;
		margin-top: 100px;
	}
	.img1{
		width: 145px;
	}
</style>
