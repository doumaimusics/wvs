import axios from 'axios'
import i18n from './i18n'
//APP的配置
import AppConfig from './config'

function GetIdByUrl(url) {
	var startIndex = url.lastIndexOf('/') + 1;
	return url.substring(startIndex, url.lastIndexOf("."));
}

function GetParamByUrl(url) {
	var index = url.indexOf('?');
	var pageUrl = url;
	var options = {
		title: null,
		id: GetIdByUrl(pageUrl),
		url: pageUrl,
		extras: {},
		theme: null,
	};
	if (index > 0) {
		pageUrl = url.substring(0, index);
		var paramStr = url.substr(index + 1);
		var paramStrItems = paramStr.split("&");
		// mui.each(paramStrItems, function(i, item) {
		// 	var temps = item.split("=");
		// 	var name = temps[0];
		// 	var value = temps[1];
		// 	if (name == 'title') {
		// 		options.title = value;
		// 	} else if (name == 'theme') {
		// 		options.theme = value;
		// 	} else {
		// 		options.extras[name] = value;
		// 	}
		// });
	}
	return options;
}

function HideKeyboard() {
	//隐藏键盘，并且返回关闭时间
	var ele = document.activeElement;
	if (ele) {
		var tagName = ele.tagName.toLowerCase();
		if (tagName == 'input' || tagName == 'textarea') {
			ele.blur();
			return 300;
		};
	}
	return 0;
}

function CopyToClip(str) {
	// if (mui.os.android) {
	// 	var c = plus.android.importClass("android.content.Context");
	// 	var a = plus.android.runtimeMainActivity();
	// 	var d = a.getSystemService(c.CLIPBOARD_SERVICE);
	// 	plus.android.invoke(d, "setText", str);
	// } else if (mui.os.ios) {
	// 	var b = plus.ios.importClass("UIPasteboard");
	// 	var f = b.generalPasteboard();
	// 	f.setValueforPasteboardType(str, "public.utf8-plain-text");
	// }
}

function ToMoney(value) {
	var val = parseFloat(value);
	if (isNaN(val)) {
		val = "";
	} else {
		val = val.toFixed(2);
	}
	return val;
}

function ToMoney4(value) {
	var val = parseFloat(value);
	if (isNaN(val)) {
		val = "";
	} else {
		val = val.toFixed(4);
	}
	return val;
}

function ToMoney6(value) {
	var val = parseFloat(value);
	if (isNaN(val)) {
		val = "";
	} else {
		val = val.toFixed(2);
	}
	return val;
}

//时间格式化
Date.prototype.Format = function (fmt) {
	fmt = fmt || "yyyy-MM-dd hh:mm:ss";
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[
			k]).substr(("" + o[k]).length)));
	return fmt;
};

//将时间字符串转换成format格式的字符串
String.prototype.DateFormat = function (format) {
	var str = this.substr(0, 19).replace(/-/g, '/').replace(/[TZ]/g, ' ');
	return new Date(str).Format(format);
};

String.prototype.ToDate = function () {
	var str = this.substr(0, 19).replace(/-/g, '/').replace(/[TZ]/g, ' ');
	return new Date(str);
};

Element.prototype.hide = function () {
	if (!this.classList.contains('mui-hidden')) {
		this.classList.add('mui-hidden');
	}
};

Element.prototype.addClass = function (className) {
	if (!this.classList.contains(className)) {
		this.classList.add(className);
	}
};

Element.prototype.removeClass = function (className) {
	this.classList.remove(className);
};

Element.prototype.show = function () {
	this.classList.remove('mui-hidden');
};

Element.prototype.visible = function (show) {
	if (show) {
		this.show();
	} else {
		this.hide();
	}
};

//将值转换成价格的字符串，默认保留两个小数
function ParseMoney(value) {
	var val = parseFloat(value);
	if (isNaN(val)) {
		val = "";
	} else {
		val = val.toFixed(2);
	}
	return val;
}

//图片的路径，拼接完成的图片路径
function ImgPath(img) {
	if (img && (img.indexOf("http://") == 0 || img.indexOf("https://") == 0)) {
		return img;
	}
	if (img.indexOf('/') == 0) {
		return AppConfig.ApiPath + img;
	}
	return AppConfig.ApiPath + "/" + img;
}

//判断是否有图片，如果有返回完整的路径，如果没有返回默认路径，只能在pages的子目录下使用，因为默认图片的路径写死了
function DefaultImg(img) {
	return img ? ImgPath(img) : '../../imgs/default-img.png';
}

