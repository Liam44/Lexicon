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
            .when('/AddAttendance',
            {
                templateUrl: '/App/views/Attendances/add.html',
                controller: 'AttendancesController'
            })
            .when('/ChangePassword',
            {
                templateUrl: '/App/views/changepassword.html',
                controller: 'ChangePasswordController'
            })
            .when('/CourseDays/Details/:id',
            {
                templateUrl: '/App/views/CourseDays/details.html',
                controller: 'CourseDaysDetailsController'
            })
            .when('/CourseDays/Upload/:id',
            {
                templateUrl: '/App/views/Documents/upload.html',
                controller: 'CourseDaysUploadController'
            })
            .when('/CourseParts/Details/:id',
            {
                templateUrl: '/App/views/CourseParts/details.html',
                controller: 'CoursePartsDetailsController'
            })
            .when('/CourseParts/Edit/:id',
            {
                templateUrl: '/App/views/CourseParts/edit.html',
                controller: 'CoursePartsEditController'
            })
            .when('/CourseParts/Upload/:id',
            {
                templateUrl: '/App/views/Documents/upload.html',
                controller: 'CoursePartsUploadController'
            })
            .when('/CourseParts/AddLink/:id',
            {
                templateUrl: '/App/views/Links/add.html',
                controller: 'CoursePartsAddLinkController'
            })
            .when('/Courses',
            {
                templateUrl: '/App/views/Courses/index.html',
                controller: 'CoursesController'
            })
            .when('/Courses/Create',
            {
                templateUrl: '/App/views/Courses/create.html',
                controller: 'CoursesCreateController'
            })
            .when('/Courses/Details/:id',
            {
                templateUrl: '/App/views/Courses/details.html',
                controller: 'CoursesDetailsController'
            })
            .when('/Courses/Edit/:id',
            {
                templateUrl: '/App/views/Courses/edit.html',
                controller: 'CoursesEditController'
            })
            .when('/ExportAttendances',
            {
                templateUrl: '/App/views/Attendances/export.html',
                controller: 'AttendancesCreateController'
            })
            .when('/Links/Edit/:id',
            {
                templateUrl: '/App/views/Links/edit.html',
                controller: 'LinksEditController'
            })
            .when('/Messages',
            {
                templateUrl: '/App/views/Messages/index.html',
                controller: 'MessagesController'
            })
            .when('/Messages/Read/:id',
            {
                templateUrl: '/App/views/Messages/read.html',
                controller: 'MessagesReadController'
            })
            .when('/Messages/Write',
            {
                templateUrl: '/App/views/Messages/write.html',
                controller: 'MessagesWriteController'
            })
            .when('/Messages/Reply/:id',
            {
                templateUrl: '/App/views/Messages/reply.html',
                controller: 'MessagesReplyController'
            })
            .when('/Messages/History/:id',
            {
                templateUrl: '/App/views/Messages/history.html',
                controller: 'MessagesHistoryController'
            })
            .when('/News',
            {
                templateUrl: '/App/views/News/index.html',
                controller: 'NewsController'
            })
            .when('/News/Create',
            {
                templateUrl: '/App/views/News/create.html',
                controller: 'NewsCreateController'
            })
            .when('/News/Details/:id',
            {
                templateUrl: '/App/views/News/details.html',
                controller: 'NewsDetailsController'
            })
            .when('/News/Edit/:id',
            {
                templateUrl: '/App/views/News/edit.html',
                controller: 'NewsEditController'
            })
            .when('/Templates',
            {
                templateUrl: '/App/views/Templates/index.html',
                controller: 'TemplatesController'
            })
            .when('/Templates/Create',
            {
                templateUrl: '/App/views/Templates/create.html',
                controller: 'TemplatesCreateController'
            })
            .when('/Templates/Details/:id',
            {
                templateUrl: '/App/views/Templates/details.html',
                controller: 'TemplatesDetailsController'
            })
            .when('/Templates/Edit/:id',
            {
                templateUrl: '/App/views/Templates/edit.html',
                controller: 'TemplatesEditController'
            })
            .when('/Users',
            {
                templateUrl: '/App/views/Users/index.html',
                controller: 'UsersController'
            })
            .when('/Users/Register',
            {
                templateUrl: '/App/views/Users/register.html',
                controller: 'UsersRegisterController'
            })
            .when('/Users/Details/:id',
            {
                templateUrl: '/App/views/Users/details.html',
                controller: 'UsersDetailsController'
            })
            .when('/Users/Edit/:id',
            {
                templateUrl: '/App/views/Users/edit.html',
                controller: 'UsersEditController'
            })
            .otherwise({
                templateUrl: '/App/Views/redirectError.html',
                controller: 'ErrorController'
            });
    });
