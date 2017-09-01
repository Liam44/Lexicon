// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// CourseParts - Details - CourseParts controller
angular.module('teacher')
    .controller('CoursePartsDetailsController', ['$scope',
                                                 '$http',
                                                 'CoursePartsService',
                                                 'DocumentsService',
                                                 'LinksService',
                                                 'AssignmentsService',
                                                 '$routeParams',
                                                 '$rootScope',
                                                 'tokenService',
        function ($scope, $http, CoursePartsService, DocumentsService, LinksService, AssignmentsService, $routeParams, $rootScope, tokenService) {
            $scope.Title = 'Details';

            $rootScope.loading = true;
            $scope.GetCoursePart = GetCoursePart;

            function GetCoursePart() {
                CoursePartsService.GetSingle($routeParams.id).then(function (cp) {
                    $scope.Title += CoursePartsService.CreateTitle(cp);

                    $scope.CoursePart = cp;

                    $rootScope.loading = false;
                },
                function (err) {
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

            $scope.DeleteDocument = function (name, id) {
                var v = confirm('Are you sure you want to delete \'' + name + '\'?');
                if (v) {
                    $rootScope.loading = true;
                    DocumentsService.Delete(id)
                        .then(function () {
                            $scope.Title = 'Details';
                            GetCoursePart();

                            $rootScope.loading = false;
                        });
                }
            }

            $scope.DeleteLink = function (name, id) {
                var v = confirm('Are you sure you want to delete \'' + name + '\'?');
                if (v) {
                    $rootScope.loading = true;
                    LinksService.Delete(id)
                        .then(function () {
                            $scope.Title = 'Details';
                            GetCoursePart();

                            $rootScope.loading = false;
                        });
                }
            }

            $scope.DeleteAssignment = function (theme, id) {
                var v = confirm('Are you sure you want to delete \'' + theme + '\'?');
                if (v) {
                    $rootScope.loading = true;
                    AssignmentsService.Delete(id)
                        .then(function () {
                            $scope.Title = 'Details';
                            GetCoursePart();

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

            $scope.linkPropertyName = 'URL';
            $scope.linkReverse = false;
            $scope.orderLinksBy = orderLinksBy;

            function orderLinksBy(propertyName) {
                $scope.linkReverse = $scope.linkPropertyName === propertyName ? !$scope.linkReverse : false;
                $scope.linkPropertyName = propertyName;
            }

            $scope.assignmentPropertyName = 'Theme';
            $scope.assignmentReverse = false;
            $scope.orderAssignmentsBy = orderAssignmentsBy;

            function orderAssignmentsBy(propertyName) {
                $scope.assignmentReverse = $scope.assignmentPropertyName === propertyName ? !$scope.assignmentReverse : false;
                $scope.assignmentPropertyName = propertyName;
            }
        }]);
