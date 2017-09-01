// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// CourseParts - Edit - CourseParts controller
angular.module('teacher')
    .controller('CoursePartsEditController', ['$scope', 'CoursePartsService', '$routeParams', '$rootScope',
        function ($scope, CoursePartsService, $routeParams, $rootScope) {
            $scope.Title = "Edit";

            $rootScope.loading = true;
            $scope.GetCoursePart = CoursePartsService.GetSingle($routeParams.id).then(function (cp) {
                $scope.Title += CoursePartsService.CreateTitle(cp);

                $scope.coursePartID = cp.ID;
                $scope.codeAlongLecture = cp.CodeAlong_Lecture;

                $rootScope.loading = false;
            });

            $scope.Edit = function () {
                $rootScope.loading = true;
                CoursePartsService.Edit($scope.coursePartID, $scope.codeAlongLecture).then(function (response) {
                    $scope.EditMessage = response;
                    $rootScope.loading = false;
                });
            };
        }]);
