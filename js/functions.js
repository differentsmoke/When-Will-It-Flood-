// JavaScript Document

function loadArray(xml) {
    "use strict";
    var x,
        i,
        xmlDoc,
        dayold,
        dayminder,
        stationname,
        dateme,
        dayme,
        monthme,
        timey,
        tidy,
        today,
        todayMonthNum;
    today = new Date();
    todayMonthNum = today.getMonth();
    dayold = "1";
    dayminder = 0;
    xmlDoc = xml.responseXML;

    stationname = xmlDoc.getElementsByTagName("stationname")[0].textContent;
    
    document.getElementById("station").innerHTML = stationname;

    var months = [[], [], [], [], [], [], [], [], [], [], [], []];

    x = xmlDoc.getElementsByTagName("item");

    for (i = 0; i < x.length; i = i + 1) {
        dateme = new Date(
            x[i].getElementsByTagName("date")[0].childNodes[0].nodeValue
        );
        dayme = dateme.getDate();
        monthme = dateme.getMonth();
        timey = x[i].getElementsByTagName("time")[0].childNodes[0].nodeValue;
        tidy = x[i].getElementsByTagName("highlow")[0].childNodes[0].nodeValue;
        var daynew = dayme;

        if (monthme >= todayMonthNum) {
            var month = months[monthme];
            if (tidy.includes("H")) {
                if (dayold === daynew) {
                    if (dayminder === 0) {
                        month.push(dayme);
                        month.push(timey);
                        month.push(
                            x[i].getElementsByTagName("pred_in_ft")[0]
                                .childNodes[0].nodeValue
                        );
                        dayminder = dayminder + 1;
                    } else if (dayminder > 0) {
                        month.push(timey);
                        month.push(
                            x[i].getElementsByTagName("pred_in_ft")[0]
                                .childNodes[0].nodeValue
                        );
                        dayminder = dayminder + 1;
                    }
                } else if (dayold !== daynew) {
                    month.push(dayme);
                    month.push(timey);
                    month.push(
                        x[i].getElementsByTagName("pred_in_ft")[0].childNodes[0]
                            .nodeValue
                    );
                    dayold = daynew;
                    dayminder = dayminder + 1;
                }
            }
        }
    }

    loadUpTheMonths(months);
}

function loadUpTheMonths(months) {
    var monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    months.forEach(function(month, i) {
        if (month.length > 0) {
            var longName = monthNames[i];
            var shortName = longName.toLowerCase().substr(0, 3);
            document.getElementById(shortName).style.display = "block";
            drawMonth(month, longName + " 2017", shortName);
        }
    });
}

function drawMonth(theMonth, monthtext, monthy) {
    "use strict";
    var isEmpty = document.getElementById(monthy).innerHTML === "";

    if (isEmpty === false) {
        document.getElementById(monthy).innerHTML = "";
    }

    document
        .getElementById(monthy)
        .insertAdjacentHTML("beforeEnd", "<h2>" + monthtext + "</h2>");

    var mlength = theMonth.length;

    var z = 0;
    for (i = 0; i < mlength; i = i + z) {
        //loop the length of the array

        if (theMonth[i + 2] >= king) {
            //if the depth of first is greater than king
            if (theMonth[i + 3].length > 6 && theMonth[i + 4] < king) {
                //if there are 2 and the 2nd is less than king then do tide1
                document
                    .getElementById(monthy)
                    .insertAdjacentHTML(
                        "beforeEnd",
                        '<div class="tide1"> <a href = "#" title ="' +
                            theMonth[i + 1] +
                            " " +
                            theMonth[i + 2] +
                            "ft" +
                            " & " +
                            theMonth[i + 3] +
                            " " +
                            theMonth[i + 4] +
                            'ft" class="masterTooltip"> <h3>' +
                            theMonth[i] +
                            "</h3> </a> </div>"
                    );
                z = 5;
            } else if (theMonth[i + 3].length > 6 && theMonth[i + 4] >= king) {
                //if there are 2 and the 2nd is >king then do tide2
                document
                    .getElementById(monthy)
                    .insertAdjacentHTML(
                        "beforeEnd",
                        '<div class="tide2"><a href = "#" title ="' +
                            theMonth[i + 1] +
                            " " +
                            theMonth[i + 2] +
                            "ft" +
                            " & " +
                            theMonth[i + 3] +
                            " " +
                            theMonth[i + 4] +
                            'ft" class="masterTooltip"><h3>' +
                            theMonth[i] +
                            "</h3> </a> </div>"
                    );
                z = 5;
            } else {
                //if only 1 then do tide1
                document
                    .getElementById(monthy)
                    .insertAdjacentHTML(
                        "beforeEnd",
                        '<div class="tide1"><a href = "#" title ="' +
                            theMonth[i + 1] +
                            " " +
                            theMonth[i + 2] +
                            'ft" class="masterTooltip"> <h3>' +
                            theMonth[i] +
                            "</h3> </a> </div>"
                    );
                z = 3;
            }
        } else if (theMonth[i + 2] < king && theMonth[i + 3].length > 6) {
            //if there are 2 and the first is less than king

            if (theMonth[i + 4] >= king) {
                //if the second is greater than king do tide1
                document
                    .getElementById(monthy)
                    .insertAdjacentHTML(
                        "beforeEnd",
                        '<div class="tide1"><a href = "#" title ="' +
                            theMonth[i + 1] +
                            " " +
                            theMonth[i + 2] +
                            "ft" +
                            " & " +
                            theMonth[i + 3] +
                            " " +
                            theMonth[i + 4] +
                            'ft" class="masterTooltip"><h3>' +
                            theMonth[i] +
                            "</h3> </a> </div>"
                    );
                z = 5;
            } else if (theMonth[i + 4] < king) {
                //if the seond is less than king do plain
                document
                    .getElementById(monthy)
                    .insertAdjacentHTML(
                        "beforeEnd",
                        '<div class="plain"><a href = "#" title ="' +
                            theMonth[i + 1] +
                            " " +
                            theMonth[i + 2] +
                            "ft" +
                            " & " +
                            theMonth[i + 3] +
                            " " +
                            theMonth[i + 4] +
                            'ft" class="masterTooltip"><h3>' +
                            theMonth[i] +
                            "</h3> </div>"
                    );
                z = 5;
            }
        } else {
            //otherwise do plain
            document
                .getElementById(monthy)
                .insertAdjacentHTML(
                    "beforeEnd",
                    '<div class="plain"><a href = "#" title ="' +
                        theMonth[i + 1] +
                        " " +
                        theMonth[i + 2] +
                        ' ft" class="masterTooltip"><h3>' +
                        theMonth[i] +
                        "</h3></div>"
                );
            z = 3;
        }
    }
    $(".masterTooltip")
        .hover(
            function() {
                // Hover over code
                var title = $(this).attr("title");
                $(this).data("tipText", title).removeAttr("title");
                $('<p class="tooltip"></p>')
                    .text(title)
                    .appendTo("body")
                    .fadeIn("slow");
            },
            function() {
                // Hover out code
                $(this).attr("title", $(this).data("tipText"));
                $(".tooltip").remove();
            }
        )
        .mousemove(function(e) {
            var mousex = e.pageX + 20; //Get X coordinates
            var mousey = e.pageY + 10; //Get Y coordinates
            $(".tooltip").css({ top: mousey, left: mousex });
        });
}
