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

           // Creates a new div element, which contains message data
           thisMessageService.CreateDiv = function (message, initialMessageId) {
               var div = document.createElement('div');
               var className = 'message message-content';

               if (message.ID === initialMessageId) {
                   className += ' message-selected';
               }

               div.className = className;
               div.id = message.ID;
               div.style = 'padding-left:' + (message.Level * 50) + 'px';

               var dateDiv = document.createElement('div');
               dateDiv.className = 'col-md-3 message-date';
               dateDiv.innerHTML = message.SendingDate;

               if (message.Level > 0) {
                   dateDiv.innerHTML = '\u2937' + '\u0009' + dateDiv.innerHTML;
               }

               var fromDiv = document.createElement('div');
               fromDiv.className = 'col-md-3 message-from';
               fromDiv.innerHTML = message.From;

               var expendDiv = document.createElement('div');
               expendDiv.className = 'message-subject';
               expendDiv.innerHTML = message.Subject;

               var collapseDiv = document.createElement('div');
               collapseDiv.className = 'collapse';

               var separator = Array(41).join('\u2014');

               var reply = '';
               if (message.FromID) {
                   reply = '<a href="#!/Messages/Reply/' + message.ID + '">Reply</a>';
               }

               var content = [separator, message.Content, separator, reply, '', ''];

               collapseDiv.innerHTML = content.join('<br />');

               div.appendChild(dateDiv);
               div.appendChild(fromDiv);
               div.appendChild(expendDiv);
               div.appendChild(collapseDiv);

               div.addEventListener("click", function (e) {
                   collapseDiv.classList.toggle('collapse');
               });

               return div;
           }

           return thisMessageService;
       }]);
