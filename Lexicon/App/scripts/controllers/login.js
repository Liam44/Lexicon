angular.module('login')
       .controller('LoginController', ['$scope', '$http', '$rootScope', 'tokenService', 'CurrentUserService', 'redirectService',
        function ($scope, $http, $rootScope, tokenService, CurrentUserService, redirectService) {
            'use strict'

            $scope.login = {
                'Username': '',
                'Password': ''
            };

            // The only thing a visitor can do is basically to get logged in
            $scope.Login = Login;

            function Login() {
                // Basic data validation
                if (!$scope.login.Username) {
                    alert('The username is required!');
                    angular.element('#UserName').focus();
                    return;
                }

                if (!$scope.login.Password) {
                    alert('The password is required!');
                    angular.element('#Password').focus();
                    return;
                }

                var data = "grant_type=password&username=" + $scope.login.Username + "&password=" + $scope.login.Password;
                $http.post('/Token', data)
                     .then(
                        function SuccessCallback(response) {
                            // this callback will be called asynchronously then the response is available
                            tokenService.SetToken(response.data.access_token);

                            // Redirect to the index page, according to the current user's role
                            CurrentUserService.GetCurrentUser().then(function (data) {
                                var user = data;

                                if (user) {
                                    redirectService.Index(user.RoleName);
                                }
                            });
                        },
                        function (err) {
                            // called asynchronously if an error occurs
                            // or server returns reponse with an error status
                            if (err.status === 400) {
                                alert('Error during authentication: Wrong password?');
                                $scope.login.Password = '';
                                angular.element('#Password').focus();
                            }
                            else {
                                alert('Error ' + err.status + ': ' + err.message);
                            }
                        }
                     );
            }
        }]);