'use strict';
define(['angularAMD', 'angular-route',  'common', 'serviceApp', 'directiveApp', 'jquery', 'cookie'], function(ngAMD) {

    var app = angular.module('myApp', ['ngRoute',  'directiveApp', 'serviceApp', 'common']);

    app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/login', ngAMD.route({
                    templateUrl: 'view/login.html',
                    controller: 'loginCtrl'
                }))
                .when('/register', ngAMD.route({
                    templateUrl: 'view/register.html',
                    controller: 'registerCtrl'
                }))
                .when('/desktop', ngAMD.route({
                    templateUrl: 'view/desktop.html',
                    controller: 'desktopCtrl'
                }))
                .otherwise({
                    redirectTo: '/login'
                });
        }
    ]);

    app.run(['$rootScope', '$location', '$http', '$utils',
        function(root, loc, http, utils) {
            root.screenshot = null;
            root.$on('$routeChangeStart', function(event, currRoute, prevRoute) {
                //event.preventDefault();
                //var user = utils.getStorage('user');
                //if (!user && loc.path() !== '/register') {
                //    loc.url('/login');
                //}
            });
        }
    ]);
    ngAMD.bootstrap(app);
    return app;
});