(function () {

    var app = angular.module('dragDrop3App', []);

    app.controller('dragDrop3Ctrl', ['$scope', function ($scope) {
        $scope.list1 = [
            {name:'--reject--', reject:true},
            {name:'Is'},
            {name:'teh'},
            {name:'@wesome'}
        ];

        $scope.list2 = [
            {name:'AngularJS'},
        ];
    }]);

    app.directive('draggable', function () {
        return {
            restrict:'A',
            link:function (scope, element, attrs) {
                element.draggable({
                    revert:true
                });
            }
        };
    });

    app.directive('droppable', function () {
        return {
            restrict:'A',
            link:function (scope, element, attrs) {
                element.droppable({
                    drop:function (event, ui) {
                        scope.$apply(function () {
                            var dragIndex = angular.element(ui.draggable).data('index'),
                                reject = angular.element(ui.draggable).data('reject');

                            if (element.hasClass('list2') && angular.element(ui.draggable).parent().hasClass('list1') && reject !== true) {
                                scope.list2.push(scope.list1[dragIndex]);
                                scope.list1.splice(dragIndex, 1);
                            } else if (element.hasClass('list1') && angular.element(ui.draggable).parent().hasClass('list2') && reject !== true) {
                                scope.list1.push(scope.list2[dragIndex]);
                                scope.list2.splice(dragIndex, 1);
                            }
                        });
                    }
                });
            }
        };
    });

})();