"use strict";

var app = angular.module("chatApp", []).factory("firebaseService", function($timeout) {
    var ref = new Firebase("https://guest90842411.firebaseio-demo.com/");
    var messageholder = {"messages":{}};
    ref.on("value", function(messageSnapshot) {
        $timeout(function() {
            alert('0');
            messageholder.messages = messageSnapshot.val();
            alert('1');
        }, 0);
    });
    setTimeout(function(){
        alert('3');
        messageholder.messages = [];
        alert('4');
    }, 5000);
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
