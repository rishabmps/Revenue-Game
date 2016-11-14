angular.module("MyApp", [])
    .controller("MyController", function($scope) {

        var listener = function(newValue, oldValue, scope) {
            var id = this.exp;
            var idArr = id.split('');

            idArr[0] = 'B';
            id = idArr.join('');
            id = '#' + id;
            if (newValue > $(id).text()) {

                $('#myModal').modal('show');
                document.getElementById('x').innerHTML = 'Wrong input';
                document.getElementById('y').innerHTML = "Accepted bookings can't be greater than forecasted data";
                $scope[this.exp] = oldValue;
                return;
            }

            var Rate1 = parseInt(document.getElementById("Rt1").innerText);
            var Rate2 = parseInt(document.getElementById("Rt2").innerText);
            var Rate3 = parseInt(document.getElementById("Rt3").innerText);
            var Rate4 = parseInt(document.getElementById("Rt4").innerText);
            var Rate5 = parseInt(document.getElementById("Rt5").innerText);
            var Rate6 = parseInt(document.getElementById("Rt6").innerText);
            var Rate7 = parseInt(document.getElementById("Rt7").innerText);
            var ARR = 0;
            ARR = ((Rate1 + Rate2 + Rate3 + Rate4 + Rate5 + Rate6 + Rate7) / 7).toFixed(2);

            for (var i = 1; i <= 7; i++) {
                for (var i = 1; i <= 7; i++) {
                    var modelVacancy = $scope["V" + i];
                    modelVacancy = 350;
                    for (var j = 1; j <= 7; j++) {
                        for (var k = 1; k <= 7; k++) {
                            var Bookings = $scope["B" + j + k];
                            if (j + k > i && i >= j) {
                                var val = $scope["A" + j + k];
                                if (val) {
                                    modelVacancy = modelVacancy - val;
                                }
                            }
                        }
                    }

                    if (modelVacancy >= 0) {
                        var Rate1 = document.getElementById("Rt1").innerText;
                        var Rate2 = document.getElementById("Rt2").innerText;
                        var Rate3 = document.getElementById("Rt3").innerText;
                        var Rate4 = document.getElementById("Rt4").innerText;
                        var Rate5 = document.getElementById("Rt5").innerText;
                        var Rate6 = document.getElementById("Rt6").innerText;
                        var Rate7 = document.getElementById("Rt7").innerText;
                        $scope["v" + i] = modelVacancy;

                        if (i == 1) {
                            $scope["R" + 1] = (350 - modelVacancy) * Rate1;
                        } else if (i == 2) {
                            $scope["R" + 2] = (350 - modelVacancy) * Rate2;
                        } else if (i == 3) {
                            $scope["R" + 3] = (350 - modelVacancy) * Rate3;
                        } else if (i == 4) {
                            $scope["R" + 4] = (350 - modelVacancy) * Rate4;
                        } else if (i == 5) {
                            $scope["R" + 5] = (350 - modelVacancy) * Rate5;
                        } else if (i == 6) {
                            $scope["R" + 6] = (350 - modelVacancy) * Rate6;
                        } else if (i == 7) {
                            $scope["R" + 7] = (350 - modelVacancy) * Rate7;
                        }
                    } else {
                        $('#myModal').modal('show');
                        document.getElementById('x').innerHTML = 'Wrong input';
                        document.getElementById('y').innerHTML = "Accepted bookings can't be greater than available Vacancies";
                        scope[this.exp] = oldValue;
                    }
                }

            }
            var total = 0;
            var totalOccupancy = 0;
            for (var p = 1; p <= 7; p++) {
                var val = $scope['v' + p] || 350;
                if ($scope['v' + p] == 0) {
                    val = 0;
                }
                var rate = document.getElementById("Rt" + p).innerText;
                totalOccupancy += (350 - val);
                total += (350 - val) * rate;
            }
            $scope['R'] = total;

            var classname = document.getElementsByClassName("submit");

            var myFunction = function() {
                if (($scope['R'])) {
                    $('#myModal2').modal('show');
                    document.getElementById("myARR").innerHTML = ARR;
                    document.getElementById("myOcc").innerHTML = ((totalOccupancy / 1750) * 100).toFixed(2);
                    document.getElementById("myRevPAR").innerHTML = (($scope['R'] / 1750)).toFixed(2);
                } else {
                    $('#myModal').modal('show');
                    document.getElementById("x").innerHTML = 'IDeaS Revenue Optimization';
                    document.getElementById("y").innerHTML = 'Come on you can do better than that. ';
                }
            };

            for (var i = 0; 1 < classname.length; i++) {
                classname[i].addEventListener('click', myFunction, false);
            }
        };
        for (var i = 1; i <= 7; i++) {
            for (var j = 1; j <= 7; j++) {
                var id = "A" + i + j;
                $scope.$watch(id, listener);
            }
        }
    });
