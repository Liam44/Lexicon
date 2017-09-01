// ===================================================
// Angular Factory to create service to peform CRUD
// ===================================================
angular.module('links')
       .factory('LinksService', ['$http', 'tokenService', function ($http, tokenService) {
           var thisLinkService = {};

           // get single record from database
           thisLinkService.GetSingle = function (id) {
               var promise = $http({
                   method: 'GET',
                   url: '/api/Links/GetLink/' + id,
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
           thisLinkService.Add = function (name, href, coursePartId, assignmentId) {
               var link = {
                   Name: name,
                   HttpLink: href,
                   CoursePartID: coursePartId,
                   AssignmentID: assignmentId
               };

               var promise = $http({
                   method: 'POST',
                   url: '/api/Links/PostLink',
                   data: link,
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

           // put the data from database
           thisLinkService.Edit = function (id, name, href) {
               var link = {
                   ID: id,
                   Name: name,
                   HttpLink: href
               };

               var promise = $http({
                   method: 'PUT',
                   url: '/api/Links/PutLink/' + id,
                   data: link,
                   headers: tokenService.GetToken()
               })
                   .then(function (response) {
                       return 'Link updated!';
                       // return response.statusText + ' ' + response.status + ' ' + response.data;
                   },
                   function (response) {
                       return ExtractErrorMessage(response.data.ModelState);
                   });

               return promise;
           };

           // delete the data from database
           thisLinkService.Delete = function (id) {
               var promise = $http({
                   method: 'DELETE',
                   url: '/api/Links/DeleteLink/' + id,
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

           return thisLinkService;
       }]);
