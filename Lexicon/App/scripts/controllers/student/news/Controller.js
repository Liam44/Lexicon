// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// News - Index - News controller
angular.module('student')
       .controller('NewsController', ['$scope', 'NewsService', '$rootScope', function ($scope, NewsService, $rootScope) {
           $scope.Title = "Registered News";
           $rootScope.loading = true;
           $scope.GetNews = NewsService.GetAll().then(function (d) {
               $scope.News = d;
               $rootScope.loading = false;
           });
       }]);
