'use strict';
define(['overlayDirective'], function( overlay) {
	var NAME_REGEXP = /^[\w]{1,20}$/;
	var directiveApp = angular.module('directiveApp', []);

	directiveApp.factory('httpInterceptor', function() {
		return {};
	});

	directiveApp.config(['$httpProvider',
		function($httpProvider) {
			$httpProvider.interceptors.push('httpInterceptor');
		}
	]);

	directiveApp
		.directive('overlay', ['$q', '$timeout', '$window', 'httpInterceptor', overlay])
		.directive('appVersion', ['version',
			function(version) {
				return function(scope, elm, attrs) {
					elm.text(version);
				};
			}
		]);
	return directiveApp;
});