// ===================================================
// Angular Factory to create service to peform CRUD
// ===================================================
angular.module('courses')
       .factory('CoursesService', ['$http', 'tokenService', function ($http, tokenService) {
           var thisCourseService = {};

           // get all course parts in a course day
           thisCourseService.GetCourses = function () {
               var promise = $http({
                   method: 'GET',
                   url: '/api/Courses/GetCourses',
                   headers: tokenService.GetToken()
               })
                   .then(function (response) {
                       return response.data;
                   },
                   function (response) {
                       return response.data;
                   });
               return promise;
           };

           // get single record from database
           thisCourseService.GetSingle = function (id) {
               var promise = $http({
                   method: 'GET',
                   url: '/api/Courses/GetCourse/' + id,
                   headers: tokenService.GetToken()
               })
                   .then(function (response) {
                       return response.data;
                   },
                   function (response) {
                       return response.data;
                   });
               return promise;
           };

           // post the data from database
           thisCourseService.Post = function (name, amountOfDays) {
               var courseCourse = {
                   Name: name,
                   AmountDays: amountOfDays
               };

               var promise = $http({
                   method: 'POST',
                   url: '/api/Courses/PostCourse',
                   data: courseCourse,
                   headers: tokenService.GetToken()
               })
               .then(function (response) {
                   return response.statusText;
               },
               function (response) {
                   return response.statusText;
               });

               return promise;
           };

           // post the data from database
           thisCourseService.Edit = function (id, name) {
               var courseCourse = {
                   ID: id,
                   Name: name
               };

               var promise = $http({
                   method: 'PUT',
                   url: '/api/Courses/PutCourse/' + id,
                   data: courseCourse,
                   headers: tokenService.GetToken()
               })
               .then(function (response) {
                   return response.statusText;
               },
               function (response) {
                   return response.statusText;
               });

               return promise;
           };

           // post the data from database
           thisCourseService.AddCourseDay = function (templateId) {
               var promise = $http({
                   method: 'POST',
                   url: '/api/Courses/AddCourseDay/' + templateId,
                   headers: tokenService.GetToken()
               })
               .then(function (response) {
                   return response.statusText;
               },
               function (response) {
                   return response.statusText;
               });

               return promise;
           };

           // post the data from database
           thisCourseService.DeleteCourseDay = function (templateId, courseDayId) {
               var model = {
                   CourseID: templateId,
                   CourseDayID: courseDayId
               };
               var promise = $http({
                   method: 'POST',
                   url: '/api/Courses/DeleteCourseDay',
                   data: model,
                   headers: tokenService.GetToken()
               })
               .then(function (response) {
                   return response.statusText;
               },
               function (response) {
                   return response.statusText;
               });

               return promise;
           };

           // delete the data from database
           thisCourseService.Delete = function (id) {
               var promise = $http({
                   method: 'DELETE',
                   url: '/api/Courses/DeleteCourse/' + id,
                   headers: tokenService.GetToken()
               })
               .then(function (response) {
                   // return "Deleted";
                   return response.statusText + ' ' + response.status + ' ' + response.data;
               },
               function (response) {
                   return response.statusText + ' ' + response.status + ' ' + response.data;
               });

               return promise;
           };

           return thisCourseService;
       }]);
