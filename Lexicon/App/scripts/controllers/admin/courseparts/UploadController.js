// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// CourseParts - Details - CourseParts controller
angular.module('admin')
    .controller('CoursePartsUploadController', ['$scope', '$routeParams', '$rootScope', 'CoursePartsService', 'DocumentsService', 'Upload', 'tokenService', 'redirectService',
        function ($scope, $routeParams, $rootScope, CoursePartsService, DocumentsService, Upload, tokenService, redirectService) {
            //Variables
            $scope.Title = 'Uploading documents';
            $scope.files = [];
            $scope.classes = [];
            $scope.documentClass = undefined;

            $scope.CoursePartID = $routeParams.id;

            //Functions
            function activate() {
                $rootScope.loading = true;
                $scope.files = [];

                CoursePartsService.GetSingle($routeParams.id)
                    .then(function (cp) {
                        $scope.Title += CoursePartsService.CreateTitle(cp);
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

            function uploadFiles(files) {
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
                            CoursePartID: $routeParams.id,
                            DocumentClass: $scope.documentClass
                        }
                    })
                        .then(function (response) {
                            redirectService.To('CourseParts', 'Details', $scope.CoursePartID);
                        },
                        function (err) {
                            console.log("Error status: " + err.status);
                            $rootScope.loading = false;
                        });
                }
            }

            //Set scope 
            activate();
            $scope.uploadFiles = uploadFiles;
        }]);
