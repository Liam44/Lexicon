// =====================================
// configure the route navigation
// =====================================
angular.module('admin')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/',
            {
                templateUrl: 'home.html',
                controller: 'NewsController'
            })
            .when('/ChangePassword',
            {
                templateUrl: '/App/views/changepassword.html',
                controller: 'ChangePasswordController'
            })
            .when('/Templates',
            {
                templateUrl: '/App/views/templates/Templates/index.html',
                controller: 'TemplatesController'
            })
            .when('/Templates/Create',
            {
                templateUrl: '/App/views/templates/Templates/create.html',
                controller: 'TemplatesCreateController'
            })
            .when('/Templates/Details/:id',
            {
                templateUrl: '/App/views/templates/Templates/details.html',
                controller: 'TemplatesDetailsController'
            })
            .when('/Templates/Edit/:id',
            {
                templateUrl: '/App/views/templates/Templates/edit.html',
                controller: 'TemplatesEditController'
            })
            .when('/Courses',
            {
                templateUrl: '/App/views/templates/Courses/index.html',
                controller: 'CoursesController'
            })
            .when('/Courses/Create',
            {
                templateUrl: '/App/views/templates/Courses/create.html',
                controller: 'CoursesCreateController'
            })
            .when('/Courses/Details/:id',
            {
                templateUrl: '/App/views/templates/Courses/details.html',
                controller: 'CoursesDetailsController'
            })
            .when('/Courses/Edit/:id',
            {
                templateUrl: '/App/views/templates/Courses/edit.html',
                controller: 'CoursesEditController'
            })
            .when('/CourseDays/Details/:id',
            {
                templateUrl: '/App/views/templates/CourseDays/details.html',
                controller: 'CourseDaysDetailsController'
            })
            .when('/CourseDays/Upload/:id',
            {
                templateUrl: '/App/views/templates/Documents/upload.html',
                controller: 'CourseDaysUploadController'
            })
            .when('/AddAttendance',
            {
                templateUrl: '/App/views/templates/Attendances/add.html',
                controller: 'AttendancesController'
            })
            .when('/ExportAttendances',
            {
                templateUrl: '/App/views/templates/Attendances/export.html',
                controller: 'AttendancesCreateController'
            })
            .when('/Messages',
            {
                templateUrl: '/App/views/templates/Messages/index.html',
                controller: 'MessagesController'
            })
            .when('/Messages/Read/:id',
            {
                templateUrl: '/App/views/templates/Messages/read.html',
                controller: 'MessagesReadController'
            })
            .when('/Messages/Write',
            {
                templateUrl: '/App/views/templates/Messages/write.html',
                controller: 'MessagesWriteController'
            })
            .when('/Messages/Reply/:id',
            {
                templateUrl: '/App/views/templates/Messages/reply.html',
                controller: 'MessagesReplyController'
            })
            .when('/Messages/History/:id',
            {
                templateUrl: '/App/views/templates/Messages/history.html',
                controller: 'MessagesHistoryController'
            })
            .when('/News',
            {
                templateUrl: '/App/views/templates/News/index.html',
                controller: 'NewsController'
            })
            .when('/News/Create',
            {
                templateUrl: '/App/views/templates/News/create.html',
                controller: 'NewsCreateController'
            })
            .when('/News/Details/:id',
            {
                templateUrl: '/App/views/templates/News/details.html',
                controller: 'NewsDetailsController'
            })
            .when('/News/Edit/:id',
            {
                templateUrl: '/App/views/templates/News/edit.html',
                controller: 'NewsEditController'
            })
            .when('/Users',
            {
                templateUrl: '/App/views/templates/Users/index.html',
                controller: 'UsersController'
            })
            .when('/Users/Register',
            {
                templateUrl: '/App/views/templates/Users/register.html',
                controller: 'UsersRegisterController'
            })
            .when('/Users/Details/:id',
            {
                templateUrl: '/App/views/templates/Users/details.html',
                controller: 'UsersDetailsController'
            })
            .when('/Users/Edit/:id',
            {
                templateUrl: '/App/views/templates/Users/edit.html',
                controller: 'UsersEditController'
            })
            .otherwise({
                templateUrl: 'App/Views/redirectError.html',
                controller: 'ErrorController'
            });
    });
