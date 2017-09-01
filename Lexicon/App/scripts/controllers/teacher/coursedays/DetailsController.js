// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// CourseDays - Details - CourseDays controller
angular.module('teacher')
    .controller('CourseDaysDetailsController', ['$scope', '$http', 'CourseDaysService', 'DocumentsService', '$routeParams', '$rootScope', 'tokenService',
        function ($scope, $http, CourseDaysService, DocumentsService, $routeParams, $rootScope, tokenService) {
            $scope.Title = 'Details';

            $rootScope.loading = true;
            $scope.GetCourseDay = GetCourseDay;

            function GetCourseDay() {
                CourseDaysService.GetSingle($routeParams.id).then(function (cd) {
                    if (cd.CourseTemplateName !== undefined) {
                        $scope.Title += ' - \'' + cd.CourseTemplateName;
                    }
                    else if (cd.CourseName !== undefined) {
                        $scope.Title += ' - \'' + cd.CourseName;
                    }

                    $scope.Title += '\' - Day ' + cd.DayNumber;
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

            $scope.propertyName = 'Name';
            $scope.reverse = false;
            $scope.orderBy = orderBy;

            function orderBy(propertyName) {
                $scope.reverse = $scope.propertyName === propertyName ? !$scope.reverse : false;
                $scope.propertyName = propertyName;
            }
        }]);