function ToPayTypeHtml(payTypes) {
	var html = '';
	if (payTypes && payTypes.length > 0) {
		payTypes = payTypes.split(",");
		for (var i = 0; i < payTypes.length; i++) {
			html += '<img class="pay-type-icon" src="../../imgs/pay_type_' + payTypes[i] + '.png" />';
		}
	}
	return html;
}

//拼接人民币符号路径
function PriceText(price) {
	return "¥" + price;
}

function IsPhone(text) {
	return /^1[1-9][0-9]{9}$/.test(text);
}

function CountDown(ele, time) {    // 倒计时
	if (!ele.classList.contains("o-disabled")) {
		ele.classList.add("o-disabled");
	}
	ele.setAttribute('text', ele.textContent);
	ele.setAttribute("disabled", "disabled");
	var lastTime = time - 1;
	ele.innerText = lastTime + " S";
	var intervalId = setInterval(function () {
		if (lastTime == 0) {
			ele.innerText = ele.getAttribute('text');
			ele.removeAttribute("disabled");
			ele.classList.remove("o-disabled");
			clearInterval(intervalId);
		} else {
			lastTime = lastTime - 1;
			ele.innerText = lastTime + " S";
		}
	}, 1000);
	return intervalId;
}

function ResetCountDown(ele) {
	ele.removeAttribute("disabled");
	ele.classList.remove("o-disabled");
}

//获取列表数据组件
function InitDataMescroll(options) {
	//mescrollId,datalistId,getItem
	var mOptions = mui.extend({
		data: {},
		auto: true,
		loadItem: function (data, datalistEle, messcroll) {},
		page: true, //是否分页
	}, options);

	var datalist = document.getElementById(mOptions.datalistId);

	var mescroll = new MeScroll(mOptions.mescrollId, {
		down: {
			auto: false,
			textInOffset: i18n.t('ms_textInOffset'),
			textOutOffset: i18n.t('ms_textOutOffset'),
			textLoading: i18n.t('ms_textLoading'),
		},
		up: {
			auto: mOptions.auto,
			isBounce: false,
			noMoreSize: 4,
			clearEmptyId: mOptions.datalistId,
			empty: {
				icon: "../../imgs/mescroll-empty.png", //图标,默认null
				tip: i18n.t('ms_emptytip')
			},
			toTop: {
				src: "../../imgs/mescroll-totop.png",
			},
			htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">' + i18n.t('ms_textLoading') +
				'</p>',
			page: {
				size: 10
			},
			callback: function (page) {
				var requestData = null;
				if (mOptions.page) {
					requestData = mui.extend({
						page: page.num
					}, mOptions.data);
				} else {
					requestData = mui.extend({}, mOptions.data);
				}
				app.ajax({
					wait: false,
					close: false,
					path: mOptions.path,
					data: requestData,
					success: function (eResult) {
						var list = eResult.data || [];
						mescroll.endByPage(list.length, eResult.totalSize);
						if (list.length > 0) {
							mOptions.loadItem(list, datalist, mescroll);
						}
					},
					error: function (msg) {
						mescroll.endErr();
						mui.toast(msg);
						return true;
					}
				});
			},
		}
	});
	if (!mOptions.page) {
		mescroll.lockUpScroll(true);
	}
	return mescroll;
}

