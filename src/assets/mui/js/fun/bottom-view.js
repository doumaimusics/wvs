function openBottomWindow(options) {
	var id = GetIdByUrl(options.url);
	var view = plus.webview.getWebviewById(id);
	if (!view) {
		var windowOptions = {
			width: '100%',
			height: '100%',
			bottom: 0,
			background: 'transparent',
			scrollIndicator: 'none',
			scalable: false,
			popGesture: 'none',
			softinputMode: 'adjustResize'
		};
		view = plus.webview.create(options.url, id, windowOptions, options.extras);
	} else {
		mui.fire(view, 'updateData', options.extras);
	}
	view.show('slide-in-bottom');
};
