// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// News - Details/Delete - News controller
angular.module('teacher')
       .controller('NewsDetailsController', ['$scope', 'NewsService', '$routeParams', '$rootScope',
        function ($scope, NewsService, $routeParams, $rootScope) {
            $scope.Title = 'Details';
            $rootScope.loading = true;
            $scope.GetSingle = NewsService.GetSingle($routeParams.id).then(function (d) {
                $scope.User = d;
                $scope.Title = $scope.Title +' - '+ $scope.User.FirstName + ' ' + $scope.User.LastName;
                $rootScope.loading = false;
            });

            $scope.Delete = function () {
                var v = confirm('Are you sure to delete this user account?');
                if (v) {
                    $rootScope.loading = true;
                    NewsService.Remove($routeParams.id).then(function (d) {
                        $scope.DeleteMessage = d;
                        $rootScope.loading = false;
                    });
                }
            };
        }]);
