angular.module('bsActiveLink')
       .directive('bsActiveLink', ['$location', function ($location) {
           return {
               restrict: 'A', //use as attribute 
               replace: false,
               link: function (scope, elem) {
                   //after the route has changed
                   scope.$on("$routeChangeSuccess", function () {
                       var hrefs = ['/#!' + $location.path(),
                                    '#!' + $location.path(), //html5: false
                                    $location.path()]; //html5: true
                       angular.forEach(elem.find('a'), function (a) {
                           a = angular.element(a);
                           if (hrefs.indexOf(a.attr('href')) === -1) {
                               a.parent().removeClass('active');
                           } else {
                               a.parent().addClass('active');
                           };
                       });
                   });
               }
           }
       }]);