<template>
    <div class="mui-content language-content">
        <head-nav></head-nav>

        <h5 class="language-title" style="color: #A4A7B2;" v-text="lang.title">{{lang.title}}</h5>
        <div class="list_box">
            <ul class="mui-table-view mui-table-view-radio">
                <li class="mui-table-view-cell" data-value='zh' @click="seleLang(1)">
                    <a class="mui-navigate-right">中文</a>
                    <div class="sele" v-if="seleId == 1">√</div>
                </li>
                <li class="mui-table-view-cell" data-value='en' @click="seleLang(2)">
                    <a class="mui-navigate-right">English</a>
                    <div class="sele" v-if="seleId == 2">√</div>
                </li>
            </ul>
        </div>
    
      <div class="btn-row">
          <button v-on:click="submit" type="button" class="mui-btn mui-btn-block mui-btn-primary" v-text='lang.confirm'>
            {{lang.confirm}}
          </button>
      </div>
  </div>
</template>

<script>
import headNav from '@/components/headNav/index.vue'
import i18n from '@/assets/mui/js/fun/i18n'
const lang = {
    lang: app.getLanguage(),
    res: {
      en: {
        title: 'Please set up the APP language',
        toastTip: 'Please select a language',
        alertTip: 'Enable Current Language?',
        success: 'success',
      },
      zh: {
        title: '请设置APP语言',
        toastTip: '请选择语言',
        alertTip: '是否启用当前语言?',
        success: '设置成功',
      }
    },
  }
  export default {
    name: 'langSetPage',
    data() {
      return {
        lang: i18n.init(lang),  // 语言
        seleId: window.localStorage.getItem('lang') === 'en' ? 2 : 1
      }
    },
    methods: {
      seleLang(i) {
        if (i == 1) {
          this.seleId = 1;
        } else {
          this.seleId = 2;
        }
      },
      submit(){
        const vm = this
        if (this.seleId === 1){
          this.$store.commit('$_setLanguage', 'zh')
        } else {
          this.$store.commit('$_setLanguage', 'en')
        }
        Toast(this.lang.success)
        setTimeout(function () {
          vm.$router.go(-1)
        }, 2000)
      }

    },
    components:{
        headNav
    }
}
</script>

<style lang="scss" scoped>
  .mui-content {
    padding: 15px;
    height: 100vh;
    .list_box {
      background: #fff;
      border-radius: 4px;
      .mui-table-view {
        border-radius: 4px;
        .mui-table-view:before {
          border: none;
        }
        .mui-table-view-cell {
          position: relative;
          .sele {
            width: 16px;
            height: 16px;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 10px;
            margin: auto;
            color: #285BDE;

          }
        }
      }

    }
  }
</style>
