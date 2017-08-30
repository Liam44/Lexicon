// ===================================================
// Angular Factory to create service to peform CRUD
// ===================================================
angular.module('coursedays')
       .factory('CourseDaysService', ['$http', '$compile', 'tokenService', function ($http, $compile, tokenService) {
           var thisCourseDayService = {};

           // get all course parts in a course day
           thisCourseDayService.GetCourseDays = function (id) {
               var promise = $http({
                   method: 'GET',
                   url: '/api/CourseDays/GetCourseDays/' + id,
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
           thisCourseDayService.GetSingle = function (id) {
               var promise = $http({
                   method: 'GET',
                   url: '/api/CourseDays/GetCourseDay/' + id,
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

           // Moves the course day up in the schedule
           thisCourseDayService.MoveUp = function (id) {
               var promise = $http({
                   method: 'POST',
                   url: '/api/CourseDays/MoveUp/' + id,
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

           // Moves the course day down in the schedule
           thisCourseDayService.MoveDown = function (id) {
               var promise = $http({
                   method: 'POST',
                   url: '/api/CourseDays/MoveDown/' + id,
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

           return thisCourseDayService;
       }]);
