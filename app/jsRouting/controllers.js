angular.module('routingApp', []).
    config(function($routeProvider) {
        $routeProvider.
            when('/about', {templateUrl:'partials/about.html', controller:AboutCtrl}).
            when('/experiments', {templateUrl:'partials/experiments.html', controller:ExperimentsCtrl   }).
            when('/home', {templateUrl:'partials/home.html', controller:HomeCtrl   }).
            otherwise({redirectTo:'/home'});
    });

function AboutCtrl($scope) {
    $scope.title = 'About Page';
    $scope.body = 'This is the about page body';
}

function ExperimentsCtrl($scope) {
    $scope.title = 'Experiments Page';
    $scope.body = 'This is the about experiments body';
}

function HomeCtrl($scope) {
    $scope.title = 'Home Page';
    $scope.body = 'This is the about home body';
}
