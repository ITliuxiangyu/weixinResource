angular.module('myApp', ['ngRoute', 'ngAnimate', 'myApp.home', 'myApp.packet', 'myApp.qhb'])
        .config(['$routeProvider', function ($routeProvider) {

            $routeProvider.when('/home', {
                templateUrl: "home.html",
                controller: 'HomeController'
            });

            // $routeProvider.when('/red', {
            //     templateUrl: "redPacket.html",
            //     controller: "PacketController"
            // });

            $routeProvider.when('/red', {
                templateUrl: "qianghongbao.html",
                controller: "QHBController"
            });

            $routeProvider.when('/notStart', {
                templateUrl: "activityNotStart.html",
            });

            $routeProvider.when('/over', {
                templateUrl: "over.html"
            });

            $routeProvider.otherwise('/home');


        }]);
