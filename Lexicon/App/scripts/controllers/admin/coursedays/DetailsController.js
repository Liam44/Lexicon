// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// CourseDays - Details - CourseDays controller
angular.module('admin')
    .controller('CourseDaysDetailsController', ['$scope', '$http', 'CourseDaysService', 'DocumentsService', '$routeParams', '$rootScope', 'tokenService',
        function ($scope, $http, CourseDaysService, DocumentsService, $routeParams, $rootScope, tokenService) {
            $scope.Title = 'Details';

            $rootScope.loading = true;
            $scope.GetCourseDay = GetCourseDay;

            function GetCourseDay() {
                CourseDaysService.GetSingle($routeParams.id).then(function (cd) {
                    $scope.Title += CourseDaysService.CreateTitle(cd);

                    $scope.CourseDay = cd;

                    $rootScope.loading = false;
                });
            }

            $scope.Download = function (fileId) {
                DocumentsService.Download(fileId)
                    .then(function (success) {
                        headers = success.headers();

                        var filename = headers['x-filename'];
                        var contentType = headers['content-type'];

                        var linkElement = document.createElement('a');
                        try {
                            var blob = new Blob([success.data], { type: contentType });
                            var url = window.URL.createObjectURL(blob);

                            linkElement.setAttribute('href', url);
                            linkElement.setAttribute("download", filename);

                            var clickEvent = new MouseEvent("click", {
                                "view": window,
                                "bubbles": true,
                                "cancelable": false
                            });

                            linkElement.dispatchEvent(clickEvent);
                        } catch (ex) {
                            console.log(ex);
                        }
                    },
                    function (err) {
                        console.log(err);
                    });
            }

            $scope.Delete = function (name, id) {
                var v = confirm('Are you sure you want to delete \'' + name + '\'?');
                if (v) {
                    $rootScope.loading = true;
                    DocumentsService.Delete(id)
                        .then(function () {
                            $scope.Title = 'Details';
                            GetCourseDay();

                            $rootScope.loading = false;
                        });
                }
            }

            $scope.documentPropertyName = 'Name';
            $scope.documentReverse = false;
            $scope.orderDocumentsBy = orderDocumentsBy;

            function orderDocumentsBy(propertyName) {
                $scope.documentReverse = $scope.documentPropertyName === propertyName ? !$scope.documentReverse : false;
                $scope.documentPropertyName = propertyName;
            }

            $scope.attendancePropertyName = 'LastName+FirstName';
            $scope.attendanceReverse = false;
            $scope.orderAttendancesBy = orderAttendancesBy;

            function orderAttendancesBy(propertyName) {
                $scope.attendanceReverse = $scope.attendancePropertyName === propertyName ? !$scope.attendanceReverse : false;
                $scope.attendancePropertyName = propertyName;
            }
        }]);
