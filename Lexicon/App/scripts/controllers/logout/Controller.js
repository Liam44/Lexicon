angular.module('logout')
       .controller('LogoutController', ['$scope', 'LogoutService',
        function ($scope, LogoutService) {
            'use strict'

            $scope.LogOut = LogOut;

            function LogOut() {
                LogoutService.LogOut();
            }

            $scope.loggedOut = loggedOut;

            function loggedOut() {
                LogoutService.LoggedOut();
            }
        }]);
