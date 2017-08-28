// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// Students - Details - Students controller
angular.module('teacher')
       .controller('StudentsDetailsController', ['$scope', 'UsersService', '$routeParams', '$rootScope',
        function ($scope, UsersService, $routeParams, $rootScope) {
            $scope.Title = 'Details';

            $scope.LinkHref = '#!/Students';
            $scope.LinkTitle = 'Register a new student';
            $scope.LinkText = 'Register a new student';

            $rootScope.loading = true;
            $scope.GetSingle = UsersService.GetSingle($routeParams.id).then(function (d) {
                $scope.User = d;
                $scope.Title = $scope.Title +' - '+ $scope.User.FirstName + ' ' + $scope.User.LastName;
                $rootScope.loading = false;
            });
        }]);
