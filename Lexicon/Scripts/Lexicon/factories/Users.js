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
                    return 'User registered!';
                },
                function (response) {
                    return ExtractErrorMessage(response.data.ModelState);
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
                    return 'Account updated!';
                    // return response.statusText + ' ' + response.status + ' ' + response.data;
                },
                function (response) {
                    return ExtractErrorMessage(response.data.ModelState);
                });

            return promise;
        };

        function ExtractErrorMessage(modelState) {
            if (modelState['model.Username']) {
                var result = '';

                modelState['model.Username'].forEach(function (item) {
                    result += item + ' ';
                })

                return result;
            }

            if (modelState['model.FirstName']) {
                var result = '';

                modelState['model.FirstName'].forEach(function (item) {
                    result += item + ' ';
                })

                return result;
            }

            if (modelState['model.LastName']) {
                var result = '';

                modelState['model.LastName'].forEach(function (item) {
                    result += item + ' ';
                })

                return result;
            }

            var result = '';

            modelState[""].forEach(function (item) {
                result += item + ' ';
            })

            return result;
        }

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

        // Checks that the phone number matches the following regular expression:
        // should start with (\d{2,3}) or +\d{2,3} or empty string
        // followed by a serie of digits optionally separated by - . and spaces
        // and end with a digit
        thisUserService.CheckPhoneNumber = function (phonenumber) {
            if (/^(\(\d{2,3}\)|\+\d{2,3})?\d(\d*|((\s|-|.)\d)*)*$/.exec(phonenumber)) {
                return undefined;
            }
            else {
                return 'The phone number must only contain digits, spaces and hyphens, ' +
                                               'can start with "(" or "+" or a digit ' +
                                               'and end at least with one digit. ' +
                                               'Double separator caracters are not allowed.';
            }
        }

        return thisUserService;
    }]);
