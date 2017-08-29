// ===================================================
// Angular Factory to create service to peform CRUD
// ===================================================
angular.module('coursedays')
       .factory('CourseDaysService', ['$http', 'tokenService', function ($http, tokenService) {
           var thisCourseDayService = {};

           // get all course parts in a course day
           thisCourseDayService.GetCourseDays = function (id) {
               var promise = $http({
                   method: 'GET',
                   url: '/api/CourseDays/GetCourseDays/' + id,
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
           thisCourseDayService.GetSingle = function (id) {
               var promise = $http({
                   method: 'GET',
                   url: '/api/CourseDays/GetCourseDay/' + id,
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

           // Creates a new div element, which contains message data
           thisCourseDayService.CreateDiv = function (courseDay) {
               var div = document.createElement('div');
               div.className = 'col-md-1 courseday-content';
               div.id = courseDay.ID;
               div.style = 'text-align: center';

               var nameDiv = document.createElement('div');
               nameDiv.innerHTML = 'DAY ' + courseDay.DayNumber;

               var morningDiv = document.createElement('div');
               morningDiv.id = courseDay.Morning.ID;
               morningDiv.innerHTML = '<a href="#!/CourseDays/Details/' + courseDay.Morning.ID + '">' + courseDay.Morning.PartDay + '</a>';

               var afternoonDiv = document.createElement('div');
               afternoonDiv.id = courseDay.Afternoon.ID;
               afternoonDiv.innerHTML = '<a href="#!/CourseDays/Details/' + courseDay.Afternoon.ID + '">' + courseDay.Afternoon.PartDay + '</a>';

               div.appendChild(nameDiv);
               div.appendChild(morningDiv);
               div.appendChild(afternoonDiv);

               return div;
           }

           return thisCourseDayService;
       }]);
