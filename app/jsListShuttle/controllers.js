"use strict";

function listShuttleController($scope) {
    $scope.list1 = [
        {
            "name":"Bernd",
            "id":1
        }, {
            "name":"Frauke",
            "id":2
        }, {
            "name":"Hauke",
            "id":3
        }, {
            "name":"Hauke",
            "id":4
        }, {
            "name":"Rabauke",
            "id":5
        }
    ];
    $scope.list2 = [];
    var selectedList1 = [];
    var selectedList2 = [];
    $scope.selectRowList1 = function(row) {
        if (!_.contains(selectedList1, row)) {
            selectedList1.push(row);
        }
        selectedList2 = [];
    };
    $scope.selectRowList2 = function(row) {
        if (!_.contains(selectedList2, row)) {
            selectedList2.push(row);
        }
        selectedList1 = [];
    };
    $scope.calculateClassList1 = function (row) {
        if (_.contains(selectedList1, row)) {
            return "shuttle_row_selected";
        } else {
            return "shuttle_row";
        }
    };
    $scope.calculateClassList2 = function (row) {
        if (_.contains(selectedList2, row)) {
            return "shuttle_row_selected";
        } else {
            return "shuttle_row";
        }
    };
    $scope.moveToList1 = function(){
        $scope.list2 = _.difference($scope.list2, selectedList2);
        for (var i in selectedList2) {
            $scope.list1.push(selectedList2[i]);
        }
        selectedList2 = [];
    };
    $scope.moveToList2 = function(){
        $scope.list1 = _.difference($scope.list1, selectedList1);
        for (var i in selectedList1) {
            $scope.list2.push(selectedList1[i]);
        }
        selectedList1 = [];
    };
}