angular.module('currentuser')
       .factory('CurrentUserService', ['$http', 'tokenService', function ($http, tokenService) {
           var thisCurrentUserService = {};

           // get all data from database
           thisCurrentUserService.GetCurrentUser = function () {
               var promise = undefined;

               if (tokenService.IsAuthenticated) {
                   promise = $http({
                       method: 'GET',
                       url: '/api/Users/GetCurrentUser',
                       headers: tokenService.GetToken(),
                       withCredentials: true
                   })
                   .then(function (response) {
                       return response.data;
                   },
                   function (response) {
                       return undefined;
                   });
               }

               return promise;
           };

           return thisCurrentUserService;
       }]);