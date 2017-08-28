// ===================================================
// Create other controllers for respective pages
// ===================================================
// Error management controller
angular.module('logout')
       .controller('ErrorController', function ($scope) {
           $scope.Title = "Redirect Error";
       });
