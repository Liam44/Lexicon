// =====================================
// configure the route navigation
// =====================================
angular.module('student')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/',
            {
                templateUrl: 'home.html',
                controller: 'NewsController'
            })
            .when('/ChangePassword',
            {
                templateUrl: '../changepassword.html',
                controller: 'ChangePasswordController'
            })
            .when('/Courses',
            {
                templateUrl: '../templates/Courses/index.html',
                controller: 'CoursesController'
            })
            .when('/Messages',
            {
                templateUrl: '../templates/Messages/index.html',
                controller: 'MessagesController'
            })
            .when('/Messages/Read/:id',
            {
                templateUrl: '../templates/Messages/read.html',
                controller: 'MessagesReadController'
            })
            .when('/Messages/Write',
            {
                templateUrl: '../templates/Messages/write.html',
                controller: 'MessagesWriteController'
            })
            .when('/Messages/Reply/:id',
            {
                templateUrl: '../templates/Messages/reply.html',
                controller: 'MessagesReplyController'
            })
            .when('/Messages/History/:id',
            {
                templateUrl: '../templates/Messages/history.html',
                controller: 'MessagesHistoryController'
            })
            .when('/News',
            {
                templateUrl: '../templates/News/index.html',
                controller: 'NewsController'
            })
            .when('/News/Details/:id',
            {
                templateUrl: '../templates/News/details.html',
                controller: 'NewsDetailsController'
            })
            .otherwise({
                templateUrl: 'redirectError.html',
                controller: 'ErrorController'
            });
    });
