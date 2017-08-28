angular.module('redirect')
       .factory('redirectService', ['$window', function ($window) {
           var thisRedirectService = {};

           thisRedirectService.Index = function (role) {
               $window.location.href = "Lexicon/" + role + "/";
           }

           thisRedirectService.Login = function () {
               $window.location.href = "/";
           }

           return thisRedirectService;
       }]);