// ===================================================
// Angular Factory to create service to peform CRUD
// ===================================================
angular.module('documents')
       .factory('DocumentsService', ['$http', '$q', 'tokenService', function ($http, $q, tokenService) {
           var thisDocumentService = {};

           //Get all photos saved on the server  
           thisDocumentService.getDocumentClasses = function () {
               var promise = $http({
                   method: 'GET',
                   url: '/api/Documents/GetDocumentClasses/',
                   headers: tokenService.GetToken()
               })
                   .then(function (response) {
                       return response;
                   },
                   function (response) {
                       return response;
                   });

               return promise;
           }

           //Get all photos saved on the server  
           thisDocumentService.getAll = function () {
               var promise = $http({
                   method: 'GET',
                   url: '/api/Documents/Get/',
                   headers: tokenService.GetToken()
               })
                   .then(function (response) {
                       return response;
                   },
                   function (response) {
                       return response;
                   });

               return promise;
           }

           //Get photo from server with given file name        
           thisDocumentService.getDocument = function (fileName) {
               var promise = $http({
                   method: 'GET',
                   url: '/api/Documents/Get/' + fileName,
                   headers: tokenService.GetToken()
               })
                   .then(function (response) {
                       return response;
                   },
                   function (response) {
                       return response;
                   });

               return promise;
           }

           // Delete photo on the server with given file name      
           thisDocumentService.deleteDocument = function (id) {
               var promise = $http({
                   method: 'DELETE',
                   url: '/api/Documents/Delete/',
                   headers: tokenService.GetToken(),
                   params: { id: id}
               })
                   .then(function (response) {
                       return response;
                   },
                   function (response) {
                       return response;
                   });

               return promise;
           }

           // get single record from database
           thisDocumentService.GetSingle = function (id) {
               var promise = $http({
                   method: 'GET',
                   url: '/api/Documents/GetDocument/' + id,
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

           // Uploads and attaches a document to a course part
           thisDocumentService.UploadCoursePart = function (coursePartId, name, documentclass) {
               var document = {
                   CoursePartID: coursePartId,
                   Name: name,
                   Class: documentclass
               };
               var promise = $http({
                   method: 'POST',
                   url: '/api/Documents/UploadCoursePart',
                   data: document,
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

           // Uploads and attaches a document to a course day
           thisDocumentService.UploadCourseDay = function (file, args) {
               var deferred = $q.defer();
               $upload.upload({
                   url: '/api/Documents/UploadCourseDay',
                   method: 'POST',
                   file: file,
                   headers: tokenService.GetToken(),
                   data: args
               }).progress(function (evt) {
                   // get upload percentage
                   console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
               }).success(function (data, status, headers, config) {
                   // file is uploaded successfully
                   deferred.resolve(data);
               }).error(function (data, status, headers, config) {
                   // file failed to upload
                   deferred.reject();
               });

               return deferred.promise;
           };

           // Uploads and attaches a document to a course
           thisDocumentService.UploadCourse = function (id) {
               var promise = $http({
                   method: 'POST',
                   url: '/api/Documents/UploadCourse/' + id,
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

           // Uploads and attaches a document to an assignment
           thisDocumentService.UploadAssignment = function (id) {
               var promise = $http({
                   method: 'POST',
                   url: '/api/Documents/UploadAssignment/' + id,
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

           // delete the data from database
           thisDocumentService.Delete = function (id) {
               var promise = $http({
                   method: 'DELETE',
                   url: '/api/Documents/DeleteDocument/' + id,
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

           return thisDocumentService;
       }]);
