// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// Templates - Details - Templates controller
angular.module('admin')
       .controller('TemplatesDetailsController', ['$scope', 'TemplatesService', 'CourseDaysService', '$routeParams', '$rootScope',
        function ($scope, TemplatesService, CourseDaysService, $routeParams, $rootScope) {
            $scope.Title = 'Details';

            $rootScope.loading = true;
            $scope.GetTemplate = TemplatesService.GetSingle($routeParams.id).then(function (ct) {
                $scope.Title += ' - ' + ct.Name;
                $scope.Template = ct;

                $rootScope.loading = false;
            });

            var contentDiv = document.getElementById('content');

            $rootScope.loading = true;
            $scope.GetCourseDays = CourseDaysService.GetCourseDays($routeParams.id).then(function (cd) {
                cd.forEach(function (courseday) {
                    var div = CourseDaysService.CreateDiv(courseday);
                    contentDiv.appendChild(div);
                })

                $rootScope.loading = false;
            });
        }]);
