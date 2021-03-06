//fetching data from data.json and populating them in html
$(function() {
    $("modal").on("show", function() {
        $("body").addClass("modal-open");
    }).on("hidden", function() {
        $("body").removeClass("modal-open")
    });

    var objs = {};
    var rand = Math.floor(Math.random() * 2);
    $.ajaxSetup({
        async: false
    });
    $.getJSON("/js/data.json", function(dataset) {
        objs = dataset["objs"];
        $('td>span').each(
            function(index, value) {

                var ob = objs[rand];
                var id = $(this).attr('id');
                if (objs[rand][id]) {
                    $(this).text(objs[rand][id]);
                }
            }
        )
        for (var i = 1; i <= 7; i++) {
            for (var j = 1; j <= 7; j++) {
                var idOfTag = "#B" + i + j;
                var idOfVal = "F" + i + j;
                var idOfForecast = "#F" + i + j;
                var idOfAccept = "A" + i + j;
                $(idOfTag).text(objs[rand][idOfVal]);
                if (objs[rand][idOfVal] != 0) {
                    $(idOfForecast).text(objs[rand][idOfVal]);
                }

            }
        }
    });

    //hiding days having no forecast
    var obj = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    var isHidden = false;
    var isVisible = false;
    var idOfLastVisible = "";
    var all = new Array();
    var cnt = 1;
    for (var i = 1; i <= 7; i++) {
        var x = 0;
        var y = 0;
        for (var j = 1; j <= 7; j++) {
            var idOfVal = "F" + i + j;
            var p = document.getElementById(idOfVal).innerText;
            x = parseInt(p);
            if (isNaN(x)) {
                x = 0;
            }
            y = y + x;
        }
        if (y == 0) {
            var o = i + 1;
            $('#forecast1 td:nth-child(' + o + '),#forecast1 th:nth-child(' + o + ')').hide();
            $('#demo li:nth-child(' + i + ')').hide();
            $("#" + obj[i - 1]).hide();
        } else {
            if (!isHidden) {
                isHidden = true;
                $("#play").attr('href', ("#" + obj[i - 1]));
            }
        }
        var currentID = "#" + obj[i - 1];
        if (($("#" + obj[i - 1]).is(':visible'))) {
            $("#p" + (i - 1)).attr("href", "#" + obj[idOfLastVisible - 1]);
            $("#n" + idOfLastVisible).attr("href", "#" + obj[i - 1]);
            idOfLastVisible = i;
            all[cnt - 1] = idOfLastVisible - 1;
            cnt++;
        }
    }
    $("#n" + idOfLastVisible).attr("disabled", "enabled");
    $("#p" + all[0]).attr("disabled", "enabled");

    //displaying result on Modal
    document.getElementById("fetchResult").addEventListener("click", function() {
        var x = document.getElementById('Revenue').innerText;
        totalRev = parseInt(x);
        $('#myModal3').modal('show');
        var myOcc = document.getElementById("myOcc").innerHTML;
        var myRevPAR = document.getElementById("myRevPAR").innerHTML;
        var Occ = objs[rand]["Occ"];
        var revPAR = objs[rand]["RevPAR"];
        document.getElementById("myARR1").innerHTML = objs[rand]["myARR"];
        document.getElementById("myOcc1").innerHTML = document.getElementById("myOcc").innerHTML;
        document.getElementById("myRevPAR1").innerHTML = ((totalRev) / 1750).toFixed(2);
        document.getElementById("ARR").innerHTML = objs[rand]["myARR"];
        document.getElementById('Result').innerHTML = "";
        if (myOcc == Occ && myRevPAR == revPAR) {
            document.getElementById('Result').innerHTML = "Congrats!! Maximum yield achieved";
            document.getElementById('tryAgain').style.visibility = 'hidden';
            document.getElementById("next").addEventListener("click", function() {
                $('#lastModal').modal('show');
            });

        } else {
            document.getElementById('Result').innerHTML = "Try again for better yield";
            document.getElementById('tryAgain').style.visibility = 'visible';
            document.getElementById("next").addEventListener("click", function() {
                $('#lastModal').modal('show');
            });
            document.getElementById('tryAgain').addEventListener("click", function() {
                window.location.href = "#" + obj[(all[0])];
                $("#mymodal3").modal('hide');
            });

        }
    });

    document.getElementById("next").addEventListener("click", function() {
        $('#lastModal').modal('show');
    });
});

$('#myModal').on('shown', function() {
    $(document).off('focusin.modal');
});

document.getElementById('gRt1').innerHTML = '80$';
document.getElementById('gRt2').innerHTML = '80$';
document.getElementById('gRt3').innerHTML = '80$';
document.getElementById('gRt4').innerHTML = '80$';
document.getElementById('gRt5').innerHTML = '80$';
document.getElementById('gRt6').innerHTML = '80$';
document.getElementById('gRt7').innerHTML = '80$';

$(document).ready(function() {
    $(".dropdown-toggle").dropdown();
});

$(document).ready(function() {
    $('.modal').on('show.bs.modal', function() {
        if ($(document).height() > $(window).height()) {
            $('body').addClass("modal-open-noscroll");
        } else {
            $('body').removeClass("modal-open-noscroll");
        }
    })
    $('.modal').on('hide.bs.modal', function() {
        $('body').removeClass("modal-open-noscroll");
    })
})
