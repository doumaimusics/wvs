<template>
    <div class="pop_box">
        <mt-popup v-model="isShow" :closeOnClickModal="false">
            <div class="title_box">
                <h3>修改用户昵称</h3>
                <div class="close_box" @click="close">x</div>
            </div>
            <div class="input_box">
                <div class="input">
                    <input type="text" placeholder="请输入用户名" v-model="usName">
                    <!-- <div class="clear_icon">x</div> -->
                </div>
                
            </div>
            <div class="btn_box" @click="confirms">确认</div>
        </mt-popup>
    </div>
</template>

<script>
export default {
    data(){
        return {
            usName:localStorage.getItem('userName')
        }
    },
    methods:{
        close(){   // 关闭事件
            this.$emit('closeFun')
        },
        confirms(){  // 确认事件
            this.$emit('confirmFun',this.usName);
        }
    },
    props:['isShow'],
}
</script>

<style>
    .mint-cell-wrapper,.mint-field-core{
        background-image: none;
    }
</style>
<style lang="scss" scoped>
    .mint-popup{
        width: 300px;
        border-radius: 10px;
        box-sizing: border-box;
        .title_box{
            text-align: center;
            position: relative;
            padding: 20px 0 53px 0;
            h3{
                font-size: 16px;
            }
            .close_box{
                width: 18px;
                height: 18px;
                position: absolute;
                right: 18px;top:22px;
                line-height: 18px;
                font-size: 18px;
            }
        }
        .input_box{
            padding:0  28px;
            height: 45px;
            margin-bottom: 48px;
            .input{
                display: flex;
                height: 100%;
                input{
                    background: #F2F4F7;
                    text-align: center;
                    border: none;
                    height: 100%;
                    padding:0;
                    font-size: 12px;
                }
            }
            
        }
        .btn_box{
            height: 60px;
            text-align: center;
            color: #285BDE;
            font-size: 16px;
            line-height: 60px;
            border-top: 1px solid #E6E9ED;
        }
    }
</style>