'use strict';

define([], function() {
	var httpHandlingDirective = function($q, $timeout, $window, httpInterceptor) {
		return {
			restrict: 'EA',

			scope: {
				overlayDelay: "@"
			},

			template: '<div id="overlay-container" class="overlayContainer">' +
				'<div id="overlay-background" class="overlayBackground"></div>' +
				'<div id="overlay-content" class="overlayContent">' +
				'<div class="loading">waiting</div>' +
				'</div>' +
				'</div>',

			link: function(scope, element, attrs) {
				var overlayContainer = null,
					timerPromise = null,
					timerPromiseHide = null,
					autoClose = null,
					inSession = false,
					queue = [];

				init();

				function init() {
					wireUpHttpInterceptor();
					overlayContainer = document.getElementById('overlay-container');
				};

				function wireUpHttpInterceptor() {

					httpInterceptor.request = function(config) {
						if (!config.type || config.type !== 'noOverlay') {
							processRequest();
						}
						return config || $q.when(config);
					};

					httpInterceptor.response = function(response) {

						processResponse();
						return response || $q.when(response);
					};

					httpInterceptor.responseError = function(rejection) {

						processResponse();
						return $q.reject(rejection);
					};
				};

				function wirejQueryInterceptor() {
					var d = $(document);
					d.ajaxStart(function() {
						processRequest();
					});

					d.ajaxComplete(function() {
						processResponse();
					});

					d.ajaxError(function() {
						processResponse();
					});
				};

				function processRequest() {
					queue.push({});
					if (queue.length === 1) {
						timerPromise = $timeout(function() {
							if (queue.length) showOverlay();
						}, 250); //Delay showing for 500 millis to avoid flicker
					}
				};

				function processResponse() {
					queue.pop();
					if (queue.length == 0) {
						timerPromiseHide = $timeout(function() {
							if (queue.length === 0) {
								hideOverlay();
								if (timerPromiseHide) $timeout.cancel(timerPromiseHide);
							}
						}, 250);
					}
				};

				function showOverlay() {
					var w = 0,
						h = 0,
						dde = document.documentElement,
						db = document.body;
					if (!$window.innerWidth) {
						if (!(dde.clientWidth === 0)) {
							w = dde.clientWidth;
							h = dde.clientHeight;
						} else {
							w = db.clientWidth;
							h = db.clientHeight;
						}
					} else {
						w = $window.innerWidth;
						h = $window.innerHeight;
					}
					var content = document.getElementById('overlay-content'),
						contentWidth = parseInt(getComputedStyle(content, 'width').replace('px', '')),
						contentHeight = parseInt(getComputedStyle(content, 'height').replace('px', ''));

					content.style.top = h / 2 - contentHeight / 2 + 'px';
					content.style.left = w / 2 - contentWidth / 2 + 'px'

					overlayContainer.style.display = 'block';
				};

				function hideOverlay() {
					if (timerPromise) $timeout.cancel(timerPromise);
					overlayContainer.style.display = 'none';
				};

				var getComputedStyle = function() {
					var func = null;
					if (document.defaultView && document.defaultView.getComputedStyle) {
						func = document.defaultView.getComputedStyle;
					} else if (typeof(document.body.currentStyle) !== "undefined") {
						func = function(element, anything) {
							return element["currentStyle"];
						};
					}

					return function(element, style) {
						return func(element, null)[style];
					}
				}();
			}
		}
	};

	return httpHandlingDirective;
});