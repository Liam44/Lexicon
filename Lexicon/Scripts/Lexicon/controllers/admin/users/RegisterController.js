// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// Users - Register - Users controller
angular.module('admin')
       .controller('UsersRegisterController', ['$scope', 'UsersService', 'RolesService', '$rootScope',
        function ($scope, UsersService, RolesService, $rootScope) {
            $scope.Title = "Register a new User";

            $scope.LinkHref = '#!/Users';

            $scope.Roles = [];

            $scope.GetRoles = function () {
                $rootScope.loading = true;
                RolesService.GetAll().then(function (r) {
                    $scope.Roles = r;

                    $scope.roledisabled = false;

                    $rootScope.loading = false;
                });
            }

            $scope.Register = function () {
                $rootScope.loading = true;
                UsersService.Register($scope.firstName, $scope.lastName, $scope.afid, $scope.username, $scope.email, $scope.phoneNumber, $scope.role).then(function (u) {
                    $scope.CreateMessage = u;
                    $rootScope.loading = false;
                });
            };
        }]);
