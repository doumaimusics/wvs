(function(w) {
	var immersed = 0;
	var ms = (/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
	if (ms && ms.length >= 3) {
		immersed = parseFloat(ms[2]);
	}
	w.immersed = immersed;
	if (!immersed) return;

	var header = document.querySelector('header');
	var paddingTop = 44 + immersed;
	if (header) {
		header.style.height = paddingTop + 'px';
		header.style.paddingTop = immersed + 'px';
	}
	var content = document.querySelector('.mui-content');
	if (content) {
		if (header) {
			content.style.paddingTop = paddingTop + 'px';
		} else {
			content.style.paddingTop = immersed + 'px';
		}
	}
})(window);
