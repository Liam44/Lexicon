// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// Messages - Index - Messages controller
angular.module('teacher')
    .controller('MessagesController', ['$scope', 'MessagesService', '$rootScope',
        function ($scope, MessagesService, $rootScope) {
            $scope.Title = "Messages";

            $scope.TitleReceived = "Inbox";
            $scope.TitleSent = "Sent Messages";

            $rootScope.loading = true;
            $scope.GetSentMessages = MessagesService.GetSentMessages().then(function (sm) {
                $scope.SentMessages = sm;
                $rootScope.loading = false;
            });

            $rootScope.loading = true;
            $scope.GetReceivedMessages = MessagesService.GetReceivedMessages().then(function (rm) {
                $scope.ReceivedMessages = rm;
                $rootScope.loading = false;
            });

            $scope.propertyNameSent = 'SendingDate';
            $scope.reverseSent = false;
            $scope.orderSentBy = orderSentBy;

            function orderSentBy(propertyName) {
                $scope.reverseSent = $scope.propertyNameSent === propertyName ? !$scope.reverseSent : false;
                $scope.propertyNameSent = propertyName;
            }

            $scope.propertyNameReceived = 'SendingDate';
            $scope.reverseReceived = false;
            $scope.orderReceivedBy = orderReceivedBy;

            function orderReceivedBy(propertyName) {
                $scope.reverseReceived = $scope.propertyNameReceived === propertyName ? !$scope.reverseReceived : false;
                $scope.propertyNameReceived = propertyName;
            }
        }]);
