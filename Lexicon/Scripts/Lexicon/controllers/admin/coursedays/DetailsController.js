// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// Templates - Details - Templates controller
angular.module('admin')
       .controller('TemplatesDetailsController', ['$scope', 'TemplatesService', '$routeParams', '$rootScope',
        function ($scope, TemplatesService, $routeParams, $rootScope) {
            $scope.Title = 'Details';

            $rootScope.loading = true;
            $scope.GetTemplate = TemplatesService.GetSingle($routeParams.id).then(function (ct) {
                $scope.Title += ' - ' + ct.Name;
                $scope.Template = ct;

                $rootScope.loading = false;
            });

            var contentDiv = document.getElementById('content');

            $rootScope.loading = true;
            $scope.GetCourseDays = TemplatesService.GetAnswers($routeParams.id).then(function (a) {
                a.forEach(function (answer) { CreateDIV(answer); })

                $rootScope.loading = false;
            });

            function CreateDIV(message) {
                var div = MessagesService.CreateDiv(message, parseInt($routeParams.id));

                var lastDiv = contentDiv[contentDiv.length];
                contentDiv.insertBefore(div, lastDiv);
            }
        }]);
