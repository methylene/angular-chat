angular.module("masterDetailApp", ['ngResource'])
.controller('masterDetailController', ['$scope', '$resource', function($scope, $resource) {
    "use strict";

    var datasource = $resource('http://localhost:port/jsMasterDetail/dayService',
        {port:':3000', callback: 'JSON_CALLBACK'},
        {get:{method:'JSONP'}});

    $scope.rowsHolder = datasource.get();

    $scope.loadRow = function (row) {
        $scope.currentRow = row;
        $("#dialog-modal").dialog("open");
    };

    $scope.addRow = function () {
        $scope.rowsHolder.days.push({
            "day":$scope.newDay,
            "hours":[
                {
                    "start":8,
                    "end":12
                }
            ]
        });
        $scope.newDay = "";
    };

    $scope.deleteRow = function (row) {
        $scope.rowsHolder.days = _($scope.rowsHolder.days).reject(function (e) {
            return e.day == row.day;
        });
    };

    $scope.loadHour = function (hour) {
        $scope.currentHour = hour;
        $("#dialog-hours").dialog("open");
    };

    $scope.addHour = function () {
        $scope.currentRow.hours.push({
            "start":$scope.newHourStart,
            "end":$scope.newHourEnd
        });
        $scope.newHourStart = "";
        $scope.newHourEnd = "";
    };

    $scope.deleteHour = function (hour) {
        $scope.currentRow.hours = _($scope.currentRow.hours).reject(function (e) {
            return e.start == hour.start && e.end == hour.end;
        });
    };

}]);
