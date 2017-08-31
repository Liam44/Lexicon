// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// Messages - Details - Messages controller
angular.module('teacher')
    .controller('MessagesReadController', ['$scope', 'MessagesService', '$routeParams', '$rootScope',
        function ($scope, MessagesService, $routeParams, $rootScope) {
            $scope.Title = 'Message';

            $rootScope.loading = true;
            $scope.GetMessage = MessagesService.GetSingle($routeParams.id).then(function (m) {
                $scope.Message = m;

                // The display of the content of the message is a bit peculiar,
                // for it may contain multilines
                // All the '\n' caracters contained in the message has been replaced
                // by '<br />' when the message has been saved into the database,
                // making it easier to display
                document.getElementById('content').innerHTML = m.Content;

                MessagesService.GetAmountUnreadMessages().then(function (data) {
                    $rootScope.AmountUnreadMessages = data;
                });

                $rootScope.loading = false;
            });
        }]);
