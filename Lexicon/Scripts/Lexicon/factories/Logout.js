angular.module('logout')
       .factory('LogoutService', ['tokenService', 'redirectService', function (tokenService, redirectService) {
            var thisLogoutService = {};

            thisLogoutService.LogOut = function () {
                // called asynchronously if an error occurs
                // or server returns reponse with an error status
                var result = tokenService.ResetToken();

                if (result) {
                    alert('The current error occured:\n' + result);
                }
            }

            thisLogoutService.LoggedOut = function () {
                // Redirect to the Login page
                redirectService.Login();
            }

            return thisLogoutService;
        }]);
