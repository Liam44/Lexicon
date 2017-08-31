// ===================================================
// Create other controllers for respective pages
// ===================================================
// default controller
angular.module('admin')
       .controller('Controller', ['$scope', '$rootScope', 'CurrentUserService', 'MessagesService', 'redirectService',
        function ($scope, $rootScope, CurrentUserService, MessagesService, redirectService) {
            $scope.Title = "Please wait while loading the page...";
            $rootScope.loading = false;

            $scope.User;
            $rootScope.AmountUnreadMessages;

            $scope.GetCurrentUser = GetCurrentUser;

            function GetCurrentUser() {
                CurrentUserService.GetCurrentUser().then(function (data) {
                    $scope.User = data;

                    if (!$scope.User) {
                        redirectService.Login();
                    }

                    MessagesService.GetAmountUnreadMessages().then(function (data) {
                        $rootScope.AmountUnreadMessages = data;
                    });
                });
            }
        }]);
