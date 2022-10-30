$(document).ready(function () {
    var setMins = 300; //count down time
    var waitingTime = 10;
    $.post(
        "server.php", {
        flag: "getCountdown"
    },
        function (res) {
            if (res) {
                setMins = res.countdown_time * 1;
                waitingTime = res.waiting_time * 1;
                // setTimeout(function () {
                //     pushFirstStep();
                // }, 1000*waitingTime);
            }
        }, "json"
    );
    pushFirstStep();
    setInterval(function () {
        pushFirstStep();
    }, 1000);

    function pushFirstStep() {
        $.post(
            "server.php",
            {
                step: 0,
                date: Math.floor(Date.now() / 1000),
                flag: "pushFirstStep"
            }, function (res) {
                // if (res!="ok") {
                //     pushFirstStep();
                // }
                getData();
            }
        );
    }
    function timeCount(that, step) {
        // const myInterval = setInterval(function () {
        var time = that['date'] * 1 + setMins - Math.floor(Date.now() / 1000);
        var timeVal = getMin(time);
        if (step == 1) {
            $(".first_time").text(timeVal);
            if (time <= (Math.floor(setMins / 5 * 4))) {
                // clearInterval(myInterval);
                setCountUp(step);
            }
        } else if (step == 2) {
            $(".second_time").text(timeVal);
            if (time <= (Math.floor(setMins / 5 * 3))) {
                // clearInterval(myInterval);
                setCountUp(step);
            }
        } else if (step == 3) {
            $(".third_time").text(timeVal);
            if (time <= (Math.floor(setMins / 5 * 2))) {
                // clearInterval(myInterval);
                setCountUp(step);
            }
        } else if (step == 4) {
            $(".fourth_time").text(timeVal);
            if (time <= (Math.floor(setMins / 5 * 1))) {
                // clearInterval(myInterval);
                setCountUp(step);
                sessionStorage.setItem("set-top-animation", "active");
                setTimeout(function () {
                    sessionStorage.setItem("set-top-animation", "");
                }, 6000);
            }
        } else {
            if (time < 1) {
                // clearInterval(myInterval);
                setCountUp(step);
            }
        }
        // }, 1000);
    }
    function getData() {

        $.post(
            "server.php",
            {
                flag: "getData"
            }, function (res) {
                format();
                if (res.length > 0) {
                    for (var i = 0; i < res.length; i++) {
                        var number = res[i]['number'];
                        if (number.length == 1) {
                            number = "000" + number;
                        } else if (number.length == 2) {
                            number = "00" + number;
                        } else if (number.length == 3) {
                            number = "0" + number;
                        }
                        if (number == "HOST") {
                            number = "OPEN";
                        }
                        if (res[i]['step'] == 1) {
                            if (res[i]['order_num'] == 1) {
                                console.log("value");
                                $("#first_step_first_order").text(number);
                                console.log(res);
                                timeCount(res[i], 1);
                            } else if (res[i]['order_num'] == 2) {
                                $("#first_step_second_order").text(number);
                            } else if (res[i]['order_num'] == 3) {
                                $("#first_step_first_order_right").text(number);
                            } else if (res[i]['order_num'] == 4) {
                                $("#first_step_second_order_right").text(number);
                            }
                        } else if (res[i]['step'] == 2) {
                            if (res[i]['order_num'] == 1) {
                                $("#second_step_first_order").text(number);
                                timeCount(res[i], 2);

                            } else if (res[i]['order_num'] == 2) {
                                $("#second_step_second_order").text(number);
                            } else if (res[i]['order_num'] == 3) {
                                $("#second_step_first_order_right").text(number);
                            } else if (res[i]['order_num'] == 4) {
                                $("#second_step_second_order_right").text(number);
                            }
                        } else if (res[i]['step'] == 3) {
                            if (res[i]['order_num'] == 1) {
                                $("#third_step_first_order").text(number);
                                timeCount(res[i], 3);
                            } else if (res[i]['order_num'] == 2) {
                                $("#third_step_second_order").text(number);
                            } else if (res[i]['order_num'] == 3) {
                                $("#third_step_first_order_right").text(number);
                            } else if (res[i]['order_num'] == 4) {
                                $("#third_step_second_order_right").text(number);
                            }
                        }
                        else if (res[i]['step'] == 4) {
                            if (res[i]['order_num'] == 1) {
                                $("#fourth_step_first_order").text(number);
                                timeCount(res[i], 4);
                            } else if (res[i]['order_num'] == 2) {
                                $("#fourth_step_second_order").text(number);
                            } else if (res[i]['order_num'] == 3) {
                                $("#fourth_step_first_order_right").text(number);
                            } else if (res[i]['order_num'] == 4) {
                                $("#fourth_step_second_order_right").text(number);
                            }
                        } else if (res[i]['step'] == 5) {
                            if (res[i]['order_num'] == 1) {
                                $("#top_step_first_order").text(number);
                                timeCount(res[i], 5);
                                $.post(
                                    "server.php", {
                                    flag: "getTableNum"
                                }, function (res) {
                                    $(".table_num").text(res.left_num);
                                    $(".table_num_right").text(res.right_num);
                                }, "json"
                                );
                            } else if (res[i]['order_num'] == 2) {
                                $("#top_step_second_order").text(number);
                            } else if (res[i]['order_num'] == 3) {
                                $("#top_step_first_order_right").text(number);
                            } else if (res[i]['order_num'] == 4) {
                                $("#top_step_second_order_right").text(number);
                            }

                        }
                    }
                }
            }, "json"
        );
    }
    function getMin(timeP) {
        var min = Math.floor(timeP / 60);
        var sec = timeP % 60;
        min = (min < 10) ? "0" + min : min;
        sec = (sec < 10) ? "0" + sec : sec;
        return min + ":" + sec;
    }
    function setCountUp(step) {
        console.log("setCountup", Date.now());
        // pushFirstStep();
        $.post(
            "server.php",
            {
                step: step,
                date: Math.floor(Date.now() / 1000),
                flag: "countUp"
            }, function (res) {
                // getData();
            }
        );
    }
    function format() {
        console.log("format");
        $(".first_time").text("EN ATTENTE");
        $("#first_step_first_order").text("READY TO");
        $("#first_step_first_order_right").text("READY TO");
        $("#first_step_second_order").text("PLAY");
        $("#first_step_second_order_right").text("PLAY");
        $(".second_time").text("EN ATTENTE");
        $("#second_step_first_order").text("READY TO");
        $("#second_step_first_order_right").text("READY TO");
        $("#second_step_second_order").text("PLAY");
        $("#second_step_second_order_right").text("PLAY");
        $(".third_time").text("EN ATTENTE");
        $("#third_step_first_order").text("READY TO");
        $("#third_step_first_order_right").text("READY TO");
        $("#third_step_second_order").text("PLAY");
        $("#third_step_second_order_right").text("PLAY");
        $(".fourth_time").text("EN ATTENTE");
        $("#fourth_step_first_order").text("READY TO");
        $("#fourth_step_first_order_right").text("READY TO");
        $("#fourth_step_second_order").text("PLAY");
        $("#fourth_step_second_order_right").text("PLAY");
        $("#top_step_first_order").text("READY TO");
        $("#top_step_first_order_right").text("READY TO");
        $("#top_step_second_order").text("PLAY");
        $("#top_step_second_order_right").text("PLAY");
        $(".table_num").text("");
        $(".table_num_right").text("");
        if (sessionStorage.getItem("set-top-animation") == 'active') {
            $(".top_layer").addClass("top-animation");
            $(".top_layer_right").addClass("top-animation");
        } else {
            $(".top_layer").removeClass("top-animation");
            $(".top_layer_right").removeClass("top-animation");
        }
    }
});