// ===================================================
// Angular Factory to create service to peform CRUD
// ===================================================
angular.module('password')
       .factory('PasswordService', ['$http', 'tokenService', function ($http, tokenService) {
           var thisPasswordService = {};

           // Allows a user to change their password
           thisPasswordService.ChangePassword = function (oldPassword, newPassword, confirmPassword) {
               var changePassword = {
                   OldPassword: oldPassword,
                   NewPassword: newPassword,
                   ConfirmPassword: confirmPassword
               };

               var promise = $http({
                   method: 'POST',
                   url: '/api/Account/ChangePassword/',
                   data: changePassword,
                   headers: tokenService.GetToken()
               })
               .then(function (response) {
                   return 'Your password has been changed!';
               },
               function (response) {
                   if (response.data.ModelState['model.NewPassword']) {
                       var result = '';

                       response.data.ModelState['model.NewPassword'].forEach(function (item) {
                           result += item + ' ';
                       })

                       return result;
                   }

                   if (response.data.ModelState['model.ConfirmPassword']) {
                       var result = '';

                       response.data.ModelState['model.ConfirmedPassword'].forEach(function (item) {
                           result += item + ' ';
                       })

                       return result;
                   }

                   var result = '';

                   response.data.ModelState[""].forEach(function (item) {
                       result += item + ' ';
                   })

                   return result;
               });

               return promise;
           };

           // Allows a user to reset another user's password
           thisPasswordService.ResetPassword = function (id) {
               var promise = $http({
                   method: 'POST',
                   url: '/api/Account/ResetPassword/' + id,
                   headers: tokenService.GetToken()
               })
               .then(function (response) {
                   return 'Reseted password!';
               },
               function (response) {
                   return response.statusText + ' ' + response.status + ' ' + response.data;
               });

               return promise;
           };

           return thisPasswordService;
       }]);
