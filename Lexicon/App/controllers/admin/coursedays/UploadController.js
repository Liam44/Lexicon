// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// CourseDays - Details - CourseDays controller
angular.module('admin')
       .controller('CourseDaysUploadController', ['$scope', 'DocumentsService', '$routeParams', '$rootScope',
        function ($scope, DocumentsService, $routeParams, $rootScope) {
            $scope.Title = 'Details';

            $scope.uploadedFile = function(element) {
                $scope.$apply(function($scope) {
                    $scope.files = element.files;         
                });
            }

            $scope.addFile = function () {
                DocumentsService.UploadCourseDay($routeParams.id, $scope.files,
                  function (msg) // success
                  {
                      console.log('uploaded');
                  },
                  function (msg) // error
                  {
                      console.log('error');
                  });
            }
        }]);
