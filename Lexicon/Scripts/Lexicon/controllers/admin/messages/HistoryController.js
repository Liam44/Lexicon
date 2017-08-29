// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// Messages - Details - Messages controller
angular.module('admin')
    .controller('MessagesHistoryController', ['$scope', 'MessagesService', '$routeParams', '$rootScope',
        function ($scope, MessagesService, $routeParams, $rootScope) {
            $scope.Title = 'Discussion Historic';

            var contentDiv = document.getElementById('content');

            $rootScope.loading = true;
            $scope.GetMessage = MessagesService.GetAnswers($routeParams.id).then(function (a) {
                a.forEach(function (answer) { CreateDIV(answer); })

                $rootScope.loading = false;
            });

            function CreateDIV(message) {
                var div = MessagesService.CreateDiv(message, parseInt($routeParams.id));

                var lastDiv = contentDiv[contentDiv.length];
                contentDiv.insertBefore(div, lastDiv);
            }
        }]);
