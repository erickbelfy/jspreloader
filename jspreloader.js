define(['jquery', 'exports'], function ($, exports) {
	'use strict';
	var Preloader = function (_images, _callback) {
		this.callback = _callback;
		this.currentImage = 0;
		this.currentImagePath = '';
		this.thumbs = _images;
	};

	Preloader.prototype.setImage = function (src) {
		var scope = this;
		var image = new Image();
		image.onload = function () {
			scope.onLoadedImage();
		};
		this.currentImagePath = src;
		image.src = window.MEDIA_URL + this.currentImagePath;
	};

	Preloader.prototype.getPercent = function () {
		this.currentImage++;
		return  Math.round(100 * (this.currentImage / this.thumbs.length));
	};

	Preloader.prototype.onLoadedImage = function () {
		var currentPercent = this.getPercent();
		if (currentPercent === 100) {
			this.callback();
		} else {
			this.imageLoad();
		}
	};

	Preloader.prototype.imageLoad = function () {
		this.setImage(this.thumbs[this.currentImage].thumb);
	};

	Preloader.prototype.init = function () {
		this.imageLoad();
	};

	exports.Preloader = Preloader;
});
