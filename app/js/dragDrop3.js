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
        $scope.dropListener = function (eDraggable, eDroppable) {

            var isDropForbidden = function (aTarget, item) {
                if (aTarget.some(function (i) {
                    return i.name == item.name;
                })) {
                    return {reason:"target already contains '" + item.name + "'"};
                } else {
                    return false;
                }
            };

            var onDropRejected = function (error) {
                humanMsg.displayMsg('Operation not permitted: ' + error.reason);
            };

            var onDropComplete = function (eSrc, item, index) {
                console.log("moved '" + item.name + "' from " + eSrc.data('model') + '[' + index + ']' + ' to ' + eDroppable.data('model'));
            };

            var eSrc = eDraggable.parent();
            var sSrc = eSrc.data('model');
            var sTarget = eDroppable.data('model');

            if (sSrc != sTarget) {
                $scope.$apply(function () {
                    var aSrc = $scope.$eval(sSrc);
                    var aTarget = $scope.$eval(sTarget);
                    var index = eDraggable.data('index');
                    var item = aSrc[index];
                    var error = isDropForbidden(aTarget, item);
                    if (error) {
                        onDropRejected(error);
                    } else {
                        aTarget.push(item);
                        aSrc.splice(index, 1);
                        onDropComplete(eSrc, item, index);
                    }
                });
            }

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

    app.directive('uiDropListener', function () {
        return {
            restrict:'A',
            link:function (scope, eDroppable, attrs) {
                eDroppable.droppable({
                    drop:function (event, ui) {
                        var fnDropListener = scope.$eval(attrs.uiDropListener);
                        if (fnDropListener && angular.isFunction(fnDropListener)) {
                            var eDraggable = angular.element(ui.draggable);
                            fnDropListener(eDraggable, eDroppable, event, ui);
                        }
                    }
                });
            }
        };
    });

})();