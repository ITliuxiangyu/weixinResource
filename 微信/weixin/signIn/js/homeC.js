angular.module('myApp.home', [])
    .controller('HomeController', ['$scope', '$location', '$http', function ($scope, $location, $http) {


        // 查询活动学校
        // http://192.168.0.233:8080/weixinWall/selectHasActivitySchool

        // 学生签到
        // http://192.168.0.233:8080/weixinWall/studentSignIn
        // name, phone, schoolId

        // http://192.168.0.233:8080/weixinWall/searchRedPackageMoneyState

        // http://192.168.0.233:8080/weixinWall/getRedPackageMoney

        $http({
            url: "http://192.168.0.133:8080/weixinWall/studentSignIn",
            method: "POST",
            headers: {
              'Content-Type': "application/x-www-form-urlencoded"
                // 'Content-Type': "text/plain"
            },
            data: {
                name: "white",
                phone: "13598095881",
                schoolId: 1
            }
        }).then(function (data) {
            console.log(data);
        }, function (e) {
            console.log(e.message);
        });

        $scope.mine = {

            name: "歪哥测试",
            goToPacket: goToPacket,
            clear: clearVal,
            nameValue: "",
            phoneValue: "",
            submitButtonAction: submitButtonAction,
            alertStr: "",
            showAlert: false,
            enterButton: enterButtonAction,
            selected: "",
            universityArr: ["郑州轻工业学院", "河南理工大学", "河南工业大学", "郑州轻工业学院", "河南理工大学", "河南工业大学"],
            colorStyle: {color: "#999"},
            changeColor: function () {
                this.colorStyle.color = "black";
            },
            showPacket: false,
            openPacket: openPacketAction
        };
        
        function goToPacket() {
            $location.path('/red');
        }

        // 清除按钮时间
        function clearVal(n) {
            alert(111);
            !n ? $scope.mine.nameValue = "" : $scope.mine.phoneValue = "";
        }
        
        // 弹框确定按钮时间
        function enterButtonAction() {
            $scope.mine.showAlert = false;
        }

        // 提交按钮
        function submitButtonAction() {
            if (!$scope.mine.nameValue) {
                $scope.mine.alertStr = "请输入您的姓名!";
                $scope.mine.showAlert = true;
                return;
            }
            if (!$scope.mine.phoneValue) {
                $scope.mine.alertStr = "请输入您的手机号!";
                $scope.mine.showAlert = true;
                return;
            }
            if (!$scope.mine.selected) {
                $scope.mine.alertStr = "请选择您的学校!";
                $scope.mine.showAlert = true;
                return;
            }

            if(!(/^1[34578]\d{9}$/.test($scope.mine.phoneValue))){
                $scope.mine.alertStr = "您输入的手机号不存在!";
                $scope.mine.showAlert = true;
                return;
            }

            $scope.mine.showPacket = true;

        }
        
        function openPacketAction() {
            alert("获得红包!!!");
        }







    }]);