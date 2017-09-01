angular.module('redirect')
       .factory('redirectService', ['$window', function ($window) {
           var thisRedirectService = {};

           thisRedirectService.Index = function (role) {
               $window.location.href = role + '/';
           }

           thisRedirectService.To = function (controller, action, id) {
               $window.location.href = '#!/' + controller + '/' + action + '/' + id;
           }

           thisRedirectService.Login = function () {
               $window.location.href = "/";
           }

           return thisRedirectService;
       }]);