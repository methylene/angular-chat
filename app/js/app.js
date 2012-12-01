"use strict";

var app = angular.module("chatApp", []).factory("firebaseService", function($timeout) {
    var ref = new Firebase("https://guest90842411.firebaseio-demo.com/");
    var messageholder = {"messages":{}};
    ref.on("value", function(messageSnapshot) {
        $timeout(function() {
            messageholder.messages = messageSnapshot.val();
        }, 0);
    });
    return {
        "messageholder": messageholder,
        "addMessage":function(name, text) {
            ref.push({
                "name": name,
                "text": text
            });
        }
    };
});
