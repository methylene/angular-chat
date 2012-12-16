"use strict";

function chatOnlyController($timeout, $scope) {
    var ref = new Firebase("https://guest90842411.firebaseio-demo.com/");
    var messageholder = {"messages":{}};
    ref.on("value", function(messageSnapshot) {
        $timeout(function() {
            messageholder.messages = messageSnapshot.val();
        }, 0);
    });
    var addMessage = function(name, text) {
        ref.push({
            "name": name,
            "text": text
        });
    }
    $scope.name = "";
    $scope.text = "";
    $scope.messageholder = messageholder;
    $scope.addMessage = function() {
        addMessage($scope.name, $scope.text);
        $scope.text = "";
    };
}