// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// Messages - Details - Messages controller
angular.module('teacher')
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

                var lastDiv = contentDiv[contentDiv.length];
                contentDiv.insertBefore(div, lastDiv);
            }
        }]);
