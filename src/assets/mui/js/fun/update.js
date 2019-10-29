i18n.res({
	en: {
		updateNo: 'No update yet',
		updateDling: 'Downloading...',
		updateDlfail: 'Download update file failed',
		updateVersion: 'Version：',
		updateUpdate: 'Update：',
		updateNew: 'App Update!',
		updateNow: 'Update right now',
		updateDl: 'Download：',
		updateFail: 'Failed to install new version',
		updateInstall: 'updateInstall...'
	},
	zh: {
		updateNo: '暂无更新版本',
		updateDling: '下载更新...',
		updateDlfail: '下载更新文件失败',
		updateVersion: '版本：',
		updateUpdate: '更新：',
		updateNew: '发现新版本!',
		updateNow: '立即更新',
		updateDl: '已下载：',
		updateFail: '安装新版本失败',
		updateInstall: '安装中...'
	}
});


function checkUpdate(wait, show) {
	plus.runtime.getProperty(plus.runtime.appid, function(inf) {
		var os = mui.os.android ? 'Android' : 'iOS';
		app.ajax({
			wait: false,
			close: false,
			login: false,
			path: "/app!versionUpdate.action?os=" + os,
			success: function(eResult) {
				var data = eResult.data;
				//{"significance":1,"downurl":"http://www.magiczj.com/download/tb1.2.1.wgt","updateInfo":"","version":"1.2.1"}
				if (needUpdate(inf.version, data.version)) {
					var updateInfo = i18n.t('updateVersion') + data.version + '\n' +
						i18n.t('updateUpdate') + '：' + data.updateInfo;
					mui.alert(updateInfo, i18n.t('updateNew'), i18n.t('updateNow'), function(e) {
						downWgt(data.downurl);
					});
				} else {
					if (show) {
						mui.alert(i18n.t('updateNo'), i18n.t('tip'), i18n.confirm());
					}
				}
			},
			error: function(msg) {
				return true;
			}
		});
	});
}

function needUpdate(currentVersion, serverVersion) {
	if (!serverVersion) return false;

	var cVersions = currentVersion.split('.');
	var sVersions = serverVersion.split('.');

	for (var i = 0; i < sVersions.length; i++) {
		var cNum = parseInt(cVersions[i]);
		var sNum = parseInt(sVersions[i]);
		if (sNum > cNum) {
			return true;
		} else if (cNum > sNum) {
			return false;
		}
	}
	return false;
}

//下载资源包
function downWgt(url) {
	var downloadedPersent = 0;
	var waitView = plus.nativeUI.showWaiting(i18n.t('updateDling'));

	url = ImgPath(url);

	var dtask = plus.downloader.createDownload(url, {}, function(d, status) {
		plus.nativeUI.closeWaiting();
		if (status == 200) {
			console.log("下载wgt成功：" + d.filename);
			installWgt(d.filename);
		} else {
			mui.alert(i18n.t('updateDlfail'), i18n.t('tip'), i18n.confirm());
		}
	});

	var currentProgress = -1;
	dtask.addEventListener('statechanged', function(d, status) {
		if (d.state == 3 && waitView) {
			var progress = parseInt(parseFloat(d.downloadedSize / d.totalSize) * 100);
			if (currentProgress != progress) {
				currentProgress = progress;
				waitView.setTitle(i18n.t('updateDl') + progress + '%');
			}
		}
	}, false);

	dtask.start();
};

//安装资源包
function installWgt(path) {
	plus.nativeUI.showWaiting(i18n.t('updateInstall'));
	plus.runtime.install(path, {}, function() {
		plus.nativeUI.closeWaiting();
		console.log("安装新版本成功！");
		plus.runtime.restart();
	}, function(e) {
		plus.nativeUI.closeWaiting();
		console.log("安装新版本失败[" + e.code + "]：" + e.message);
		mui.alert(i18n.t('updateFail') + "[" + e.code + "]：" + e.message, i18n.t('tip'), i18n.confirm());
	});
}
