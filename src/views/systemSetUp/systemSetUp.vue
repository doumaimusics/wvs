<template>
    <div class="systemSetUp">
        <head-nav></head-nav>
        <div class="mui-content settings-content">
			<ul class="mui-table-view settings-table">
				<li class="mui-table-view-cell" @click="toChangePass" >
					<a class="mui-navigate-right" v-text="lang.ploginpwd"></a>
				</li>
				<li class="mui-table-view-cell" @click="toTransactionPass">
					<a class="mui-navigate-right" v-text="lang.ptraderpwd"></a>
				</li>
			</ul>
			<ul class="mui-table-view settings-table">
				<li class="mui-table-view-cell" @click="toLangSetPage">
					<a class="mui-navigate-right">
						<span v-text="lang.planguage"></span>
						<span class="right"></span>
					</a>
				</li>
			</ul>
			<!-- <ul class="mui-table-view settings-table">
				<li class="mui-table-view-cell" id="update">
					<a class="mui-navigate-right">
						<span v-text="lang.versionTitle"></span>
						<span class="right"></span>
					</a>
				</li>
			</ul> -->
		</div>
        <div class="btn_box" @click="returnFun" v-text="lang.btnLogout"></div>
    </div>
</template>

<script>
import i18n from '@/assets/mui/js/fun/i18n'
import headNav from '@/components/headNav/index.vue'
const lang = {
	lang: app.getLanguage(),
	res: {
		en: {
            planguage: 'Language',
            ploginpwd: 'Login Password',
            ptraderpwd: 'Trader Password',
            versionTitle: 'App Version',
            btnLogout: 'Logout',
            logoutTip: 'Did you log out?',
            logoutSuccess: 'You have logged out'
        },
        zh: {
            planguage: '语言切换',
            ploginpwd: '登录密码',
            ptraderpwd: '交易密码',
            versionTitle: '系统版本',
            btnLogout: '退出当前用户',
            logoutTip: '是否退出登录？',
            logoutSuccess: '你已退出登录'
        }
    }
			
}
export default {
    name:'systemSetUp',
    data() {
        return {
            lang: i18n.init(lang)
        }
    },
    methods: {
        toChangePass(){   // 修改密码
            this.$router.push({
                name:'changePassword'
            })
        },
        toTransactionPass(){   // 交易密码
            this.$router.push({
                name:'transactionPassword'
            })
        },
        toLangSetPage(){   // 语言切换
            this.$router.push({
                name:'langSetPage'
            })
        },
        returnFun(){   // 退出登录
            MessageBox.confirm(this.lang.logoutTip).then(action => {
                this.$store.commit('$_removeStorage')
                this.$router.push({
                    name:'login'
                });
                Toast({message:this.lang.logoutSuccess, duration: 1500});
            }).catch(()=>{})
        }
    },
    components:{
        headNav
    }
}
</script>

<style lang="scss">
</style>
<style lang="scss" scoped>
    /* 1PX下边框 */
    .bdr-b:after {
        height: 1px;
        content: '';
        width: 100%;
        border-bottom: 1px solid #f0f0f0;
        position: absolute;
        bottom: 0;
        right: 0;
        transform: scaleY(0.5);
        -webkit-transform: scaleY(0.5);
        z-index: 10;
    }
    .systemSetUp{
        padding:80px 15px 15px 15px;
        box-sizing: border-box;
        height: 100vh;
        background: #F2F2F2;
        .settings-content{
            margin-bottom: 30px;
        }
        .btn_box{
            height: 45px;
            background: #DD524D;
            border-radius: 4px;
            text-align: center;
            line-height: 45px;
            color: #fff;
        }
    }
</style>