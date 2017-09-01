// ===================================================
// Angular Factory to create service to peform CRUD
// ===================================================
angular.module('courseparts')
       .factory('CoursePartsService', ['$http', 'tokenService', function ($http, tokenService) {
           var thisCoursePartService = {};

           // get all course parts in a course day
           thisCoursePartService.GetCourseParts = function (id) {
               var promise = $http({
                   method: 'GET',
                   url: '/api/CourseParts/GetCourseParts/' + id,
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
           thisCoursePartService.GetSingle = function (id) {
               var promise = $http({
                   method: 'GET',
                   url: '/api/CourseParts/GetCoursePart/' + id,
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
           thisCoursePartService.Edit = function (id, codeAlongLecture) {
               var message = {
                   ID: id,
                   CodeAlong_Lecture: codeAlongLecture
               };

               var promise = $http({
                   method: 'PUT',
                   url: '/api/CourseParts/PutCoursePart/' + id,
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
           thisCoursePartService.CreateDiv = function (message, initialCoursePartId) {
               var div = document.createElement('div');
               var className = 'message message-content';

               if (message.ID === initialCoursePartId) {
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
                   reply = '<a href="#!/CourseParts/Reply/' + message.ID + '">Reply</a>';
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

           return thisCoursePartService;
       }]);
