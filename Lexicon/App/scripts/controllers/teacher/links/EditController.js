// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// Links - Edit - Links controller
angular.module('teacher')
    .controller('LinksEditController', ['$scope', 'LinksService', '$routeParams', '$rootScope',
        function ($scope, LinksService, $routeParams, $rootScope) {
            $scope.Title = 'Edit';
            $scope.id = $routeParams.id;

            $rootScope.loading = true;
            $scope.GetLink = LinksService.GetSingle($routeParams.id).then(function (l) {
                $scope.Title += ' - '+ l.Name;

                $scope.name = l.Name;
                $scope.href = l.HttpLink;

                $scope.CoursePartID = l.CoursePartID;
                $scope.AssignmentID = l.AssignmentID;

                $rootScope.loading = false;
            });

            $scope.Edit = function () {
                $rootScope.loading = true;
                LinksService.Edit($scope.id, $scope.name, $scope.href).then(function (response) {
                    $scope.EditMessage = 'Link updated!';
                    $rootScope.loading = false;
                });
            };
        }]);
