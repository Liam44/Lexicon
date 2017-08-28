// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// Students - Index/Delete - Students controller
angular.module('teacher')
       .controller('StudentsController', ['$scope', 'UsersService', 'PasswordService', '$rootScope',
        function ($scope, UsersService, PasswordService, $rootScope) {
            $scope.Title = "Registered Students";

            $scope.LinkHref = '#!/Students';
            $scope.LinkTitle = 'Register a new student';
            $scope.LinkText = 'Register a new student';

            $rootScope.loading = true;
            $scope.GetUsers = UsersService.GetStudents().then(function (d) {
                $scope.Users = d;
                $rootScope.loading = false;
            });

            $scope.ResetPassword = function (username, id) {
                var v = confirm('Are you sure to reset ' + username + '\'s password?');
                if (v) {
                    $rootScope.loading = true;
                    PasswordService.ResetPassword(id).then(function (d) {
                        $scope.ResetPasswordError = 'Password reseted!';
                        $rootScope.loading = false;
                    },
                    function (err) {
                        $scope.ResetPasswordError = ' ' + err;
                    });
                }
            };

            $scope.Delete = function (username, id) {
                var v = confirm('Are you sure to delete ' + username + '\'s account?');
                if (v) {
                    $rootScope.loading = true;
                    UsersService.Remove(id).then(function (d) {
                        // Reload the students list
                        UsersService.GetStudents().then(function (u) {
                            $scope.Users = u;
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
