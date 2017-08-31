// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// Messages - Create - Messages controller
angular.module('teacher')
    .controller('MessagesReplyController', ['$scope', 'MessagesService', 'UsersService', '$routeParams', '$rootScope',
        function ($scope, MessagesService, UsersService, $routeParams, $rootScope) {
            $scope.Title = "Reply to";

            $scope.GetUsers = function () {
                $rootScope.loading = true;
                UsersService.GetRecipients().then(function (u) {
                    $scope.Users = u;
                    $rootScope.loading = false;
                });
            };

            $scope.DisplayUser = function (u) {
                return u.FirstName + ' ' + u.LastName;
            };

            $rootScope.loading = true;
            $scope.GetMessage = MessagesService.GetSingle($routeParams.id).then(function (m) {
                if (m.FromID) {
                    // The only interesting fields in the current message are
                    // - the 'From' field which will become our 'To' field
                    // - the subject that will become 'Re: <subject>'
                    // - the content of the message that will be displayed for information
                    $scope.toid = m.FromID;
                    $scope.subject = 'Re: ' + m.Subject;

                    GetInitialContent(m);

                    $scope.answertoid = $routeParams.id;
                }

                $rootScope.loading = false;
            });

            $scope.initialcontent = '';
            function GetInitialContent(message) {
                var header = [message.SendingDate, '\u2014', message.From, 'wrote:'];

                var content = [header.join(' '),
                               '\u2014',
                               message.Content.replace(new RegExp('<br />', 'g'), '\n'),
                               Array(16).join('\u2014'),
                               ''];

                $scope.initialcontent = content.join('\n') + $scope.initialcontent;

                if (message.AnswerToID) {
                    MessagesService.GetSingle(message.AnswerToID).then(function (m) {
                        GetInitialContent(m);
                    })
                }
            }

            $scope.Send = function () {
                $rootScope.loading = true;
                MessagesService.Send($scope.subject, $scope.content, $scope.toid, $scope.answertoid).then(function (m) {
                    $scope.CreateMessage = 'Message sent!';
                    $rootScope.loading = false;
                });
            };
        }]);
