function DialogBox(options) {
	//onRender(ui),beforeShow(),onShow,beforeHide,onHide,title,btn,body,
	this.options = options;
	this.init();
}

DialogBox.prototype = {
	init: function() {
		var _this = this;
		this.create();
		document.body.appendChild(this.dialog);
		document.body.appendChild(this.mask);
		this.close.tapListener = function(e) {
			_this.hide();
		};
		this.close.addEventListener('tap', this.close.tapListener);
		this.options.onRender && this.options.onRender.call(this);
	},
	create: function() {
		var options = this.options;
		var dialog = document.createElement('div');
		dialog.className = 'dialog effect-fade ' + (options.dialogClass || '');
		var html = '<div class="dialog-container">' +
			'	<div class="dialog-header">' +
			'		<span class="dialog-close">x</span>' +
			'		<span class="dialog-title">' + options.title + '</span>' +
			'	</div>';

		if (options.body) {
			html += '<div class="dialog-body"></div>';
		}
		if (options.btn) {
			html += '<div class="btn-row">' +
				'<button type="button" class="mui-btn mui-btn-block mui-btn-blue">' + options.btn +
				'</button></div>';
		}
		html += '</div>';

		dialog.innerHTML = html;
		var mask = document.createElement('div');
		mask.className = 'dialog-mask';
		this.dialog = dialog;
		this.mask = mask;
		this.body = dialog.querySelector('.dialog-body');
		this.title = dialog.querySelector('.dialog-title');
		this.close = dialog.querySelector('.dialog-close');
		this.btn = dialog.querySelector('.btn-row button');
	},
	show: function() {
		var _this = this;
		this.options.beforeShow && this.options.beforeShow.call(this);
		setTimeout(function() {
			_this.dialog.style.display = 'block';
			setTimeout(function() {
				_this.dialog.classList.add('dialog-show');
				setTimeout(function() {
					_this.options.onShow && _this.options.onShow.call(_this);
				}, 320);
			}, 50);
			_this.mask.style.display = 'block';
		}, HideKeyboard());
	},
	hide: function() {
		var _this = this;
		var time = 0;
		this.options.beforeHide && this.options.beforeHide.call(this);
		setTimeout(function() {
			_this.dialog.classList.remove('dialog-show');
			setTimeout(function() {
				_this.dialog.style.display = 'none';
				_this.mask.style.display = 'none';
				setTimeout(function() {
					_this.options.onHide && _this.options.onHide.call(_this);
				}, 0);
			}, 100);
		}, HideKeyboard());
	},
	setTitle: function(text) {
		this.title.textContent = text;
	},
	setBtnText: function(text) {
		this.btn.textContent = text;
	},
};

i18n.res({
	en: {
		d_traderpwd_pl: 'Please enter the transaction password',
		d_traderpwd_title: 'Transaction password',
		d_username_pl: 'Please enter nickname',
		d_username_err: 'Nickname cannot contain special characters',
		d_username_title: 'Modify user nickname',
		d_code_pl: 'please enter verification code',
		d_code_title: 'Mobile verification code',
		d_code_btn: 'Get Code'
	},
	zh: {
		d_traderpwd_pl: '请输入交易密码',
		d_traderpwd_title: '交易密码',
		d_username_pl: '请输入用户昵称',
		d_username_err: '用户昵称不能包含特殊字符',
		d_username_title: '修改用户昵称',
		d_code_pl: '请输入手机验证码',
		d_code_title: '手机验证码',
		d_code_btn: '获取验证码'
	}
});

/**
 *密码框
 */
var dialogTransferPwd = null;

function OpenTransferPwdDialog(options) {
	if (!dialogTransferPwd) {
		var pwd = null,
			error = null;

		var dialogOptions = {
			dialogClass: 'dialog-transfer',
			btn: true,
			body: true,
			onRender: function() {
				var pl = i18n.t('d_traderpwd_pl');

				this.body.innerHTML = '<div class="mui-input-row input-row">' +
					'	<input type="password" class="mui-input-clear" placeholder="' + pl + '"/>' +
					'</div>' +
					'<p class="input-error"></p>';
				pwd = this.body.querySelector('input');
				error = this.body.querySelector('.input-error');
				this.btn.addEventListener('tap', function(e) {
					var value = pwd.value;
					if (!value) {
						mui.toast(pl);
						return;
					}
					error.innerText = '';
					app.ajax({
						path: '/app!tranPasswordValid.action',
						data: {
							'password': value
						},
						success: function(e) {
							dialogTransferPwd.hide();
							if (dialogTransferPwd.callback) {
								dialogTransferPwd.callback(value);
							}
						},
						error: function(msg) {
							error.innerText = msg;
							return true;
						}
					});
				});
			},
			beforeShow: function() {
				this.error.innerText = '';
				this.pwd.value = '';
			},
			onShow: function() {
				this.pwd.removeAttribute('readonly');
				this.pwd.focus();
				this.pwd.click();
			},
			beforeHide: function() {
				this.pwd.setAttribute('readonly', 'readonly');
				this.pwd.blur();
			}
		};
		dialogTransferPwd = new DialogBox(dialogOptions);
		dialogTransferPwd.error = error;
		dialogTransferPwd.pwd = pwd;
	}
	dialogTransferPwd.callback = options.callback;
	dialogTransferPwd.setTitle(options.title || i18n.t('d_traderpwd_title'));
	dialogTransferPwd.setBtnText(options.btn || i18n.confirm());
	dialogTransferPwd.pwd.setAttribute('placeholder', i18n.t('d_traderpwd_pl'));
	dialogTransferPwd.show();
}

