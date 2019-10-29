<template>
    <div class="invite-body" id="invite-body" style="background: #F2F4F7FF;">
      <img class="img1" src="../../../assets/img/bg_top3x.png" />
      <header class="mui-bar mui-bar-nav">
        <router-link class="mui-btn mui-btn-link mui-pull-right" to='/inviteList' tag='a'>{{lang.pinviteList}}</router-link>
			  <h1 class="mui-title" v-text="lang.invite">邀请好友</h1>
		</header>
      <div class="mui-content mui-fullscreen invite-content" v-cloak>
        <div class="invite-block">
          <h5 class="title" v-text="lang.inviteTitle"></h5>
          <div class="code">{{inviteCode}}</div>
          <p v-bind:data-clipboard-text="inviteCode" class="copy" v-text="lang.btnText"></p>
        </div>
        <div class="invite-block">
          <img class="qrcode" v-bind:src="imgSrc" />
          <p class="download" v-text="lang.downloadText"></p>
        </div>
      </div>

      <div v-show="$store.state.shareMaskShow" v-on:click="selectedShow=false" v-bind:class="{'bottom-view-mask': true, 'show': true}"></div>
      <div id="remarksPopover" class="mui-popover mui-popover-center" v-bind:style="{opacity: 1, display: $store.state.shareMaskShow ? 'block' : 'none'}">
        <div class="title">规则提示</div>
        <div class="text text0">每个用户都是从<span class="yellow0">青铜矿工</span>开始</div>
        <div class="text text1">直推有效用户达3人可升级投资<span class="grey">白银矿工</span>。</div>
        <div class="text text1">直推有效用户达5人可升级投资<span class="yellow0">黄金矿工</span>。</div>
        <div class="text text1">存入10000USDT自动成为<span class="yellow0">黑钻矿工</span>。</div>
        <div class="btn-row">
          <button v-on:click="hideMask" id="btnClose" type="button" class="mui-btn mui-btn-block mui-btn-grey" v-text="lang.iknow"></button>
        </div>
      </div>
      <tabBar activeIcon="sharePage"></tabBar>
    </div>
</template>

<script>
  import TabBar from '@/components/tabbar/tabbar.vue'
  import i18n from '@/assets/mui/js/fun/i18n'
  import '../../../assets/mui/css/share-popover.css'
  import '../../../assets/mui/css/app.css'
  import { Toast } from 'mint-ui'
  import AppConfig from '@/assets/mui/js/fun/config.js'
  import ClipboardJS from 'clipboard'
  const lang = {
    lang: app.getLanguage(),
    res: {
      en: {
        invite: 'Invite',
        pinviteList: 'Invite Record',
        inviteTitle: 'My exclusive invitation code',
        btnText: 'Click to copy',
        downloadText: 'Scan download app',
        iknow: 'I Know'
      },
      zh: {
        invite: '邀请好友',
        pinviteList: '邀请记录',
        inviteTitle: '我的专属邀请码',
        btnText: '点击复制',
        downloadText: '扫描下载APP',
        iknow: '知道了'
      }
    }
  };

  export default {
    name: 'sharePage',
    data() {
      return {
        lang: i18n.init(lang),
        inviteCode: app.getLoginName(),
        imgSrc: '',
        maskShow: this.$route.query.isShow || false
      }
    },
    components: {
      TabBar
    },
    methods: {
      hideMask(){
        this.$store.commit('setState', {
          'shareMaskShow': false
        })
      }
    },
    mounted: function() {
      const vm = this
      document.getElementById('invite-body').style.minHeight = window.screen.availHeight + 'px'
      var clipboard = new ClipboardJS('.copy');
      clipboard.on('success', function(e) {
        Toast(i18n.t('copySuccess'))
      });
      app.ajax({
        wait: false,
        close: false,
        path: '/app!inviteFriend.action',
      }).then(function(eResult) {
        var data = eResult.data.data;

        if (data.inviteCode) {
          vm.inviteCode = data.inviteCode;
        }

        var qrUrl = data.appDownloadQR;
        if (qrUrl) {
          if (qrUrl.indexOf("http://") != 0 && qrUrl.indexOf("https://") != 0) {
            qrUrl = AppConfig.ApiPath + qrUrl
          }
          vm.imgSrc = qrUrl
        }
      });
    }
  };
</script>
<style scoped>
  .invite-body{
    padding-bottom: 50px;
  }
  .invite-body, .invite-body .mui-content{
    background: transparent;
  }
  .img1{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
</style>
