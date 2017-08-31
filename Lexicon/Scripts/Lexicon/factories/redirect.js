angular.module('redirect')
       .factory('redirectService', ['$window', function ($window) {
           var thisRedirectService = {};

           thisRedirectService.Index = function (role) {
               $window.location.href = "Lexicon/" + role + "/";
           }

           thisRedirectService.To = function (model, id) {
               $window.location.href = '#!/' + model + '/Details/' + id;
           }

           thisRedirectService.Login = function () {
               $window.location.href = "/";
           }

           return thisRedirectService;
       }]);