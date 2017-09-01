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
                templateUrl: '/App/Views/changepassword.html',
                controller: 'ChangePasswordController'
            })
            .when('/Courses',
            {
                templateUrl: '/App/Views/Courses/index.html',
                controller: 'CoursesController'
            })
            .when('/Messages',
            {
                templateUrl: '/App/Views/Messages/index.html',
                controller: 'MessagesController'
            })
            .when('/Messages/Read/:id',
            {
                templateUrl: '/App/Views/Messages/read.html',
                controller: 'MessagesReadController'
            })
            .when('/Messages/Write',
            {
                templateUrl: '/App/Views/Messages/write.html',
                controller: 'MessagesWriteController'
            })
            .when('/Messages/Reply/:id',
            {
                templateUrl: '/App/Views/Messages/reply.html',
                controller: 'MessagesReplyController'
            })
            .when('/Messages/History/:id',
            {
                templateUrl: '/App/Views/Messages/history.html',
                controller: 'MessagesHistoryController'
            })
            .when('/News',
            {
                templateUrl: '/App/Views/News/index.html',
                controller: 'NewsController'
            })
            .when('/News/Details/:id',
            {
                templateUrl: '/App/Views/News/details.html',
                controller: 'NewsDetailsController'
            })
            .otherwise({
                templateUrl: '/App/Views/redirectError.html',
                controller: 'ErrorController'
            });
    });
