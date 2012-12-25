angular.module("qApp", [])
.controller('qController', ['$scope', '$q', function($scope, $q) {
    "use strict";

    var deferred = $q.defer();
	setTimeout(function() {
$scope.$apply(function() {
		deferred.resolve({
  "days": [
    {
      "day": "Monday",
      "hours": [
        {
          "start": 8,
          "end": 12
        }
      ]
    },
    {
      "day": "Tuesday",
      "hours": [
        {
          "start": 8,
          "end": 12
        }
      ]
    },
    {
      "day": "Wednesday",
      "hours": [
        {
          "start": 8,
          "end": 12
        }
      ]
    },
    {
      "day": "Thursday",
      "hours": [
        {
          "start": 8,
          "end": 12
        }
      ]
    }
  ]
});});
}, 1000);

    $scope.rowsHolder = deferred.promise;
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
