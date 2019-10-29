function createView(options) {
	return plus.webview.create("/pages/index/" + options.id + '.html', options.id, {
		top: 0,
		bottom: 49,
	});
}

function activeTab(pageId) {
	mui.each(document.querySelectorAll('.mui-tab-item'), function(i, n) {
		if (pageId == n.id) {
			if (!n.classList.contains('mui-active')) {
				n.classList.add('mui-active');
			}
			n.querySelector('img').src = 'imgs/tab-' + n.id + '-select.png';
		} else {
			n.classList.remove("mui-active");
			n.querySelector('img').src = 'imgs/tab-' + n.id + '.png';
		}
	});
}
