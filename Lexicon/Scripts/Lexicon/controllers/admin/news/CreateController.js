// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// News - Create - News controller
angular.module('admin')
       .controller('NewsCreateController', ['$scope', 'NewsService', '$rootScope',
        function ($scope, NewsService, $rootScope) {
            $scope.Title = "Write a news";

            $scope.Create = function () {
                $rootScope.loading = true;
                NewsService.Insert($scope.firstName, $scope.lastName, $scope.afid, $scope.username, $scope.email, $scope.role).then(function (d) {
                    $scope.CreateMessage = d;
                    $rootScope.loading = false;
                });
            };
        }]);
