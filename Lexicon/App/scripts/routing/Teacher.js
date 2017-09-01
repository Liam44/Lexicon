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
            .when('/AddAttendance',
            {
                templateUrl: '/App/Views/Attendances/add.html',
                controller: 'AttendancesController'
            })
            .when('/ChangePassword',
            {
                templateUrl: '/App/Views/changepassword.html',
                controller: 'ChangePasswordController'
            })
            .when('/CourseDays/Details/:id',
            {
                templateUrl: '/App/Views/CourseDays/details.html',
                controller: 'CourseDaysDetailsController'
            })
            .when('/CourseDays/Upload/:id',
            {
                templateUrl: '/App/Views/Documents/upload.html',
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
                templateUrl: '/App/Views/Courses/index.html',
                controller: 'CoursesController'
            })
            .when('/Courses/Create',
            {
                templateUrl: '/App/Views/Courses/create.html',
                controller: 'CoursesCreateController'
            })
            .when('/Courses/Details/:id',
            {
                templateUrl: '/App/Views/Courses/details.html',
                controller: 'CoursesDetailsController'
            })
            .when('/Courses/Edit/:id',
            {
                templateUrl: '/App/Views/Courses/edit.html',
                controller: 'CoursesEditController'
            })
            .when('/ExportAttendances',
            {
                templateUrl: '/App/ViewsAttendances/export.html',
                controller: 'AttendancesCreateController'
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
            .when('/News/Create',
            {
                templateUrl: '/App/Views/News/create.html',
                controller: 'NewsCreateController'
            })
            .when('/News/Details/:id',
            {
                templateUrl: '/App/Views/News/details.html',
                controller: 'NewsDetailsController'
            })
            .when('/News/Edit/:id',
            {
                templateUrl: '/App/Views/News/edit.html',
                controller: 'NewsEditController'
            })
            .when('/Students',
            {
                templateUrl: '/App/Views/Users/index.html',
                controller: 'StudentsController'
            })
            .when('/Students/Register',
            {
                templateUrl: '/App/Views/Users/register.html',
                controller: 'StudentsRegisterController'
            })
            .when('/Students/Details/:id',
            {
                templateUrl: '/App/Views/Users/details.html',
                controller: 'StudentsDetailsController'
            })
            .when('/Students/Edit/:id',
            {
                templateUrl: '/App/Views/Users/edit.html',
                controller: 'StudentsEditController'
            })
            .when('/Templates',
            {
                templateUrl: '/App/Views/Templates/index.html',
                controller: 'TemplatesController'
            })
            .when('/Templates/Create',
            {
                templateUrl: '/App/Views/Templates/create.html',
                controller: 'TemplatesCreateController'
            })
            .when('/Templates/Details/:id',
            {
                templateUrl: '/App/Views/Templates/details.html',
                controller: 'TemplatesDetailsController'
            })
            .when('/Templates/Edit/:id',
            {
                templateUrl: '/App/Views/Templates/edit.html',
                controller: 'TemplatesEditController'
            })
            .otherwise({
                templateUrl: '/App/Views/redirectError.html',
                controller: 'ErrorController'
            });
    });
