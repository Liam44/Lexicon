// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// Links - Add on course day - Links controller
angular.module('admin')
    .controller('CourseDaysAddLinkController', ['$scope', '$routeParams', '$rootScope', 'CourseDaysService', 'LinksService', 'tokenService', 'redirectService',
        function ($scope, $routeParams, $rootScope, CourseDaysService, LinksService, tokenService, redirectService) {
            //Variables
            $scope.Title = 'Uploading documents';
            $scope.files = [];
            $scope.classes = [];
            $scope.documentClass = undefined;

            $scope.CourseDayID = $routeParams.id;

            //Functions
            function activate() {
                $rootScope.loading = true;
                $scope.files = [];

                CourseDaysService.GetSingle($routeParams.id)
                    .then(function (cd) {
                        $scope.Title += CourseDaysService.CreateTitle(cd);
                    },
                    function (err) {
                        console.log("Error status: " + err.status);
                        $rootScope.loading = false;

                        return;
                    });

                DocumentsService.getDocumentClasses()
                    .then(function (data) {
                        $scope.classes = data.data;
                        $rootScope.loading = false;
                    },
                    function (err) {
                        console.log("Error status: " + err.status);
                        $rootScope.loading = false;
                    });
            }

            function Add() {
                if (files.length) {
                    if ($scope.documentClass === undefined) {
                        alert('A document class must be selected!');
                        document.getElementById('documentClass').focus();
                        return;
                    }

                    $rootScope.loading = true;
                    Upload.upload({
                        url: '/api/Documents/Upload/',
                        headers: tokenService.GetToken(),
                        data: {
                            file: files,
                            CourseDayID: $routeParams.id,
                            DocumentClass: $scope.documentClass
                        }
                    })
                        .then(function (response) {
                            redirectService.To('CourseDays', 'Details', $scope.CourseDayID);
                        },
                        function (err) {
                            console.log("Error status: " + err.status);
                            $rootScope.loading = false;
                        });
                }
            }

            //Set scope 
            activate();
            $scope.Add = Add;
        }]);
