// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// Students - Edit - Students controller
angular.module('teacher')
       .controller('StudentsEditController', ['$scope', 'UsersService', 'RolesService', '$routeParams', '$rootScope',
        function ($scope, UsersService, RolesService, $routeParams, $rootScope) {
            $scope.Title = "Edit";

            $scope.LinkHref = 'Students';

            $scope.RecordToEdit = $routeParams.id; // get the parameter

            $scope.Roles = [];

            $rootScope.loading = true;
            $scope.GetSingle = UsersService.GetSingle($routeParams.id).then(function (u) {
                $scope.firstName = u.FirstName;
                $scope.lastName = u.LastName;
                $scope.afid = u.AFId;
                $scope.username = u.Username;
                $scope.email = u.Email;
                $scope.phoneNumber = u.PhoneNumber;
                $scope.role = u.Role;
                $scope.roledisabled = true;

                $scope.Title = $scope.Title + ' - ' + $scope.firstName + ' ' + $scope.lastName;

                $scope.GetRoles();

                $rootScope.loading = false;
            });

            $scope.GetRoles = function () {
                $rootScope.loading = true;
                RolesService.GetAll().then(function (r) {
                    $scope.Roles = r;

                    $rootScope.loading = false;
                });
            }

            $scope.Update = function () {
                // Basic values check
                // -- Phone Number
                $scope.UpdateMessage = UsersService.CheckPhoneNumber($scope.phoneNumber);

                if ($scope.UpdateMessage) {
                    return;
                }

                $rootScope.loading = true;
                UsersService.Update($scope.RecordToEdit,
                                    $scope.firstName,
                                    $scope.lastName,
                                    $scope.afid,
                                    $scope.username,
                                    $scope.email,
                                    $scope.phoneNumber,
                                    $scope.role)
                    .then(function (d) {
                        $scope.UpdateMessage = d;
                        $rootScope.loading = false;
                    });
            };
        }]);
