<template>
    <div id="datalist0" class="transferlist">
        <v-loadmore :top-method="loadTop" :auto-fill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <div class="null_box"  v-if="listData.length == 0">
                <div class="img_box"></div>
                <p>暂无相关数据</p>
            </div>
            <div class="item" v-for="(item) in listData" :key="item.id" v-else>
                <div class="row">
                    <span class="change" v-if="item.expenditure > 0">- {{item.expenditure}}</span>
                    <span class="change" v-if="item.income > 0" :class="{plus:item.income > 0}">+ {{item.income}}</span>
                    <span class="type">{{item.transactionType}}</span>
                </div>
                <p class="content">{{item.aliasName}}</p>
                <div class="row">
                    <span class="time">{{item.optDate ? item.optDate.DateFormat("yy-MM-dd hh:mm") : ''}}</span>
                    <span class="status">{{item.status}}</span>
                </div>
            </div>
        </v-loadmore>
    </div>
</template>

<script>

import {Loadmore} from 'mint-ui';
export default {
    data() {
        return {
            listData:[],
            searchCondition:{  //分页属性
                pageNo:"1",   // 第几页
                pageSize:"10",  // 每页显示数字
                total:''   // 总页是
            },
            allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
            scrollMode:"auto" //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        }
    },
    methods:{
        getList(){
            app.ajax({
                wait: false,
                close: false,
                path: '/app!accountDetails.action',
                data: {
                    accountType: 'WALLET12',
                    page:this.searchCondition.pageNo
                },
            }).then((res) => {
                this.listData = res.data.data;
                this.searchCondition.pageNo = res.data.page;
                this.searchCondition.pageSize = res.data.rows;
                this.searchCondition.total = res.data.total;
            })
        },
        loadTop() {    // 下拉加载
            // 加载更多数据
            this.searchCondition.pageNo = 1;
            this.getList();    
            this.allLoaded = false;       
            this.$refs.loadmore.onTopLoaded();
        },
        loadBottom() { // 上拉加载
            this.more();// 上拉触发的分页查询
            this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
        },
        more(){ // 分页查询
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if(this.searchCondition.pageNo != this.searchCondition.total){
                this.searchCondition.pageNo = parseInt(this.searchCondition.pageNo) + 1;
                app.ajax({
                    wait: false,
                    close: false,
                    path: '/app!accountDetails.action',
                    data: {
                        accountType: 'WALLET01',
                        page:this.searchCondition.pageNo
                    },
                }).then((res) => {
                    this.listData = this.listData.concat(res.data.data);
                    this.isHaveMore(res.data.total);  // 上拉判断是否还有下一页数据要加载 
                })
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
        }

        
    },
    mounted () {
        this.getList()
    },
    created() {
    },
    components:{
        'v-loadmore': Loadmore,
    }
}
</script>
<style lang="scss">
    .transferlist{
         height:100vh;
         overflow: scroll;
         padding-top: 100px!important;
    }
    .null_box{
        box-sizing: border-box;
        padding: 175px 0 0 0;
        .img_box{
            width: 145px;
            height: 93px;
            background: url('../../../assets/img/null_img.png') no-repeat;
            background-size: cover;
            margin: 0 auto;
            margin-bottom: 13px;
        }
        p{
            font-size: 13px;
            color: #A4A7B2;
            text-align: center;
        }
    }
</style>

