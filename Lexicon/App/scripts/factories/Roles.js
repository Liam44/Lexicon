// ===================================================
// Angular Factory to create service to peform CRUD
// ===================================================
angular.module('roles')
       .factory('RolesService', function ($http) {
           var thisRoleService = {};

           // get all data from database
           thisRoleService.GetAll = function () {
               var promise = $http({
                   method: 'GET',
                   url: '/api/Roles/GetRoles'
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
           thisRoleService.GetSingle = function (id) {
               var promise = $http({
                   method: 'GET',
                   url: '/api/Roles/' + id
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
           thisRoleService.Create = function (name) {
               var user = {
                   Name: name
               };

               var promise = $http({
                   method: 'POST',
                   url: '/api/Roles',
                   data: user
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
           thisRoleService.Update = function (roleId, name) {
               var user = {
                   Id: roleId,
                   Name: name
               };

               var promise = $http({
                   method: 'PUT',
                   url: '/api/Roles/' + roleId,
                   data: user
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
           thisRoleService.Remove = function (roleId) {
               var promise = $http({
                   method: 'DELETE',
                   url: '/api/Roles/' + roleId
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

           return thisRoleService;
       });
