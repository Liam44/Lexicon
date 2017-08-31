// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// CourseDays - Details - CourseDays controller
angular.module('admin')
       .controller('CourseDaysDetailsController', ['$scope', 'CourseDaysService', '$routeParams', '$rootScope',
        function ($scope, CourseDaysService, $routeParams, $rootScope) {
            $scope.Title = 'Details';

            $rootScope.loading = true;
            $scope.GetCourseDay = GetCourseDay;

            function GetCourseDay() {
                CourseDaysService.GetSingle($routeParams.id).then(function (cd) {
                    $scope.Title += ' - \'' + cd.CourseTemplateName + '\' - Day ' + cd.DayNumber;
                    $scope.CourseDay = cd;

                    $rootScope.loading = false;
                });
            }

            $scope.propertyName = 'Name';
            $scope.reverse = false;
            $scope.orderBy = orderBy;

            function orderBy(propertyName) {
                $scope.reverse = $scope.propertyName === propertyName ? !$scope.reverse : false;
                $scope.propertyName = propertyName;
            }
        }]);
