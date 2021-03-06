﻿// =====================================
// configure the route navigation
// =====================================
angular.module('login')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/',
            {
                templateUrl: '/App/Views/Login/login.html',
                controller: 'LoginController'
            })
            .otherwise({
                templateUrl: '/App/Views/redirectError.html',
                controller: 'ErrorController'
            });
    });
