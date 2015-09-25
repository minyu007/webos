'use strict';
define(['userService'], function(userService) {

    var serviceApp = angular.module('serviceApp', []).value('version', '0.1');

    serviceApp.factory('$myAjax', ['$q', '$http', '$location', function($q, $http, $location) {
        var velocity = 120 * 60 * 1000, //30min
            queue = [];
        var handleErr = function(err) {
            switch (err.status) {
                case 0:
                    //showErr(0);
                    break;
                case 440:
                    if (confirm('session expired, please login!')) {
                        $location.url('/login');
                    }
                    break;
                case 401:

                    break;
                case 500:
                    break;
                default:
                    console.log();
            }
        };

        var execNext = function() {
            var task = queue[0];
            $http(task.c).then(function(res) {
                queue.shift();
                task.d.resolve(res.data);
                if (queue.length > 0) execNext();
            }, function(err) {
                queue.shift();
                handleErr(err);
                task.d.reject(err);
            });
        };
        return {
            getData: function(url, type) {
                var deferred = $q.defer();
                queue.push({
                    c: {
                        method: 'GET',
                        url: url,
                        timeout: 90 * 1000,
                        type: type
                    },
                    d: deferred
                });

                if (queue.length === 1) execNext();
                return deferred.promise;
            },

            postData: function(url, obj) {
                var deferred = $q.defer();
                $http.post(url, obj).then(function(res) {
                    deferred.resolve(res.data);
                }, function(err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            }
        };
    }]);

    serviceApp.factory('userService', ['$utils', userService]);

    return serviceApp;
});