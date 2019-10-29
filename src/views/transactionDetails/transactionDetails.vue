<template>
    <div class="transaction">
        <head-nav></head-nav>
        <div class="title_box">
            <ul>
                <li v-for="(item,index) in titleData" 
                :key="item.id" 
                :class="{activeColor:seleteIndex == index}" 
                @click="selectFun(index)">{{item.title}}</li>
            </ul>
        </div>

        <!-- <div class="content_box"> -->
            <temp-itema v-if="seleteIndex==0"></temp-itema> 
            <temp-itemb v-else-if="seleteIndex==1"></temp-itemb>
            <temp-itemc v-else-if="seleteIndex==2"></temp-itemc>
            <temp-itemd v-else-if="seleteIndex==3"></temp-itemd>
            <temp-iteme v-else-if="seleteIndex==4"></temp-iteme> 
            <temp-itemf v-else-if="seleteIndex==5"></temp-itemf> 

        <!-- </div> -->
        
    </div>
</template>

<script>
import i18n from '@/assets/mui/js/fun/i18n'
import headNav from '@/components/headNav/index.vue'
import TempItema from './compinents/templateA'
import TempItemb from './compinents/templateB'
import TempItemc from './compinents/templateC'
import TempItemd from './compinents/templateD'
import TempIteme from './compinents/templateE'
import TempItemf from './compinents/templateF'
const lang = {
    lang: app.getLanguage(),
    res: {
        en: {
            ecology: 'Ecology',
            income: 'Income',
        },
        zh: {
            ecology: '生态',
            income: '收益池',
        }
    },
  };
export default {
    name:'transactionDetails',
    data() {
        return {
            seleteIndex:0,
            titleData:[
                { title:'生态',id:1 },
                { title:'收益池',id:2 },
                { title:'动态池',id:3 },
                { title:'USDT',id:4 },
                { title:'节点',id:5 },   // 12
                { title:'基金',id:6 },   // 11
            ]
        }
    },

    methods:{
        
        selectFun(i){
            this.seleteIndex = i;
        }
    },
    mounted () { 
    },
    created() {
        this.seleteIndex = this.$route.query.n
    },
    components:{
        TempItema,
        TempItemb,
        TempItemc,
        TempItemd,
        TempIteme,
        TempItemf,
        headNav
    }
}
</script>

<style lang="scss" scoped>
    html,body,div,ul,li,ol{
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .transaction{
        background: #F2F4F7;
        height: 100vh;
        .title_box{
            background: #fff;
            height: 50px;
            border-bottom: 1px solid #F2F4F7;
            position: fixed;
            left: 0;top:50px;
            width: 100%; 
            z-index: 100;
            ul{
                display: flex;
                display:-webkit-box;
                display: -ms-flexbox;
                -webkit-box-align: middle;
                -ms-flex-align: middle;
                align-items: middle;
                overflow: auto;
                li{
                    // width: 25%;
                    line-height: 50px;
                    font-size: 13px;
                    color: #A4A7B2;
                    text-align: center;
                    -ms-flex-negative:0;
                    flex-shrink: 0;
                    padding: 0px 20px 0;
                    margin: 0 5px;
                }
                .activeColor{
                    border-bottom: 1px solid #285BDE;
                    color: #333;
                }
            }
        }
        .content_box{
            padding-top: 110px;
            background: #F2F4F7;
            height:100vh;
            overflow: scroll;
        }
        
    }
</style>

