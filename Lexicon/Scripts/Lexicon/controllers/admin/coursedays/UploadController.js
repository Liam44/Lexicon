// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// CourseDays - Details - CourseDays controller
angular.module('admin')
       .controller('CourseDaysUploadController', ['$scope', '$routeParams', '$rootScope', 'DocumentsService', 'Upload', 'tokenService', 'redirectService',
           function ($scope, $routeParams, $rootScope, DocumentsService, Upload, tokenService, redirectService) {
               //Variables
               $scope.Title = 'Uploading documents';
               $scope.documents = [];
               $scope.files = [];
               $scope.classes = [];
               $scope.documentClass = undefined;

               $scope.CourseDayID = $routeParams.id;

               //Functions
               function activate() {
                   $rootScope.loading = true;
                   $scope.files = [];
                   DocumentsService.getDocumentClasses()
                       .then(function (data) {
                           $scope.classes = data.data;
                           DocumentsService.getAll()
                             .then(function (data) {
                                 $scope.documents = data.data.Documents;
                                 $rootScope.loading = false;
                             },
                             function (err) {
                                 console.log("Error status: " + err.status);
                                 $rootScope.loading = false;
                             });
                       },
                       function (err) {
                           console.log("Error status: " + err.status);
                           $rootScope.loading = false;
                       });
               }

               function uploadFiles(files) {
                   if (files.length) {
                       if ($scope.documentClass === undefined) {
                           alert('A document class must be selected!');
                           document.getElementById('documentClass').focus();
                           return;
                       }

                       $rootScope.loading = true;
                       Upload.upload({
                           url: '/api/Documents/Upload/',
                           headers: tokenService.GetToken(),
                           data: {
                               file: files,
                               CourseDayID: $routeParams.id,
                               DocumentClass: $scope.documentClass
                           }
                       })
                         .then(function (response) {
                             redirectService.To('CourseDays', $scope.CourseDayID);
                         }, function (err) {
                             console.log("Error status: " + err.status);
                             $rootScope.loading = false;
                         });
                   }
               }

               //Set scope 
               activate();
               $scope.uploadFiles = uploadFiles;
           }]);
