(function () {
    var app = angular.module('auth', []);

    app.controller('authController', ['$scope', '$http', '$window', '$route', function ($scope, $http, $window, $route) {
        'use strict'

        $scope.roles = [];

        $scope.register = {
            "Email": "",
            "Username": "",
            "FirstName": "",
            "LastName": "",
            "AFID": "",
            "Role": ""
        };

        $scope.login = {
            "Username": "",
            "Password": ""
        };

        $scope.user;
        $scope.data;

        $scope.getRoles = getRoles;
        $scope.RequestRegister = Register;

        function getRoles() {
            $http.get('/api/RolesAPI/Get')
                .then(function (response) {
                    $scope.roles = response.data;

                    // Init by the first available value
                    if (!$scope.register.Role) {
                        $scope.register.Role = $scope.roles[0].Name;
                    }
                }), function (err) {
                    alert(err.status + " : " + err.message);
                };
        }

        function Register() {
            $http.post('/api/Account/Register', $scope.register)
            .then(function SuccessCallback(response) {
                // this callback will be called asynchronously then the response is available
                $scope.result = "Registration was successful";
            }, function (err) {
                // called asynchronously if an error occurs
                // or server returns reponse with an error status
                alert(err.status + " : " + err.message);
            });
        }

        $scope.RequestLogin = Login;

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
            .then(function SuccessCallback(response) {
                // this callback will be called asynchronously then the response is available
                $window.sessionStorage.setItem('tokenKey', response.data.access_token);
                $scope.user = response.data.userName;
                $window.location.href = "/Home/Index";
            }, function (err) {
                // called asynchronously if an error occurs
                // or server returns reponse with an error status
                if (err.status === 400) {
                    alert('Error during authentication: Wrong password?');
                    angular.element('#Password').focus();
                }
                else {
                    alert('Error ' + err.status + ': ' + err.message);
                }
            });
        }

        $scope.RequestData = GetValues;

        function GetValues() {
            var token = $window.sessionStorage.getItem('tokenKey');
            var headers = {};
            if (token) {
                headers.Authorization = 'Bearer ' + token;
            }
            var config = { headers: headers }

            $http.get('/api/Values', config)
            .then(function SuccessCallback(response) {
                $scope.data = response.data;
            });
        }
    }]);
})();