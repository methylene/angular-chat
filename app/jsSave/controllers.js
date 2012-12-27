angular.module('saveApp', ['ngResource'])
.controller('saveController', ['$scope', '$resource', function($scope, $resource) {
    'use strict';

    var days = $resource('/jsMasterDetail/dayService');

    console.log('keys in days: ' + _.keys(days));
    console.log('functions in days: ' + _.functions(days));

    $scope.rowsHolder = days.get();

    var saveDays = function() {
	days.save($scope.rowsHolder);
	/*days.get(function (d) {
		d.days = $scope.rowsHolder.days;
		d.$save();
	});*/
    };

    $scope.allDays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

    $scope.newDay = $scope.allDays[0];

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
        $scope.newDay = $scope.allDays[0];
	saveDays();
    };

    $scope.deleteRow = function (row) {
        $scope.rowsHolder.days = _($scope.rowsHolder.days).reject(function (e) {
            return e.day == row.day;
        });
	saveDays();
    };

    $scope.loadHour = function (hour) {
        $scope.currentHour = hour;
	console.log('hour='+hour.start);
        $('#dialog-hours').dialog('open');
    };

    $scope.addHour = function () {
        $scope.currentRow.hours.push({
            start:$scope.newHourStart,
            end:$scope.newHourEnd
        });
        $scope.newHourStart = '';
        $scope.newHourEnd = '';
	saveDays();
    };

    $scope.deleteHour = function (hour) {
        $scope.currentRow.hours = _($scope.currentRow.hours).reject(function (e) {
            return e.start == hour.start && e.end == hour.end;
        });
	saveDays();
    };

    $scope.submitHourChange = function () {
	$('#dialog-hours').dialog('close');
	saveDays();
    };

}]);
