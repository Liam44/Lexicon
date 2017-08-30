// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// Templates - Create - Templates controller
angular.module('teacher')
    .controller('TemplatesEditController', ['$scope', 'TemplatesService', '$routeParams', '$rootScope',
        function ($scope, TemplatesService, $routeParams, $rootScope) {
            $scope.Title = 'Edit';
            $scope.id = $routeParams.id;

            $rootScope.loading = true;
            $scope.GetTemplate = TemplatesService.GetSingle($routeParams.id).then(function (ct) {
                $scope.Title += ' - '+ ct.Name;

                $scope.name = ct.Name;
                $scope.amountofdays = ct.AmountDays;

                $rootScope.loading = false;
            });

            $scope.Edit = function () {
                $rootScope.loading = true;
                TemplatesService.Edit($scope.id, $scope.name).then(function (response) {
                    $scope.EditMessage = 'Template updated!';
                    $rootScope.loading = false;
                });
            };
        }]);
