'use strict';
require.config({

	paths: {
		angular: '../../bower_components/angular/angular',
		'angular-route': '../../bower_components/angular-route/angular-route',
		angularAMD: '../../bower_components/angularAMD/angularAMD',
		jquery: '../../bower_components/jquery/dist/jquery',

		//common
		cookie: 'common/cookie',
		common: 'common/common',

		//controller
		loginCtrl: 'controller/login',
		registerCtrl: 'controller/register',
		desktopCtrl: 'controller/desktop',

		//services
		serviceApp: 'service/serviceApp',
		userService: 'service/user',

		directiveApp: 'directive/directiveApp',
		overlayDirective: 'directive/overlay'
	},

	shim: {
		"angular": {
			exports: "angular"
		},
		angularAMD: [
			'angular'
		],

		'angular-route': [
			'angular'
		],

		directiveApp: [
			'angular'
		],
		
		serviceApp: [
			'angular'
		],

		common: [
			'angular'
		]
	},

	deps: [
		'app'
	]
});