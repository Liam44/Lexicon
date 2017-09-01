// ===================================================
// Create other controllers for respective pages
// ===================================================
// Error management controller
angular.module('login')
       .controller('ErrorController', function ($scope) {
           $scope.Title = "Redirect Error";
       });
