// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// Messages - Details - Messages controller
angular.module('student')
    .controller('MessagesHistoryController', ['$scope', 'MessagesService', '$routeParams', '$rootScope',
        function ($scope, MessagesService, $routeParams, $rootScope) {
            $scope.Title = 'Discussion Historic';

            var contentDiv = document.getElementById('content');

            $rootScope.loading = true;
            $scope.GetMessage = MessagesService.GetAnswers($routeParams.id).then(function (a) {
                a.forEach(function (answer) { CreateDIV(answer); })

                $rootScope.loading = false;
            });

            function CreateDIV(message) {
                var div = document.createElement('div');
                div.className = 'message message-content';
                div.id = message.ID;
                div.style = 'margin-left:' + (message.Level * 40) + 'px';

                var dateDiv = document.createElement('div');
                dateDiv.className = 'col-md-2 message-date';
                dateDiv.innerHTML = message.SendingDate + '<br />' + message.From;

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
                div.appendChild(expendDiv);
                div.appendChild(collapseDiv);

                div.addEventListener("click", function (e) {
                    collapseDiv.classList.toggle('collapse');
                });

                var lastDiv = contentDiv[contentDiv.length];
                contentDiv.insertBefore(div, lastDiv);
            }
        }]);
