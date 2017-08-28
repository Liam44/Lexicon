﻿// =====================================
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
            .when('/Templates/Delete/:id',
            {
                templateUrl: '../templates/Templates/delete.html',
                controller: 'TemplatesDetailsController'
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
            .when('/News/Delete/:id',
            {
                templateUrl: '../templates/News/delete.html',
                controller: 'NewsDetailsController'
            })
            .when('/Students',
            {
                templateUrl: '../templates/Users/index.html',
                controller: 'StudentsController'
            })
            .when('/Students/Register',
            {
                templateUrl: '../templates/Users/register.html',
                controller: 'StudentsRegisterController'
            })
            .when('/Students/Details/:id',
            {
                templateUrl: '../templates/Users/details.html',
                controller: 'StudentsDetailsController'
            })
            .when('/Students/Edit/:id',
            {
                templateUrl: '../templates/Users/edit.html',
                controller: 'StudentsEditController'
            })
            .when('/Students/Delete/:id',
            {
                templateUrl: '../templates/Users/delete.html',
                controller: 'StudentsDetailsController'
            })
            .otherwise({
                templateUrl: 'redirectError.html',
                controller: 'ErrorController'
            });
    });