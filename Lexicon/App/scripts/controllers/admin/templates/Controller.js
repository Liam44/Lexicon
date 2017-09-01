// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// Templates - Index - Templates controller
angular.module('admin')
    .controller('TemplatesController', ['$scope', 'TemplatesService', '$rootScope',
        function ($scope, TemplatesService, $rootScope) {
            $scope.Title = "Course Templates";

            $rootScope.loading = true;
            $scope.GetTemplates = TemplatesService.GetTemplates().then(function (ct) {
                $scope.Templates = ct;
                $rootScope.loading = false;
            });

            $scope.DeleteError = undefined;
            $scope.Delete = function (name, id) {
                var v = confirm('Are you sure to delete \'' + name + '\'?');
                if (v) {
                    $rootScope.loading = true;
                    TemplatesService.Delete(id).then(function (d) {
                        // Reload the templates list
                        TemplatesService.GetTemplates().then(function (ct) {
                            $scope.Templates = ct;
                            $scope.DeleteError = 'The template \'' + name + '\' has been deleted!';
                        },
                        function (err) {
                            $scope.DeleteError = ' ' + err;
                        });

                        $rootScope.loading = false;
                    },
                    function (err) {
                        $scope.DeleteError = ' ' + err;
                    });
                }
            };

            $scope.propertyName = 'Name';
            $scope.reverse = false;
            $scope.orderBy = orderBy;

            function orderBy(propertyName) {
                $scope.reverse = $scope.propertyName === propertyName ? !$scope.reverse : false;
                $scope.propertyName = propertyName;
            }
        }]);
