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
                templateUrl: '/App/Views/templates/Courses/index.html',
                controller: 'CoursesController'
            })
            .when('/Messages',
            {
                templateUrl: '/App/Views/templates/Messages/index.html',
                controller: 'MessagesController'
            })
            .when('/Messages/Read/:id',
            {
                templateUrl: '/App/Views/templates/Messages/read.html',
                controller: 'MessagesReadController'
            })
            .when('/Messages/Write',
            {
                templateUrl: '/App/Views/templates/Messages/write.html',
                controller: 'MessagesWriteController'
            })
            .when('/Messages/Reply/:id',
            {
                templateUrl: '/App/Views/templates/Messages/reply.html',
                controller: 'MessagesReplyController'
            })
            .when('/Messages/History/:id',
            {
                templateUrl: '/App/Views/templates/Messages/history.html',
                controller: 'MessagesHistoryController'
            })
            .when('/News',
            {
                templateUrl: '/App/Views/templates/News/index.html',
                controller: 'NewsController'
            })
            .when('/News/Details/:id',
            {
                templateUrl: '/App/Views/templates/News/details.html',
                controller: 'NewsDetailsController'
            })
            .otherwise({
                templateUrl: '/App/Views/redirectError.html',
                controller: 'ErrorController'
            });
    });
