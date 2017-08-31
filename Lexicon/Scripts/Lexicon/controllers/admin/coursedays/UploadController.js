// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// CourseDays - Details - CourseDays controller
angular.module('admin')
       .controller('CourseDaysUploadController', ['$scope', '$window', '$routeParams', 'DocumentsService', 'Upload', 'tokenService',
           function ($scope, $window, $routeParams, DocumentsService, Upload, tokenService) {
               //Variables
               $scope.photos = [];
               $scope.files = [];
               $scope.previewPhoto = {};
               $scope.spinner = {
                   active: true
               };

               //Functions
               function setPreviewPhoto(photo) {
                   $scope.previewPhoto = photo;
               }

               function activate() {
                   $scope.spinner.active = true;
                   DocumentsService.getAll()
                     .then(function (data) {
                         $scope.photos = data.data.Photos;
                         $scope.spinner.active = false;
                         setPreviewPhoto();
                     }, function (err) {
                         console.log("Error status: " + err.status);
                         $scope.spinner.active = false;
                     });
               }

               function uploadFiles(files) {
                   if (files.length) {
                       $scope.spinner.active = true;
                       Upload.upload({
                           url: '/api/Documents/Add/',
                           headers: tokenService.GetToken(),
                           data: {
                               file: files,
                               CourseDayID: $routeParams.id
                           }
                       })
                         .then(function (response) {
                             activate();
                             setPreviewPhoto();
                             $scope.spinner.active = false;
                         }, function (err) {
                             console.log("Error status: " + err.status);
                             $scope.spinner.active = false;
                         });
                   }
               }

               function removePhoto(photo) {
                   DocumentsService.deletePhoto(photo.Name)
                     .then(function () {
                         activate();

                         setPreviewPhoto();
                     });
               }

               //Set scope 
               activate();
               $scope.uploadFiles = uploadFiles;
               $scope.remove = removePhoto;
               $scope.setPreviewPhoto = setPreviewPhoto;
           }]);