/**
 *密码框
 */
var dialogVfCode = null;

function CloseVfCodeDialog() {
	if (dialogVfCode) {
		dialogVfCode.hide();
	}
}

function OpenVfCodeDialog(options) {
	if (!dialogVfCode) {
		var input = null,
			getCode = null;

		var dialogOptions = {
			dialogClass: 'dialog-vfcode',
			btn: true,
			body: true,
			onRender: function() {
				var pl = i18n.t('d_code_pl');

				this.body.innerHTML = '<div class="mui-input-row input-row">' +
					'	<input type="text" class="mui-input-clear" placeholder="' + pl + '"/>' +
					'</div>' +
					'<button type="button" class="mui-btn mui-btn-block mui-btn-blue mui-btn-outlined btn-get-code">' + i18n.t(
						'd_code_btn') +
					'</button>';
				input = this.body.querySelector('input');
				getCode = this.body.querySelector('.mui-btn-outlined');

				getCode.addEventListener('tap', function() {
					app.ajax({
						path: '/app!generateValidCode.action',
						data: {
							'vtype': options.vtype
						},
						success: function(eResult) {
							mui.toast(eResult.message);
							getCode.timeId = CountDown(getCode, 60);
						}
					});
				});

				this.btn.addEventListener('tap', function(e) {
					var value = input.value;
					if (!value) {
						mui.toast(pl);
						return;
					}
					if (dialogVfCode.callback) {
						dialogVfCode.callback(value);
					}
				});
			},
			beforeShow: function() {
				this.input.value = '';
			},
			onShow: function() {
				if (this.getCode.timeId) {
					clearInterval(this.getCode.timeId);
					ResetCountDown(this.getCode);
				}
				this.getCode.textContent = i18n.t('d_code_btn');
				this.input.removeAttribute('readonly');
				this.input.focus();
				this.input.click();
				//mui.trigger(this.getCode, 'tap');
			},
			beforeHide: function() {
				this.input.setAttribute('readonly', 'readonly');
				this.input.blur();
			}
		};
		dialogVfCode = new DialogBox(dialogOptions);
		dialogVfCode.getCode = getCode;
		dialogVfCode.input = input;
	}
	dialogVfCode.callback = options.callback;
	dialogVfCode.setTitle(options.title || i18n.t('d_code_title'));
	dialogVfCode.setBtnText(options.btn || i18n.confirm());
	dialogVfCode.input.setAttribute('placeholder', i18n.t('d_code_pl'));
	dialogVfCode.show();
}

/**
 *修改用户昵称
 */
var dialogUserName = null;

function OpenUserNameDialog(options) {
	if (!dialogUserName) {
		var input = null;

		var dialogOptions = {
			dialogClass: 'dialog-transfer',
			btn: true,
			body: true,
			onRender: function() {
				this.body.innerHTML = '<div class="mui-input-row input-row">' +
					'	<input type="text" class="mui-input-clear" placeholder="请输入用户昵称"/>' +
					'</div>';
				input = this.body.querySelector('input');
				this.btn.addEventListener('tap', function(e) {
					var value = input.value;
					if (!value) {
						mui.toast(i18n.t('d_username_pl'));
						return;
					}

					if (!isUserName(value)) {
						mui.toast(i18n.t('d_username_err'));
						return;
					}

					app.ajax({
						path: '/app!changeUserNameByLoginName.action',
						data: {
							'userName': value
						},
						success: function(e) {
							dialogUserName.hide();
							if (dialogUserName.callback) {
								dialogUserName.callback(value);
							}

							mui.toast(e.message);
							app.fireView('mine', 'updateData');
							app.changeUserInfo({
								userName: value
							});
						}
					});
				});
			},
			beforeShow: function() {},
			onShow: function() {
				this.input.removeAttribute('readonly');
				this.input.focus();
				this.input.click();
			},
			beforeHide: function() {
				this.input.setAttribute('readonly', 'readonly');
				this.input.blur();
			}
		};
		dialogUserName = new DialogBox(dialogOptions);
		dialogUserName.input = input;
	}
	dialogUserName.input.value = app.getUserName();
	dialogUserName.callback = options.callback;
	dialogUserName.setTitle(options.title || i18n.t('d_username_title'));
	dialogUserName.input.setAttribute('placeholder', i18n.t('d_username_pl'));
	dialogUserName.setBtnText(i18n.confirm());
	dialogUserName.show();
}
