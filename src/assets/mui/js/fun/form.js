//验证输入
(function() {
	var regexs = {
		email: /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/,
		url: /^([a-zA-z]+:\/\/)?[^\s]*$/,
		idcard: /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/,
		phone: /^1[2-9]\d{9}$/,
		tel: /^0\d{2}[-]?\d{8}|0\d{3}[-]?\d{7}$/,
		loginname: /^(?![0-9]+$)[0-9A-Za-z]{3,12}$/,
		username: /^[\u4e00-\u9fa5A-Za-z0-9]*$/,
		pwd: /^\S{6,18}$/,
		num: /^[0-9]*$/,
		skaccount: /^[^\u4e00-\u9fa5]{0,}$/,
	};
	var showErrorTip = function(vf, msg) {
		if (vf.tip == 'toast') {
			mui.toast(i18n.t(msg));
		} else {
			mui.alert(i18n.t(msg), i18n.t('tip'), i18n.confirm());
		}
	};

	var setValAndMsg = function(vf, name, val) {
		var msgStrar = val.indexOf("(");
		var msgEnd = val.lastIndexOf(")");
		vf[name] = val.substring(0, msgStrar);
		vf[name + 'msg'] = val.substring(msgStrar + 1, msgEnd);
	};

	var getVf = function(el) {
		var vf = {
			rq: false, //不能为空
			ec: false, //不需要提交
			eq: false, //相等
			reg: false, //正则表达式或者正则表达式的名称，
			tip: 'toast' //提示方式
		};
		var vfStrs = el.getAttribute('vf').split(',');
		vfStrs.forEach(function(n, i) {
			if (n.indexOf("=") > 0) {
				var objs = n.split('=');
				var name = objs[0];
				var val = objs[1];
				if (name == "reg" || name == "eq") {
					setValAndMsg(vf, name, val);
				} else {
					vf[name] = val;
				}
			} else {
				vf[n] = true;
			}
		});
		if (vf.rq && typeof vf.rq == "boolean") {
			var val = el.getAttribute("lang");
			if (val) {
				vf.rq = val;
			}
		}
		return vf;
	};

	var InputVerify = function(el, callback) {
		var val = el.value;
		var id = el.id;
		if (el.hasAttribute('vf') && el.getAttribute('vf')) {
			var vf = getVf(el);
			if (!vf.rq && (!val || val.length == 0)) {
				callback();
				return true;
			}
			if (vf.rq && (!val || val.length == 0)) {
				isPass = false;
				showErrorTip(vf, vf.rq);
				return false;
			}
			if (vf.reg) {
				var regex = regexs[vf.reg];
				if (!regex) {
					regex = new RegExp(verifyJson.regex, "g");
				}
				if (!regex.test(val)) {
					showErrorTip(vf, vf.regmsg);
					return false;
				}
			}
		}
		callback(val);
		return true;
	};

	var CheckVerify = function(el) {
		if (el.hasAttribute('vf') && el.getAttribute('vf')) {
			var vf = getVf(el);
			if (vf.rq && !el.checked) {
				showErrorTip(vf, vf.rq);
			}
			return el.checked;
		}
		return true;
	};

	var FormVerify = function(el, callback) {
		if (typeof el === 'function') {
			callback = el;
			el = '.mui-content';
		}
		var isPass = true;
		var valJson = {};
		mui(el).each(function() {
			mui.each(this.querySelectorAll('input,select,textarea'), function(i, el) {
				var val = el.value;
				var id = el.id;
				if (el.type == "checkbox" || el.type == "radio") {
					isPass = CheckVerify(el);
					return isPass;
				} else {
					if (el.hasAttribute('vf') && el.getAttribute('vf')) {
						var vf = getVf(el);
						if (!vf.rq && (!val || val.length == 0)) {
							return true;
						}
						if (vf.rq && (!val || val.length == 0)) {
							isPass = false;
							showErrorTip(vf, vf.rq);
							return false;
						}
						if (vf.reg) {
							var regex = regexs[vf.reg];
							if (!regex) {
								regex = new RegExp(vf.reg, "g");
							}
							if (!regex.test(val)) {
								isPass = false;
								showErrorTip(vf, vf.regmsg);
								return false;
							}
						}
						if (vf.eq) {
							if (document.getElementById(vf.eq).value != val) {
								isPass = false;
								showErrorTip(vf, vf.eqmsg);
								return false;
							}
							return true;
						}
						if (vf.ec) {
							return true;
						}
					} else if (!val || val.length == 0) {
						return true;
					}
					valJson[id] = val;
				}
			});
			return isPass;
		});
		if (isPass) {
			callback(valJson);
		}
	};

	window.InputVerify = InputVerify;
	window.FormVerify = FormVerify;

})();
