// ===================================================
// Angular Factory to create service to peform CRUD
// ===================================================
angular.module('messages')
       .factory('MessagesService', ['$http', 'tokenService', function ($http, tokenService) {
           var thisMessageService = {};

           // get all sent messages from the user from database
           thisMessageService.GetSentMessages = function () {
               var promise = $http({
                   method: 'GET',
                   url: '/api/Messages/GetSentMessages',
                   headers: tokenService.GetToken()
               })
                   .then(function (response) {
                       return response.data;
                   },
                   function (response) {
                       return response.data;
                   });
               return promise;
           };

           // get all received messages by the user from database
           thisMessageService.GetReceivedMessages = function () {
               var promise = $http({
                   method: 'GET',
                   url: '/api/Messages/GetReceivedMessages',
                   headers: tokenService.GetToken()
               })
                   .then(function (response) {
                       return response.data;
                   },
                   function (response) {
                       return response.data;
                   });
               return promise;
           };

           // gets the amount of unread messages
           thisMessageService.GetAmountUnreadMessages = function (id) {
               var promise = $http({
                   method: 'GET',
                   url: '/api/Messages/GetAmountUnreadMessages',
                   headers: tokenService.GetToken()
               })
                   .then(function (response) {
                       return response.data;
                   },
                   function (response) {
                       return response.data;
                   });
               return promise;
           };

           // get single record from database
           thisMessageService.GetSingle = function (id) {
               var promise = $http({
                   method: 'GET',
                   url: '/api/Messages/GetMessage/' + id,
                   headers: tokenService.GetToken()
               })
                   .then(function (response) {
                       return response.data;
                   },
                   function (response) {
                       return response.data;
                   });
               return promise;
           };

           // gets the amount of unread messages
           thisMessageService.GetAnswers = function (id) {
               var promise = $http({
                   method: 'GET',
                   url: '/api/Messages/GetAnswers/' + id,
                   headers: tokenService.GetToken()
               })
                   .then(function (response) {
                       return response.data;
                   },
                   function (response) {
                       return response.data;
                   });
               return promise;
           };

           // post the data from database
           thisMessageService.Send = function (subject, content, toid, answertoid) {
               var message = {
                   Subject: subject,
                   Content: content,
                   ToID: toid,
                   AnswerToID: answertoid
               };

               var promise = $http({
                   method: 'POST',
                   url: '/api/Messages/PostMessage',
                   data: message,
                   headers: tokenService.GetToken()
               })
               .then(function (response) {
                   return response.statusText;
               },
               function (response) {
                   return response.statusText;
               });

               return promise;
           };

           return thisMessageService;
       }]);
