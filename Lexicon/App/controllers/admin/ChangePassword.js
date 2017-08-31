angular.module('admin')
       .controller('ChangePasswordController', ['$scope', 'PasswordService',
        function ($scope, PasswordService) {
            'use strict'

            $scope.oldPassword = '';
            $scope.newPassword = '';
            $scope.confirmPassword = '';

            $scope.ChangePassword = ChangePassword;
            function ChangePassword() {
                PasswordService.ChangePassword($scope.oldPassword,
                                               $scope.newPassword,
                                               $scope.confirmPassword)
                .then(function (response) {
                    $scope.ChangePasswordError = response;
                },
                function (err) {
                    $scope.ChangePasswordError = err.statusText;
                });
            }
        }]);
