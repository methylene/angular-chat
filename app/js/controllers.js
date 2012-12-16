"use strict";

function chatController($scope, firebaseService) {
    $scope.name = "";
    $scope.text = "";
    $scope.someClass = "none";
    $scope.messageholder = firebaseService.messageholder;
    $scope.addMessage = function() {
        firebaseService.addMessage($scope.name, $scope.text);
        $scope.text = "";
    };
}
chatController.$inject = ["$scope", "firebaseService"];