// ===================================================
// Angular Factory to create service to peform CRUD
// ===================================================
angular.module('users')
    .factory('UsersService', ['$http', 'tokenService', function ($http, tokenService) {
        var thisUserService = {};

        // get all data from database
        thisUserService.GetAll = function () {
            var promise = $http({
                method: 'GET',
                url: '/api/Users/GetUsers',
                headers: tokenService.GetToken()
            })
                .then(function (response) {
                    return response.data;
                },
                function (response) {
                    return response.data;
                });
            return promise;
        };

        // get only the students from database
        thisUserService.GetStudents = function () {
            var promise = $http({
                method: 'GET',
                url: '/api/Users/GetStudents',
                headers: tokenService.GetToken()
            })
                .then(function (response) {
                    return response.data;
                },
                function (response) {
                    return response.data;
                });
            return promise;
        };

        // gets all potential recipients for a new message
        // - meaning all users excepted the one currently authenticated
        thisUserService.GetRecipients = function () {
            var promise = $http({
                method: 'GET',
                url: '/api/Users/GetRecipients',
                headers: tokenService.GetToken()
            })
                .then(function (response) {
                    return response.data;
                },
                function (response) {
                    return response.data;
                });
            return promise;
        };

        // get single record from database
        thisUserService.GetSingle = function (id) {

            var promise = $http({
                method: 'GET',
                url: '/api/Users/GetUser/' + id,
                headers: tokenService.GetToken()
            })
                .then(function (response) {
                    return response.data;
                },
                function (response) {
                    return response.data;
                });
            return promise;
        };

        // post the data from database
        thisUserService.Register = function (firstName, lastName, afid, username, email, phoneNumber, role) {
            var user = {
                FirstName: firstName,
                LastName: lastName,
                AFId: afid,
                Username: username,
                Email: email,
                PhoneNumber: phoneNumber,
                Role: role
            };

            var promise = $http({
                method: 'POST',
                url: '/api/Account/Register',
                data: user,
                headers: tokenService.GetToken()
            })
                .then(function (response) {
                    return response.statusText;
                },
                function (response) {
                    return response.statusText;
                });

            return promise;
        };

        // put the data from database
        thisUserService.Update = function (userId, firstName, lastName, afid, username, email, phoneNumber, role) {
            var user = {
                Id: userId,
                FirstName: firstName,
                LastName: lastName,
                AFId: afid,
                Username: username,
                Email: email,
                PhoneNumber: phoneNumber,
                Role: role
            };

            var promise = $http({
                method: 'PUT',
                url: '/api/Account/PutUser/' + userId,
                data: user,
                headers: tokenService.GetToken()
            })
                .then(function (response) {
                    return "Updated";
                    // return response.statusText + ' ' + response.status + ' ' + response.data;
                },
                function (response) {
                    var result = response.statusText + ' ' + response.status;

                    if (response.data.Message) {
                        result += ' ' + response.data.Message;
                    }

                    return result;
                });

            return promise;
        };

        // delete the data from database
        thisUserService.Remove = function (userId) {
            var promise = $http({
                method: 'DELETE',
                url: '/api/Users/DeleteUser/' + userId,
                headers: tokenService.GetToken()
            })
                .then(function (response) {
                    // return "Deleted";
                    return response.statusText + ' ' + response.status + ' ' + response.data;
                },
                function (response) {
                    return response.statusText + ' ' + response.status + ' ' + response.data;
                });

            return promise;
        };

        return thisUserService;
    }]);
