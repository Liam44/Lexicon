// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// Messages - Create - Messages controller
angular.module('admin')
    .controller('MessagesWriteController', ['$scope', 'MessagesService', 'UsersService', '$rootScope',
        function ($scope, MessagesService, UsersService, $rootScope) {
            $scope.Title = "Write a new message";

            $scope.GetUsers = function () {
                $rootScope.loading = true;
                UsersService.GetRecipients().then(function (u) {
                    $scope.Users = u;
                    $rootScope.loading = false;
                });
            };

            $scope.DisplayUser = function (u) {
                return u.FirstName + ' ' + u.LastName;
            };

            $scope.Send = function () {
                $rootScope.loading = true;
                MessagesService.Send($scope.subject, $scope.content, $scope.toid, undefined).then(function (m) {
                    $scope.CreateMessage = 'Message sent!';
                    $rootScope.loading = false;
                });
            };
        }]);
