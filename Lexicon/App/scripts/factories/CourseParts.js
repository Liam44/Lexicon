// ===================================================
// Angular Factory to create service to peform CRUD
// ===================================================
angular.module('courseparts')
       .factory('CoursePartsService', ['$http', 'tokenService', function ($http, tokenService) {
           var thisCoursePartService = {};

           // get a specific course part
           thisCoursePartService.GetSingle = function (id) {
               var promise = $http({
                   method: 'GET',
                   url: '/api/CourseParts/GetCoursePart/' + id,
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

           // put the data from database
           thisCoursePartService.Edit = function (id, codeAlong_Lectures) {
               var coursePart = {
                   ID: id,
                   CodeAlong_Lecture: codeAlong_Lectures
               };

               var promise = $http({
                   method: 'PUT',
                   url: '/api/CourseParts/PutCoursePart/' + id,
                   data: coursePart,
                   headers: tokenService.GetToken()
               })
                   .then(function (response) {
                       return 'Course part updated!';
                       // return response.statusText + ' ' + response.status + ' ' + response.data;
                   },
                   function (response) {
                       return response.statusText + ' ' + response.status + ' ' + response.data;
                   });

               return promise;
           };

           thisCoursePartService.CreateTitle = function (cp) {
               var title = '';
               if (cp.CourseTemplateName !== undefined) {
                   title += ' - \'' + cp.CourseTemplateName;
               }
               else if (cp.CourseName !== undefined) {
                   title += ' - \'' + cp.CourseName;
               }

               title += '\' - ' + cp.CourseDayName + ' - ' + cp.PartDay;

               return title;
           };

           return thisCoursePartService;
       }]);
