(function () {

    var app = angular.module('paginatedListApp', []);

    app.controller('paginatedListController', ['$scope', function ($scope) {
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.data = [];
        $scope.numberOfPages = function () {
            return Math.ceil($scope.data.length / $scope.pageSize);
        }
        for (var i = 0; i < 45; i++) {
            $scope.data.push({name:'Item ' + i, selected:false});
        }
        $scope.deleteSelected = function () {
            var lengthBefore = $scope.data.length;
            $scope.data = _.reject($scope.data, function (item) {
                return item.selected;
            });
            humanMsg.displayMsg('<span>Deleted <strong>'+( lengthBefore-$scope.data.length)+'</strong> items</span>');
        };
        $scope.actionPossible = function () {
            return _.some($scope.data, function (item) {
                return item.selected
            });
        };
        $scope.nextPage = function () {
            $scope.data = _.map($scope.data, function (item) {
                return {name:item.name, selected:false};
            });
            $scope.currentPage = $scope.currentPage + 1;
        };
        $scope.previousPage = function () {
            $scope.data = _.map($scope.data, function (item) {
                return {name:item.name, selected:false};
            });
            $scope.currentPage = $scope.currentPage - 1;
        };
    }]);

    app.filter('startFrom', function () {
        return function (input, start) {
            start = +start; //parse to int
            return input.slice(start);
        }
    });

})();
