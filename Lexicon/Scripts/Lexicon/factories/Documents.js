// ===================================================
// Angular Factory to create service to peform CRUD
// ===================================================
angular.module('documents')
    .factory('DocumentsService', ['$http', '$q', 'tokenService', function ($http, $q, tokenService) {
        var thisDocumentService = {};

        //Get all photos saved on the server  
        thisDocumentService.getDocumentClasses = function () {
            var promise = $http({
                method: 'GET',
                url: '/api/Documents/GetDocumentClasses/',
                headers: tokenService.GetToken()
            })
                .then(function (response) {
                    return response;
                },
                function (response) {
                    return response;
                });

            return promise;
        }

        // Delete document on the server with given file name      
        thisDocumentService.Delete = function (id) {
            var promise = $http({
                method: 'DELETE',
                url: '/api/Documents/Delete/',
                headers: tokenService.GetToken(),
                params: { id: id }
            })
                .then(function (response) {
                    return response;
                },
                function (response) {
                    return response;
                });

            return promise;
        }

        thisDocumentService.Download = function (fileId) {
            var promise = $http({
                method: 'GET',
                url: '/api/Documents/Download',
                params: { fileID: fileId },
                headers: tokenService.GetToken(),
                responseType: 'arraybuffer'
            })
                .then(function (success) {
                    return success;
                },
                function (err) {
                    return err;
                });

            return promise;
        }

        return thisDocumentService;
    }]);
