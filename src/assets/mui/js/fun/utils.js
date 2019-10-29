function isLoginName(name) {
	return /^(?![0-9]+$)[0-9A-Za-z]{3,12}$/.test(name);
}

function isUserName(name) {
	return /^[\u4e00-\u9fa5A-Za-z0-9]*$/.test(name);
}

/**
 * 空视图
 */
function emptyView() {
	var text = i18n.t("ms_emptytip");
	return '<div class="e-view e-view-empty">' +
		'	<img class="e-icon" src="../../imgs/mescroll-empty.png">' +
		'	<p class="e-tip">' + text + '</p>' +
		'</div>';
}

/**
 * 错误视图
 */
function errorView(errorMsg, loadAgain) {
	if (loadAgain == undefined) loadAgain = true;

	var text = i18n.t('loading_again');

	return '<div class="e-view e-view-error">' +
		'	<img class="e-icon" src="../../imgs/e-error.png">' +
		'	<p class="e-tip">' + errorMsg + '~</p>' +
		(loadAgain ? '<a class="e-btn">' + text + '</a>' : '') +
		'</div>';
}

/**
 * 加载视图
 */
function loadingView() {
	var loading = i18n.t("ms_textLoading");
	return '<div class="e-view e-view-loading">' +
		'	<div class="mui-loading"><span class="mui-spinner"></span></div>' +
		'	<p class="e-tip">' + loading + '</p>' +
		'</div>';
}

function addErrorViewTap(callback) {
	mui('body').on('tap', '.e-view-error', callback);
}

/**
 * 初始化下拉刷新
 */
function initMescrollRefresh(options) {
	options = mui.extend({
		auto: true,
	}, options);
	var mescroll = new MeScroll(options.mescrollId, {
		down: {
			auto: options.auto,
			callback: options.callback,
			textInOffset: i18n.t('ms_textInOffset'),
			textOutOffset: i18n.t('ms_textOutOffset'),
			textLoading: i18n.t('ms_textLoading'),
		},
		up: {
			use: false,
			isBounce: false,
		}
	});
	return mescroll;
}
