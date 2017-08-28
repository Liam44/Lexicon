// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// Users - Index/Delete - Users controller
angular.module('admin')
       .controller('UsersController', ['$scope', 'UsersService', 'PasswordService', '$rootScope',
        function ($scope, UsersService, PasswordService, $rootScope) {
            $scope.Title = "Registered Users";

            $scope.LinkHref = '#!/Users';
            $scope.LinkTitle = 'Register a new user';
            $scope.LinkText = 'Register a new user';

            $rootScope.loading = true;
            $scope.GetUsers = UsersService.GetAll().then(function (d) {
                $scope.Users = d;
                $rootScope.loading = false;
            });

            $scope.ResetPasswordError = undefined;
            $scope.ResetPassword = function (username, id) {
                var v = confirm('Are you sure to reset ' + username + '\'s password?');
                if (v) {
                    $rootScope.loading = true;
                    PasswordService.ResetPassword(id).then(function (d) {
                        $scope.ResetPasswordError = 'Password reseted for ' + username + '!';
                        $rootScope.loading = false;
                    },
                    function (err) {
                        $scope.ResetPasswordError = ' ' + err;
                    });
                }
            };

            $scope.DeleteError = undefined;
            $scope.Delete = function (username, id) {
                var v = confirm('Are you sure to delete ' + username + '\'s account?');
                if (v) {
                    $rootScope.loading = true;
                    UsersService.Remove(id).then(function (d) {
                        // Reload the students list
                        UsersService.GetAll().then(function (u) {
                            $scope.Users = u;
                            $scope.DeleteError = username + '\'s account has been deleted!';
                        },
                        function (err) {
                            $scope.DeleteError = ' ' + err;
                        });

                        $rootScope.loading = false;
                    },
                    function (err) {
                        $scope.DeleteError = ' ' + err;
                    });
                }
            };

            $scope.propertyName = 'LastName';
            $scope.reverse = false;
            $scope.orderBy = orderBy;

            function orderBy(propertyName) {
                $scope.reverse = $scope.propertyName === propertyName ? !$scope.reverse : false;
                $scope.propertyName = propertyName;
            }
        }]);
