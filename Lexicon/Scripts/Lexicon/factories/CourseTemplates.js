// ===================================================
// Angular Factory to create service to peform CRUD
// ===================================================
angular.module('templates')
       .factory('TemplatesService', ['$http', 'tokenService', function ($http, tokenService) {
           var thisTemplateService = {};

           // get all course parts in a course day
           thisTemplateService.GetTemplates = function () {
               var promise = $http({
                   method: 'GET',
                   url: '/api/CourseTemplates/GetCourseTemplates',
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
           thisTemplateService.GetSingle = function (id) {
               var promise = $http({
                   method: 'GET',
                   url: '/api/CourseTemplates/GetCourseTemplate/' + id,
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
           thisTemplateService.Post = function (name, amountOfDays) {
               var courseTemplate = {
                   Name: name,
                   AmountDays: amountOfDays
               };

               var promise = $http({
                   method: 'POST',
                   url: '/api/CourseTemplates/PostCourseTemplate',
                   data: courseTemplate,
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
           thisTemplateService.Edit = function (id, name) {
               var courseTemplate = {
                   ID: id,
                   Name: name
               };

               var promise = $http({
                   method: 'PUT',
                   url: '/api/CourseTemplates/PutCourseTemplate/' + id,
                   data: courseTemplate,
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
           thisTemplateService.AddCourseDay = function (templateId) {
               var promise = $http({
                   method: 'POST',
                   url: '/api/CourseTemplates/AddCourseDay/' + templateId,
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
           thisTemplateService.DeleteCourseDay = function (templateId, courseDayId) {
               var model = {
                   CourseTemplateID: templateId,
                   CourseDayID: courseDayId
               };
               var promise = $http({
                   method: 'POST',
                   url: '/api/CourseTemplates/DeleteCourseDay',
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
           thisTemplateService.Delete = function (id) {
               var promise = $http({
                   method: 'DELETE',
                   url: '/api/CourseTemplates/DeleteCourseTemplate/' + id,
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

           return thisTemplateService;
       }]);
