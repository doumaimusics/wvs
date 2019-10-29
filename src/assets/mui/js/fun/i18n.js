//国际化

  var resources = {
    en: {
      back: 'Back',
      confirm: 'Confirm',
      cancel: 'Cancel',
      plogin: 'Login',
      tip: 'Tip',
      copySuccess: 'Copy Success',
      callPhone: 'Call：',
      net_logout: 'Login expired',
      net_timeout: 'Network connection timeout',
      net_error: 'Server response failed!',
      net_abort: 'Network connection is broken',
      ms_emptytip: 'No relevant data yet',
      ms_textInOffset: 'Pull down to refresh',
      ms_textOutOffset: 'Release update',
      ms_textLoading: 'Loading ...',
      loading_again: 'Click to reload',
      en: 'english',
      zh: 'chinese',
    },
    zh: {
      back: '返回',
      confirm: '确定',
      cancel: '取消',
      plogin: '会员登录',
      tip: '提示',
      copySuccess: '复制成功',
      callPhone: '拨打电话：',
      net_logout: '登陆失效',
      net_timeout: '网络连接超时',
      net_error: '服务器响应失败!',
      net_abort: '网络连接中断',
      ms_emptytip: '暂无相关数据~',
      ms_textInOffset: '下拉刷新',
      ms_textOutOffset: '释放更新',
      ms_textLoading: '加载中 ...',
      loading_again: '点击重新加载',
      en: '英文',
      zh: '中文',
    }
  };

  var i18n = {
    lang: function(val) {
      var _this = this;
      var language = window.localStorage.lang || 'zh';
      var body = document.body;

      if (language) body.classList.remove(language);

      language = val;

      body.classList.add(language);

      //查找所有的需要设置国际化的元素,目前只支持设置placeholder，textContet
      var eles = document.querySelectorAll('[lang]');
      var len = eles.length;
      for (var i = 0; i < len; i++) {
        var ele = eles[i];
        var key = ele.getAttribute('lang');
        if (key) {
          var tagName = ele.tagName.toLowerCase();
          if (tagName == 'input') {
            ele.setAttribute('placeholder', _this.t(key))
          } else {
            ele.textContent = _this.t(key);
          }
        }
      }
      _this.change && _this.change();
    },
    res: function(obj) {
      if (!obj) return;
      for (var langKey in obj) {
        var langObj = obj[langKey];
        var nowLangObj = resources[langKey] || [];
        if (!langObj) continue;
        for (var key in langObj) {
          nowLangObj[key] = langObj[key];
        }
        resources[langKey] = nowLangObj;
      }
    },
    t: function(key) {
      var language = window.localStorage.lang || 'zh';
      var langObj = resources[language];
      if (!langObj) {
        throw '找不到语言环境：' + language;
      }
      var val = langObj[key];
      if (!val) {
        throw '找不到语言字符串：' + key;
      }
      return val;
    },
    init: function(options) {
      var language = window.localStorage.lang || 'zh';
      var _this = this;
      _this.res(options.res);
      return resources[language];
    }
  };

  i18n.btns = function() {
    return [i18n.t('cancel'), i18n.t('confirm')];
  };

  i18n.confirm = function() {
    return i18n.t('confirm');
  };

export default i18n

