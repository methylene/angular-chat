"use strict";

function chatController($scope, firebaseService) {
    $scope.name = "";
    $scope.text = "";
    $scope.someClass = "none";
    $scope.messageholder = firebaseService.messageholder;
    $scope.loadMessages = function() {
        $scope.messageholder = firebaseService.messageholder;
    };
    $scope.checkMessages = function() {
        console.log("SERVICE MESSAGES: ", firebaseService.messageholder.messages);
        console.log("SCOPE MESSAGES: ", $scope.messages);
    };
    $scope.addMessage = function() {
        firebaseService.addMessage($scope.name, $scope.text);
        $scope.text = "";
    };
}
chatController.$inject = ["$scope", "firebaseService"];