angular.module('token')
       .factory('tokenService', ['$window', function ($window) {
           var thisTokenService = {};

           var tokenKey = 'tokenKey';

           thisTokenService.SetToken = function (accessToken) {
               $window.sessionStorage.setItem(tokenKey, accessToken);
           }

           thisTokenService.GetToken = function () {
               var token = $window.sessionStorage.getItem(tokenKey);
               var headers = {};
               if (token) {
                   headers.Authorization = 'Bearer ' + token;
               }

               return headers;
           }

           thisTokenService.GetTokenHeaders = function () {
               return { headers: this.getToken() };
           }

           thisTokenService.IsAuthenticated = function () {
               if (this.getToken().headers.Authorization) {
                   return true;
               }
               else {
                   return false;
               }
           }

           thisTokenService.ResetToken = function () {
               try{
                   $window.sessionStorage.removeItem(tokenKey);
                   return undefined;
               }
               catch (err) {
                   return err;
               }
           }

           return thisTokenService;
       }]);