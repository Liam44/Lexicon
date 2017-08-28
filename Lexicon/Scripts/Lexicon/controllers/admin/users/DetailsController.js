// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// Users - Details - Users controller
angular.module('admin')
       .controller('UsersDetailsController', ['$scope', 'UsersService', '$routeParams', '$rootScope',
        function ($scope, UsersService, $routeParams, $rootScope) {
            $scope.Title = 'Details';

            $scope.LinkHref = '#!/Users';
            $scope.LinkTitle = 'Register a new user';
            $scope.LinkText = 'Register a new user';

            $rootScope.loading = true;
            $scope.GetSingle = UsersService.GetSingle($routeParams.id).then(function (d) {
                $scope.User = d;
                $scope.Title = $scope.Title +' - '+ $scope.User.FirstName + ' ' + $scope.User.LastName;
                $rootScope.loading = false;
            });
        }]);
