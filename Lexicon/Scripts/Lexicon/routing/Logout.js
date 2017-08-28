// =====================================
// configure the route navigation
// =====================================
angular.module('logout')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/',
            {
                templateUrl: 'logout.html',
                controller: 'LogoutController'
            })
            .otherwise({
                templateUrl: 'redirectError.html',
                controller: 'ErrorController'
            });
    });
