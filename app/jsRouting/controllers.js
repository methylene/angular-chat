angular.module("routingApp", [])
	.config(function($routeProvider){
		$routeProvider
			.when("/about", {"template":"partials/about.html"})
			.when("/experiments", {"template":"partials/experiments.html"})
			.otherwise({"redirectTo":"/home", "template":"/partials/home.html"});
	});

function routingController($scope) {
	"use strict";
}
