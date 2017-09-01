// ===================================================
// Angular Factory to create service to peform CRUD
// ===================================================
angular.module('news')
       .factory('NewsService', ['$http', 'tokenService', function ($http, tokenService) {
           var thisNewsService = {};

           // get all data from database
           thisNewsService.GetAll = function () {
               var promise = $http({
                   method: 'GET',
                   url: '/api/News/GetNews/',
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
           thisNewsService.GetSingle = function (id) {

               var promise = $http({
                   method: 'GET',
                   url: '/api/News/GetNews/' + id
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
           thisNewsService.Insert = function (firstName, lastName, age, active) {
               var personalDetail = {
                   FirstName: firstName,
                   LastName: lastName,
                   Age: age,
                   Active: active,
               };

               var promise = $http({
                   method: 'POST',
                   url: '/api/News/PostNews/',
                   data: personalDetail
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
           thisNewsService.Update = function (autoId, firstName, lastName, age, active) {
               var personalDetail = {
                   AutoId: autoId,
                   FirstName: firstName,
                   LastName: lastName,
                   Age: age,
                   Active: active,
               };

               var promise = $http({
                   method: 'PUT',
                   url: '/api/News/PutNews/' + autoId,
                   data: personalDetail
               })
               .then(function (response) {
                   return "Updated";
                   // return response.statusText + ' ' + response.status + ' ' + response.data;
               },
               function (response) {
                   return response.statusText + ' ' + response.status + ' ' + response.data;
               });

               return promise;
           };

           // delete the data from database
           thisNewsService.Remove = function (autoId) {
               var promise = $http({
                   method: 'DELETE',
                   url: '/api/News/DeleteNews/' + autoId
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

           return thisNewsService;
       }]);
