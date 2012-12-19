function listShuttleController($scope) {
    "use strict";
    $scope.list1 = [
        {
            "name":"Bernd",
            "id":"1"
        }, {
            "name":"Frauke",
            "id":"2"
        }, {
            "name":"Hauke",
            "id":"3"
        }, {
            "name":"Hauke",
            "id":"4"
        }, {
            "name":"Rabauke",
            "id":"5"
        }
    ];
    $scope.list2 = [];
    var selectedList1 = [];
    var selectedList2 = [];
    $scope.selectRowList1 = function(row) {
        selectedList1 = _.contains(selectedList1, row) ? _.difference(selectedList1, [row]) : _.union(selectedList1, [row]);
        selectedList2 = [];
    };
    $scope.selectRowList2 = function(row) {
        selectedList2 = _.contains(selectedList2, row) ? _.difference(selectedList2, [row]) : _.union(selectedList2, [row]);
        selectedList1 = [];
    };
    $scope.calculateClassList1 = function (row) {
        return _.contains(selectedList1, row) ? "shuttle_row shuttle_row_active" : "shuttle_row shuttle_row_passive";
    };
    $scope.calculateClassList2 = function (row) {
        return _.contains(selectedList2, row) ? "shuttle_row shuttle_row_active" : "shuttle_row shuttle_row_passive";
    };
    $scope.moveToList1 = function(){
        $scope.list2 = _.difference($scope.list2, selectedList2);
        $scope.list1 = $scope.list1.concat(selectedList2);
        selectedList2 = [];
    };
    $scope.moveToList2 = function(){
        $scope.list1 = _.difference($scope.list1, selectedList1);
        $scope.list2 = $scope.list2.concat(selectedList1);
        selectedList1 = [];
    };
    $scope.addList1 = function () {
        $scope.list1.push({
            "name":$scope.newRowList1,
            "id": _.uniqueId()
        });
        $scope.newRowList1 = "";
    }
    $scope.remove = function () {
        var target = _.isEmpty(selectedList1) ? $scope.list2 : $scope.list1;
        var toDelete = _.isEmpty(selectedList1) ? selectedList2 : selectedList1;
        var newTarget = _.difference(target, toDelete);
        if (_.isEmpty(selectedList1)) {
            $scope.list2 = newTarget;
        } else {
            $scope.list1 = newTarget;
        }
    }
}