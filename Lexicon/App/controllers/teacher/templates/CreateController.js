// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// Templates - Create - Templates controller
angular.module('teacher')
    .controller('TemplatesCreateController', ['$scope', 'TemplatesService', '$rootScope',
        function ($scope, TemplatesService, $rootScope) {
            $scope.Title = 'Create a new course template';

            $scope.name = undefined;
            $scope.amountofdays = undefined;

            $scope.Create = function () {
                $rootScope.loading = true;
                TemplatesService.Post($scope.name, $scope.amountofdays).then(function (response) {
                    $scope.CreateMessage = 'Template created!';
                    $rootScope.loading = false;
                });
            };
        }]);
