/**
 * Created by waige on 17/1/15.
 */
angular.module('myApp.qhb', [])
    .controller('QHBController', ['$scope', '$location', '$interval', function ($scope, $location, $interval) {

        $scope.mine = {
            robButtonAction: robButtonAction,
            showPacket: false,
            lookBtnAction: lookBtnAction
        }


        // 抢红包按钮事件
        function robButtonAction() {
            $scope.mine.showPacket = true;
        }

        // 点击查看按钮
        function lookBtnAction() {
            $scope.mine.showPacket = false;
            alert("红包到了~~~");

        }


        // 时钟
        var aSecond = 6, bSecond = 0;
        var aSecondDiv = document.querySelector('#aSecond');
        var bSecondDiv = document.querySelector('#bSecond');
        if (aTimer) {

            $interval.cancel(aTimer);
        }
        var aTimer = $interval(showTime, 1000);
        function showTime() {
            bSecond--;

            if (bSecond == -1) {
                bSecond = 9;
                aSecond--;
                if (aSecond == -1) {
                    // alert(666);
                    $location.path('/over');
                }
                change(aSecondDiv, aSecond);
            }
            change(bSecondDiv, bSecond);

        }

        function change(oDiv, time) {
            var oDivs = oDiv.getElementsByTagName('div');
            oDivs[1].innerHTML = time;
            var timer = $interval(function () {
                oDiv.style.top = oDiv.offsetTop - bSecondDiv.clientHeight / 10 + 'px';


                if (parseFloat(oDiv.style.top) <= -bSecondDiv.clientHeight) {
                    oDiv.style.top = 0;
                    oDivs[0].innerHTML = time;

                    $interval.cancel(timer);
                }

            }, 80);


        }

    }]);