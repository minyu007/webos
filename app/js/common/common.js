'use strict';
define(['jquery'], function() {

	var common = angular.module('common', []);
	common.provider('$utils', [
		function() {
			this.$get = function() {
				return {
					setStorage: function(cname, cvalue, days) {
						if (typeof cvalue == 'object') {
							cvalue = JSON.stringify(cvalue);
						}
						$.cookie(cname, cvalue, days);
					},

					getStorage: function(cname) {
						var temp = $.cookie(cname);
						if (temp && temp.indexOf('{') !== -1 && temp.indexOf('}') !== -1) {
							temp = JSON.parse(temp);
						}
						return temp;
					},

					deleteStorage: function(cname, path) {
						$.removeCookie(cname, {
							path: path
						});
					}
				};
			};
		}
	]);
	return common;
});