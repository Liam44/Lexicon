// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// Templates - Details - Templates controller
angular.module('admin')
       .controller('TemplatesDetailsController', ['$scope', 'TemplatesService', 'CourseDaysService', '$routeParams', '$rootScope', '$compile',
        function ($scope, TemplatesService, CourseDaysService, $routeParams, $rootScope, $compile) {
            $scope.Title = 'Details';

            $rootScope.loading = true;
            $scope.GetTemplate = TemplatesService.GetSingle($routeParams.id).then(function (ct) {
                $scope.Title += ' - ' + ct.Name;
                $scope.Template = ct;

                $rootScope.loading = false;
            });

            $rootScope.loading = true;
            $scope.GetCourseDays = GetCourseDays;

            function GetCourseDays() {
                CourseDaysService.GetCourseDays($routeParams.id).then(function (cd) {
                    $scope.CourseDays = cd;
                    $scope.amountofdays = cd.length;

                    $rootScope.loading = false;
                })
            }

            $scope.AddError = undefined;
            $scope.AddCourseDay = function () {
                var v = confirm('Are you sure you want to add a new course day?');
                if (v) {
                    $rootScope.loading = true;
                    TemplatesService.AddCourseDay($routeParams.id)
                        .then(function (d) {
                            // Update the amount of days in the template
                            $scope.Template.AmountDays += 1;

                            GetCourseDays();

                            $rootScope.loading = false;
                        },
                        function (err) {
                            $scope.AddError = ' ' + err;
                        });
                };
            }

            $scope.DeleteError = undefined;
            $scope.DeleteCourseDay = function (name, id) {
                var v = confirm('Are you sure you want to delete DAY ' + name + '?');
                if (v) {
                    $rootScope.loading = true;
                    TemplatesService.DeleteCourseDay($routeParams.id, id)
                        .then(function (d) {
                            // Update the amount of days in the template
                            $scope.Template.AmountDays -= 1;

                            GetCourseDays();

                            $rootScope.loading = false;
                        },
                        function (err) {
                            $scope.DeleteError = ' ' + err;
                        });
                };
            }

            $scope.MoveUpError = undefined;
            $scope.MoveUp = function (name, id) {
                var v = confirm('Are you sure you want to move ' + name + ' up in the schedule?');
                if (v) {
                    $rootScope.loading = true;
                    CourseDaysService.MoveUp(id)
                        .then(function (d) {
                            GetCourseDays();
                            $scope.MoveUpError = name + ' has been moved up!';

                            $rootScope.loading = false;
                        },
                        function (err) {
                            $scope.MoveUpError = ' ' + err;
                        });
                };
            }

            $scope.MoveDownError = undefined;
            $scope.MoveDown = function (name, id) {
                var v = confirm('Are you sure you want to move ' + name + ' down in the schedule?');
                if (v) {
                    $rootScope.loading = true;
                    CourseDaysService.MoveDown(id)
                        .then(function (d) {
                            GetCourseDays();
                            $scope.MoveDownError = name + ' has been moved down!';

                            $rootScope.loading = false;
                        },
                        function (err) {
                            $scope.MoveDownError = ' ' + err;
                        });
                };
            }
        }]);
