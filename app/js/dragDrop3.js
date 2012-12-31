(function () {
    var app = angular.module('dragDrop3App', []);

    app.controller('dndCtrl', ['$scope', function ($scope) {
        $scope.someArrays = {
            list0:[
                {name:'AngularJS'},
                {name:'Is'},
                {name:'teh'},
                {name:'@wesome'}
            ],
            list1:[
                {name:'AngularJS'}
            ],
            list2:[
                {name:'Is'},
                {name:'rather good'}
            ],
            list3:[
                {name:'@wesome'},
                {name:'MooTools'}
            ]};
        // args 'event' and 'ui' are pass-through from jQuery UI droppable callback. aSrc[index] == item.
        // any truthy return value will abort the move action and gets passed to the onDropRejected callback
        $scope.isDropForbidden = function (eSrc, eTarget, eDraggable, event, ui, aSrc, aTarget, item, index) {
            if (aTarget.some(function (i) {
                return i.name == item.name;
            })) {
                return {reason:"target already contains '" + item.name + "'"};
            } else {
                return false;
            }
        };
        // aSrc[index] == item; 'error' is return value of isDropForbidden
        $scope.onDropRejected = function (eSrc, eTarget, eDraggable, event, ui, aSrc, aTarget, item, index, error) {
            humanMsg.displayMsg('Operation not permitted: ' + error.reason);
        };
        // When this gets called, the move operation is already completed,
        // so aSrc[index] != item in general. 'index' is the original index the item had in aSrc
        $scope.onDropComplete = function (eSrc, eTarget, eDraggable, event, ui, aSrc, aTarget, item, index) {
            console.log("moved '" + item.name + "' from " + eSrc.data('model') + '[' + index + ']' + ' to ' + eTarget.data('model'));
        };
    }]);

    app.directive('uiDraggable', function () {
        return {
            restrict:'A',
            link:function (scope, element, attrs) {
                element.draggable({
                    revert:true
                });
            }
        };
    });

    app.directive('uiDroppable', function () {
        var mv = function (eSrc, eTarget, eDraggable, event, ui, aSrc, aTarget, index, fnDropForbidden, fnOnDrop, fnOnDropRejected) {
            var item = aSrc[index];
            var error = !fnDropForbidden ? false : fnDropForbidden(eSrc, eTarget, eDraggable, event, ui, aSrc, aTarget, item, index);
            if (!error) {
                aTarget.push(item);
                aSrc.splice(index, 1);
                if (fnOnDrop) {
                    fnOnDrop(eSrc, eTarget, eDraggable, event, ui, aSrc, aTarget, item, index);
                }
            } else {
                if (fnOnDropRejected) {
                    fnOnDropRejected(eSrc, eTarget, eDraggable, event, ui, aSrc, aTarget, item, index, error);
                }
            }
        };
        return {
            restrict:'A',
            link:function (scope, eTarget, attrs) {
                eTarget.droppable({
                    drop:function (event, ui) {
                        scope.$apply(function () {
                            var eDraggable = angular.element(ui.draggable);
                            var eSrc = eDraggable.parent();
                            var aTarget = scope.$eval(eTarget.data('model'));
                            var aSrc = scope.$eval(eSrc.data('model'));
                            var index = eDraggable.data('index');
                            var fnOnDropComplete = scope.$eval(attrs.uiOnDropComplete);
                            var fnOnDropRejected = scope.$eval(attrs.uiOnDropRejected);
                            var fnDropForbidden = scope.$eval(attrs.uiDropForbidden);
                            if (aSrc !== aTarget) {
                                mv(eSrc, eTarget, eDraggable, event, ui, aSrc, aTarget, index, fnDropForbidden, fnOnDropComplete, fnOnDropRejected);
                            }
                        });
                    }
                });
            }
        };
    });

})();