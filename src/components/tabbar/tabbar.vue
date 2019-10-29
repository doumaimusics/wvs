<template>
    <nav class="mui-bar mui-bar-tab">
        <Item class="mui-tab-item"
         :txt='item.tabLabel'
         :page='item.pageName'
         @change='getVal'
         v-for='(item,index) in tabList' :key="index"
         :sel='selected'>
            <img :src="item.imgUrl" slot='normalImg'>
            <img :src="item.imgUrlSeleUrl" slot='activeImg'>
        </Item>
    </nav>
</template>

<script>
import Item from './item.vue';
export default {
    props:['activeIcon'],
    data(){
        return{
            selected:this.activeIcon,
            tabList:[
                {
                    tabLabel:'首页',
                    imgUrl:require('../../assets/tabbar/tab-home.png'),
                    imgUrlSeleUrl:require('../../assets/tabbar/tab-home-select.png'),
                    pageName:'homePage'
                },
                {
                    tabLabel:'趣味',
                    imgUrl:require('../../assets/tabbar/tab-taste.png'),
                    imgUrlSeleUrl:require('../../assets/tabbar/tab-taste-select.png'),
                    pageName:'taste'
                },
                {
                    tabLabel:'旅游',
                    imgUrl:require('../../assets/tabbar/tab-tour.png'),
                    imgUrlSeleUrl:require('../../assets/tabbar/tab-tour-select.png'),
                    pageName:'tourism'
                },
                {
                    tabLabel:'分享',
                    imgUrl:require('../../assets/tabbar/tab-share.png'),
                    imgUrlSeleUrl:require('../../assets/tabbar/tab-share-select.png'),
                    pageName:'sharePage'
                },
                {
                    tabLabel:'我的',
                    imgUrl:require('../../assets/tabbar/tab-mine.png'),
                    imgUrlSeleUrl:require('../../assets/tabbar/tab-mine-select.png'),
                    pageName:'ownPage'
                }
            ]
        }
    },

    methods: {
        getVal(res){
            this.selected = res;
        },
    },
    components:{
        Item
    },
    created(){
    }
}
</script>



<style lang="scss">
    .muiColor{
        color: #285BDEFF;
    }
</style>
