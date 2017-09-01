// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// Links - Add on course day - Links controller
angular.module('teacher')
    .controller('CoursePartsAddLinkController', ['$scope', '$routeParams', '$rootScope', 'CoursePartsService', 'LinksService', 'tokenService', 'redirectService',
        function ($scope, $routeParams, $rootScope, CoursePartsService, LinksService, tokenService, redirectService) {
            //Variables
            $scope.Title = 'Uploading a new link';
            $scope.name = '';
            $scope.link = '';

            $scope.CoursePartID = $routeParams.id

            //Functions
            function activate() {
                $rootScope.loading = true;
                $scope.files = [];

                CoursePartsService.GetSingle($scope.CoursePartID)
                    .then(function (cp) {
                        $scope.Title += CoursePartsService.CreateTitle(cp);

                        $rootScope.loading = false;
                    },
                    function (err) {
                        console.log("Error status: " + err.status);
                        $rootScope.loading = false;
                    });
            }

            function Add() {
                if ($scope.link) {
                    $rootScope.loading = true;
                    LinksService.Add($scope.name, $scope.link, $scope.CoursePartID, undefined)
                        .then(function (data) {
                            redirectService.To('CourseParts', 'Details', $scope.CoursePartID);
                            $rootScope.loading = false;
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
