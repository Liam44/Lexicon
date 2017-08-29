// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// CourseDays - Index - CourseDays controller
angular.module('admin')
    .controller('CourseDaysController', ['$scope', 'CourseDaysService', '$rootScope',
        function ($scope, CourseDaysService, $rootScope) {
            $scope.Title = "Course CourseDays";

            $rootScope.loading = true;
            $scope.GetCourseDays = CourseDaysService.GetCourseDays($rootScope.id).then(function (cd) {
                $scope.CourseDays = cd;
                $rootScope.loading = false;
            });
        }]);
