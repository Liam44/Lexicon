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
                templateUrl: '../changepassword.html',
                controller: 'ChangePasswordController'
            })
            .when('/Templates',
            {
                templateUrl: '../templates/Templates/index.html',
                controller: 'TemplatesController'
            })
            .when('/Templates/Create',
            {
                templateUrl: '../templates/Templates/create.html',
                controller: 'TemplatesCreateController'
            })
            .when('/Templates/Details/:id',
            {
                templateUrl: '../templates/Templates/details.html',
                controller: 'TemplatesDetailsController'
            })
            .when('/Templates/Edit/:id',
            {
                templateUrl: '../templates/Templates/edit.html',
                controller: 'TemplatesEditController'
            })
            .when('/Courses',
            {
                templateUrl: '../templates/Courses/index.html',
                controller: 'CoursesController'
            })
            .when('/Courses/Create',
            {
                templateUrl: '../templates/Courses/create.html',
                controller: 'CoursesCreateController'
            })
            .when('/Courses/Details/:id',
            {
                templateUrl: '../templates/Courses/details.html',
                controller: 'CoursesDetailsController'
            })
            .when('/Courses/Edit/:id',
            {
                templateUrl: '../templates/Courses/edit.html',
                controller: 'CoursesEditController'
            })
            .when('/CourseDays/Details/:id',
            {
                templateUrl: '../templates/CourseDays/details.html',
                controller: 'CourseDaysDetailsController'
            })
            .when('/CourseDays/Upload/:id',
            {
                templateUrl: '../templates/Documents/upload.html',
                controller: 'CourseDaysUploadController'
            })
            .when('/AddAttendance',
            {
                templateUrl: '../templates/Attendances/add.html',
                controller: 'AttendancesController'
            })
            .when('/ExportAttendances',
            {
                templateUrl: '..templates/Attendances/export.html',
                controller: 'AttendancesCreateController'
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
            .when('/News/Create',
            {
                templateUrl: '../templates/News/create.html',
                controller: 'NewsCreateController'
            })
            .when('/News/Details/:id',
            {
                templateUrl: '../templates/News/details.html',
                controller: 'NewsDetailsController'
            })
            .when('/News/Edit/:id',
            {
                templateUrl: '../templates/News/edit.html',
                controller: 'NewsEditController'
            })
            .when('/Users',
            {
                templateUrl: '../templates/Users/index.html',
                controller: 'UsersController'
            })
            .when('/Users/Register',
            {
                templateUrl: '../templates/Users/register.html',
                controller: 'UsersRegisterController'
            })
            .when('/Users/Details/:id',
            {
                templateUrl: '../templates/Users/details.html',
                controller: 'UsersDetailsController'
            })
            .when('/Users/Edit/:id',
            {
                templateUrl: '../templates/Users/edit.html',
                controller: 'UsersEditController'
            })
            .otherwise({
                templateUrl: 'redirectError.html',
                controller: 'ErrorController'
            });
    });
