// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// Students - Register - Students controller
angular.module('teacher')
       .controller('StudentsRegisterController', ['$scope', 'UsersService', 'RolesService', '$rootScope',
        function ($scope, UsersService, RolesService, $rootScope) {
            $scope.Title = "Register a new Student";

            $scope.LinkHref = '#!/Students';

            var role = { 'Key': 0, 'Value': 'Student' };

            $scope.Roles = [role];

            $scope.GetRoles = function () {
            }

            $scope.Register = function () {
                $rootScope.loading = true;
                UsersService.Register($scope.firstName,
                                      $scope.lastName,
                                      $scope.afid,
                                      $scope.username,
                                      $scope.email,
                                      $scope.phoneNumber,
                                      $scope.Roles[0].Key).then(function (u) {
                    $scope.CreateMessage = u;
                    $rootScope.loading = false;
                });
            };
        }]);