(function () {

	var _openWindow = function (options) {
		//官方的有点麻烦，还是简化一下，如果不能通用，就使用官方的原始方法
		//id(可空),url,extras(可空)，buttons(可空),title,back(false)，theme 主题
		//去除焦点,防止打开的时候键盘还是显示的
		// HideKeyboard();
		var id = options.id || GetIdByUrl(options.url);
		var back = options.back != undefined ? options.back : true;
		var theme = options.theme || 'blue';
		var lineStyle = null,
			backgroundColor, titleColor;
		if (theme == 'blue') {
			backgroundColor = AppConfig.ThemeColor;
			titleColor = '#ffffff';
		} else {
			backgroundColor = '#ffffff';
			titleColor = '#030303';
			lineStyle = {
				color: '#ededed',
				height: '1px'
			};
		}

		// 	mui.openWindow({
		// 		id: id,
		// 		url: options.url,
		// 		styles: {
		// 			titleNView: {
		// 				titleText: i18n.t(options.title || 'p' + id),
		// 				backgroundColor: backgroundColor,
		// 				autoBackButton: !!back,
		// 				titleColor: titleColor,
		// 				buttons: options.buttons,
		// 				splitLine: lineStyle
		// 			},
		// 		},
		// 		show: {
		// 			duration: AppConfig.AnimTime
		// 		},
		// 		waiting: {
		// 			autoShow: false
		// 		},
		// 		extras: options.extras,
		// 	});
	};

	var app = {
		setTitle: function (title) {
			var self = plus.webview.currentWebview();
			self.setStyle({
				titleNView: {
					titleText: title,
				}
			});
		},
		setButtons: function (buttons) {
			var self = plus.webview.currentWebview();
			self.setStyle({
				titleNView: {
					buttons: buttons,
				}
			});
		},
		setTextButton: function (options) {
			this.setButtons([{
				color: '#FFFFFF',
				fontSize: '14px',
				text: options.text,
				width: 'auto',
				onclick: options.click,
			}]);
		},
		openWindow: function (options) {
			_openWindow(options);
		},
		openLoginWindow: function () {
			this.openWindow({
				url: "/pages/account/login.html",
				back: false,
				theme: 'white'
			});
		},
		openBarcodeWindow: function () {
			// mui.openWindow({
			// 	url: "/pages/other/barcode.html",
			// 	id: "barcode",
			// 	styles: {
			// 		titleNView: {
			// 			type: 'transparent',
			// 			titleText: '扫一扫',
			// 			autoBackButton: true,
			// 			buttons: [{
			// 				fontSrc: '_www/fonts/iconfont.ttf',
			// 				text: '\ue601',
			// 				fontSize: '18px',
			// 				onclick: 'javascript:scanPicture()'
			// 			}]
			// 		},
			// 		render: 'always',
			// 		hardwareAccelerated: true,
			// 		backButtonAutoControl: 'close',
			// 		scrollIndicator: 'none',
			// 		scalable: false
			// 	},
			// 	waiting: {
			// 		autoShow: false
			// 	}
			// });
		},
		closeView: function (id, now) {
			//关闭View
			var view;
			if (id) {
				view = plus.webview.getWebviewById(id);
			} else {
				view = plus.webview.currentWebview();
			}
			if (view) {
				var time = now ? 0 : AppConfig.AnimTime;
				// mui.later(function() {
				// 	view.close("none");
				// }, time);
			}
		},
		afterAnim: function (callback) {
			//等待窗口动画完成后执行
			// mui.later(callback, AppConfig.AnimTime);
		},
		fireView: function (idOrView, event, extras) {
			//触发View的事件
			var view;
			if (typeof idOrView === 'string') {
				if (idOrView == "index") {
					view = plus.webview.getLaunchWebview();
				} else {
					view = plus.webview.getWebviewById(idOrView);
				}
			} else {
				view = idOrView;
			}
			if (view) {
				// mui.fire(view, event, extras);
			}
		},
		ajax: function (options) {
			// 	//其他参数，path,success(e),error(msg)
			// 	options = mui.extend({
			// 		back: false, //这个参数的意思是，如果加载失败，是否显示弹窗，然后点击就返回
			// 		close: true,
			// 		wait: true,
			// 		login: true,
			// 		method: "post",
			// 		data: {},
			// 	}, options);

			options.back = options.back === undefined ? false : options.back;
			options.close = options.close === undefined ? true : options.close;
			options.wait = options.wait === undefined ? true : options.wait;
			options.login = options.login === undefined ? true : options.login;
			options.method = options.method === undefined ? 'post' : options.method;
			options.data = options.data === undefined ? {} : options.data;

			//
			// 	var that = this;
			// 	var headers = {
			// 		'Content-Type': 'application/json',
			// 	};
			// 	if (options.wait) {
			// 		if (typeof options.wait === "string") {
			// 			plus.nativeUI.showWaiting(options.wait);
			// 		} else {
			// 			plus.nativeUI.showWaiting();
			// 		}
			// 	}
			if (localStorage.token) {
				options.data.token = localStorage.token;
				// options.data.loginName = localStorage.loginName;
				if (!options.data.loginName){
					options.data.loginName = localStorage.loginName;
				}
			}
			// options.data.token = localStorage.token;
			// options.data.loginName = localStorage.loginName;


			var handleError = function (code, msg) {
				// plus.nativeUI.closeWaiting();
				if (code == 999) {
					//登录失败
					// mui.toast(i18n.t('net_logout'));
					that.openLoginWindow();
				} else {
					if (!msg) {
						if (code == 'timeout') {
							msg = i18n.t('net_timeout');
						} else if (code == 'abort') {
							msg = i18n.t('net_abort');
						} else {
							msg = i18n.t('net_error');
						}
					}
					if (typeof options.error !== "function" || !options.error(msg)) {
						if (options.back) {
							// mui.alert(msg, i18n.t('tip'), i18n.t('back'), function() {
							// 	mui.back();
							// });
						} else {
							// mui.alert(msg, i18n.t('tip'), i18n.confirm());
						}
					}
				}
			};

			var requestUrl = AppConfig.ApiPath + options.path;
			return axios({
				url: requestUrl,
				method: options.method,
				data: options.data,
				params: options.data,
				dataType: 'json',
				timeout: 10000,
			})
		},
		//下面是业务所用的方法
		setToken: function (token) {    // 设置setToken
			localStorage.token = token;
		},
		isLogin: function () {
			return localStorage.token && localStorage.loginName;
		},
		logout: function () {
			var lang = localStorage.lang;
			localStorage.clear();
			//需要关闭所有的View
			var self = plus.webview.currentWebview();
			var index = plus.webview.getLaunchWebview();
			// mui.each(plus.webview.all(), function(i, n) {
			// 	if (n != self && n != index) {
			// 		n.close('none');
			// 	}
			// });
			if (self != index) {
				self.close();
			}
			this.openLoginWindow();
			if (lang) localStorage.lang = lang;
		},
		setMCSAccount: function (mcsAccount) {
			localStorage.mcsAccount = mcsAccount;
		},
		getMCSAccount: function () {
			return localStorage.mcsAccount;
		},
		getLoginName: function () {
			return localStorage.loginName;
		},
		getUserName: function () {
			return localStorage.userName;
		},
		getUserType: function () {
			return localStorage.userType;
		},
		setUserInfo: function (userInfo) {    // 设置用户名
			localStorage.userInfo = JSON.stringify(userInfo);
			localStorage.mobile = userInfo.mobile;
			localStorage.loginName = userInfo.loginName;
			localStorage.userName = userInfo.userName;
			localStorage.userType = userInfo.userType;
		},
		getUserInfo: function () {
			if (localStorage.userInfo) {
				return JSON.parse(localStorage.userInfo);
			}
			return {};
		},
		changeUserInfo: function (userInfo) {
			var userOld = this.getUserInfo();
			// mui.extend(userOld, userInfo);
			this.setUserInfo(userOld);
		},
		setLanguage: function (lang) {
			localStorage.lang = lang;
		},
		getLanguage: function () {
			return localStorage.lang || 'zh';
		}
	};

	window.app = app;

})();



