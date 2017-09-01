// =====================================
// configure the route navigation
// =====================================
angular.module('teacher')
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
            .when('/Templates',
            {
                templateUrl: '/App/Views/templates/Templates/index.html',
                controller: 'TemplatesController'
            })
            .when('/Templates/Create',
            {
                templateUrl: '/App/Views/templates/Templates/create.html',
                controller: 'TemplatesCreateController'
            })
            .when('/Templates/Details/:id',
            {
                templateUrl: '/App/Views/templates/Templates/details.html',
                controller: 'TemplatesDetailsController'
            })
            .when('/Templates/Edit/:id',
            {
                templateUrl: '/App/Views/templates/Templates/edit.html',
                controller: 'TemplatesEditController'
            })
            .when('/Courses',
            {
                templateUrl: '/App/Views/templates/Courses/index.html',
                controller: 'CoursesController'
            })
            .when('/Courses/Create',
            {
                templateUrl: '/App/Views/templates/Courses/create.html',
                controller: 'CoursesCreateController'
            })
            .when('/Courses/Details/:id',
            {
                templateUrl: '/App/Views/templates/Courses/details.html',
                controller: 'CoursesDetailsController'
            })
            .when('/Courses/Edit/:id',
            {
                templateUrl: '/App/Views/templates/Courses/edit.html',
                controller: 'CoursesEditController'
            })
            .when('/CourseDays/Details/:id',
            {
                templateUrl: '/App/Views/templates/CourseDays/details.html',
                controller: 'CourseDaysDetailsController'
            })
            .when('/CourseDays/Upload/:id',
            {
                templateUrl: '/App/Views/templates/Documents/upload.html',
                controller: 'CourseDaysUploadController'
            })
            .when('/AddAttendance',
            {
                templateUrl: '/App/Views/templates/Attendances/add.html',
                controller: 'AttendancesController'
            })
            .when('/ExportAttendances',
            {
                templateUrl: '/App/Viewstemplates/Attendances/export.html',
                controller: 'AttendancesCreateController'
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
            .when('/News/Create',
            {
                templateUrl: '/App/Views/templates/News/create.html',
                controller: 'NewsCreateController'
            })
            .when('/News/Details/:id',
            {
                templateUrl: '/App/Views/templates/News/details.html',
                controller: 'NewsDetailsController'
            })
            .when('/News/Edit/:id',
            {
                templateUrl: '/App/Views/templates/News/edit.html',
                controller: 'NewsEditController'
            })
            .when('/Students',
            {
                templateUrl: '/App/Views/templates/Users/index.html',
                controller: 'StudentsController'
            })
            .when('/Students/Register',
            {
                templateUrl: '/App/Views/templates/Users/register.html',
                controller: 'StudentsRegisterController'
            })
            .when('/Students/Details/:id',
            {
                templateUrl: '/App/Views/templates/Users/details.html',
                controller: 'StudentsDetailsController'
            })
            .when('/Students/Edit/:id',
            {
                templateUrl: '/App/Views/templates/Users/edit.html',
                controller: 'StudentsEditController'
            })
            .otherwise({
                templateUrl: '/App/Views/redirectError.html',
                controller: 'ErrorController'
            });
    });
