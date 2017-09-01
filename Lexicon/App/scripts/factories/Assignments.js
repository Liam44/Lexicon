// ===================================================
// Angular Factory to create service to peform CRUD
// ===================================================
angular.module('assignments')
       .factory('AssignmentsService', ['$http', 'tokenService', function ($http, tokenService) {
           var thisAssignmentService = {};

           // get a specific assignment from the database
           thisAssignmentService.GetSingle = function (id) {
               var promise = $http({
                   method: 'GET',
                   url: '/api/Assignments/GetAssignment/' + id,
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
           thisAssignmentService.Add = function (theme, deadline, status) {
               var assignment = {
                   Theme: name,
                   Deadline: deadline,
                   Status: status
               };

               var promise = $http({
                   method: 'POST',
                   url: '/api/Assignments/PostAssignment',
                   data: assignment,
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
           thisAssignmentService.Edit = function (id, theme, deadline, status) {
               var assignment = {
                   ID: id,
                   Theme: theme,
                   Deadline: deadline,
                   Status: status
               };

               var promise = $http({
                   method: 'PUT',
                   url: '/api/Assignments/PutAssignment/' + id,
                   data: assignment,
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
           thisAssignmentService.Delete = function (id) {
               var promise = $http({
                   method: 'DELETE',
                   url: '/api/Assignments/DeleteAssignment/' + id,
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
           return thisAssignmentService;
       }]);