//下拉初始化
app.pullInit = function (callback, beforeback) {
	beforeback = beforeback || function () {};
	// mui.init({
	// 	beforeback: beforeback,
	// 	pullRefresh: {
	// 		container: "#refreshContainer", //下拉容器
	// 		down: {
	// 			style: 'circle',
	// 			color: AppConfig.ThemeColor,
	// 			offset: '0px',
	// 			auto: true,
	// 			callback: callback
	// 		}
	// 	}
	// });
};

// mui.plusReady(function() {
// 	//监听class为open-a的标签，打开界面
// 	mui('body').on('tap', '[open-url]', function(e) {
// 		e.stopPropagation();
// 		var url = this.getAttribute('open-url');
// 		var options = GetParamByUrl(url);
// 		if (!options.title) {
// 			options.title = this.getAttribute('open-title');
// 		}
// 		if (url.indexOf('/shop/') == -1) {
// 			app.openWindow(options);
// 		} else {
// 			app.openShopWindow(options);
// 		}
// 	});
//
// 	//拨打电话
// 	mui('body').on('tap', '.bind-tel', function(e) {
// 		e.stopPropagation();
// 		var telNumber = this.innerText;
// 		if (telNumber) {
// 			mui.confirm(i18n.t('callPhone') + telNumber, i18n.t('tip'), i18n.btns(), function(e) {
// 				if (e.index == 1) {
// 					plus.device.dial(telNumber, true);
// 				}
// 			});
// 		}
// 	});
//
// 	mui('body').on('tap', '.bind-copy', function(e) {
// 		e.stopPropagation();
// 		var content = this.innerText;
// 		if (content) {
// 			mui.toast(i18n.t('copySuccess'));
// 			CopyToClip(content);
// 		}
// 	});
//
// });

if (typeof Vue === "function") {
	Vue.filter('jsonStr', function (value) {
		return JSON.stringify(value);
	});

	Vue.filter('fixedImg', function (value) {
		return DefaultImg(value);
	});
}

export default{
	CountDown: CountDown,   // 倒计时
	setUserInfo: app.setUserInfo,   // 设置用户
	setToken: app.setToken,
	fireView: app.fireView
}
