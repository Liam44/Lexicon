// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// News - Edit - News controller
angular.module('admin')
       .controller('NewsEditController', ['$scope', 'NewsService', '$routeParams', '$rootScope',
        function ($scope, NewsService, $routeParams, $rootScope) {
           $scope.Title = "Edit - Personal Details";
           $scope.RecordToEdit = $routeParams.id; // get the parameter

           $rootScope.loading = true;
           $scope.GetSingle = NewsService.GetSingle($routeParams.id).then(function (d) {
               $scope.firstName = d.FirstName;
               $scope.lastName = d.LastName;
               $scope.afid = d.AFId;
               $scope.username = d.Username;
               $scope.email = d.Email;
               $scope.role = d.Role;
               $rootScope.loading = false;
           });

           $scope.Update = function () {
               $rootScope.loading = true;
               NewsService.Update($scope.RecordToEdit, $scope.firstName, $scope.lastName, $scope.afid, $scope.username, $scope.email, $scope.role).then(function (d) {
                   $scope.UpdateMessage = d;
                   $rootScope.loading = false;
               });
           };
       }]);
