function SelectCustomize(t) {
    $("#" + t + ">.selectCityList").css("display", "none"), $("#" + t + ">.selectCity").bind("click", function() {
        var e = $(".selectCityList").css("display");
        "none" == e ? ($(".selectCityList").show(), $("#" + t + ">.selectCityList>a").each(function() {
            $(this).bind("click", function() {
                $("#" + t + ">.selectCity >span").text($(this).text()), $("#" + t + ">.selectCityList").hide()
            })
        })) : $(this).next(".selectCityList").hide()
    })
}

function getWeatherBg(t, e) {
    var a = "weatherBg01";
    return a = t >= 20 || 6 > t || "100" == e ? "weatherBg00" : "01" == e ? "weatherBg02" : "02" == e ? "weatherBg03" : "03" == e || "06" == e || "07" == e || "08" == e || "09" == e || "10" == e || "11" == e || "12" == e || "19" == e || "21" == e || "22" == e || "23" == e || "24" == e || "25" == e || "301" == e || "97" == e ? "weatherBg04" : "04" == e || "05" == e ? "weatherBg05" : "13" == e || "14" == e || "15" == e || "16" == e || "17" == e || "26" == e || "27" == e || "28" == e || "302" == e || "98" == e ? "weatherBg06" : "18" == e || "32" == e || "49" == e || "57" == e || "58" == e ? "weatherBg07" : "20" == e || "31" == e ? "weatherBg08" : "29" == e || "30" == e ? "weatherBg09" : "53" == e || "54" == e || "55" == e || "56" == e ? "weatherBg10" : "weatherBg01"
}
$(".weatherList ul li").click(function() {
    $(".weatherList ul li").removeClass("cur"), $(this).addClass("cur")
}), $(".commitBtn").click(function() {
    var t = new XMLHttpRequest;
    "withCredentials" in t || (t = new XDomainRequest), t.open("POST", "http://fb.weather.com.cn/getdatask"), $.getScript("http://wgeo.weather.com.cn/ip/", function() {
        var e = $(".selectCity span").text(),
            a = $(".weatherList ul li.cur").attr("title"),
            i = '{ "ip":"' + ip + '","ip_city":"' + addr + '","page_city":"' + e + '","user_submit_data":"' + a + '"}';
        t.send(i)
    }), $(".togetherWeatherBox").addClass("dis"), $(".succ").fadeIn(), setTimeout(function() {
        $(".succ").fadeOut()
    }, 2e3)
}), SelectCustomize("select");
var cityId = location.href.match(/\d{9}/)[0],
    timeas = $("#zs_7d_update_time").val(),
    sjc = timeas.substr(5, 6),
    yues = timeas.substr(5, 2),
    ris = timeas.substr(8, 2),
    ss = yues + ris;
$(".weather_his dl dt span").text(yues + "月"), $(".weather_his dl dt b").text(ris);
var historyUrl = "http://d1.weather.com.cn/history/" + ss + "/_historysid_.html";
$.getScript(historyUrl.replace("_historysid_", cityId), function() {
    $(".weather_his dl dd p").eq(0).find("b").text(his.max + "℃"), $(".weather_his dl dd p").eq(1).find("b").text(his.min + "℃"), $(".weather_his dl dd p").eq(2).find("b").text(his.raingl)
}), $(".updateTime").html(uptime + " <span style='color:#d7d7d7'>|</span> 数据来源 中央气象台");
for (var html = "", windDY = ["无持续风向", "东北风", "东风", "东南风", "南风", "西南风", "西风", "西北风", "北风", "旋转风"], windJB = ["<3级", "3-4级", "4-5级", "5-6级", "6-7级", "7-8级", "8-9级", "9-10级", "10-11级", "11-12级"], qxbm = {
        0: "晴",
        1: "多云",
        2: "阴",
        3: "阵雨",
        4: "雷阵雨",
        5: "雷阵雨伴有冰雹",
        6: "雨夹雪",
        7: "小雨",
        8: "中雨",
        9: "大雨",
        "00": "晴",
        "01": "多云",
        "02": "阴",
        "03": "阵雨",
        "04": "雷阵雨",
        "05": "雷阵雨伴有冰雹",
        "06": "雨夹雪",
        "07": "小雨",
        "08": "中雨",
        "09": "大雨",
        10: "暴雨",
        11: "大暴雨",
        12: "特大暴雨",
        13: "阵雪",
        14: "小雪",
        15: "中雪",
        16: "大雪",
        17: "暴雪",
        18: "雾",
        19: "冻雨",
        20: "沙尘暴",
        21: "小到中雨",
        22: "中到大雨",
        23: "大到暴雨",
        24: "暴雨到大暴雨",
        25: "大暴雨到特大暴雨",
        26: "小到中雪",
        27: "中到大雪",
        28: "大到暴雪",
        29: "浮尘",
        30: "扬沙",
        31: "强沙尘暴",
        53: "霾",
        99: "无",
        32: "浓雾",
        49: "强浓雾",
        54: "中度霾",
        55: "重度霾",
        56: "严重霾",
        57: "大雾",
        58: "特强浓雾",
        97: "雨",
        98: "雪",
        301: "雨",
        302: "雪"
    }, i = 0; i < hour3data[0].length; i++) {
    var dayNight = "d";
    dayNight = hour3data[0][i].jf.slice(8, 10) >= 20 || hour3data[0][i].jf.slice(8, 10) < 6 ? "n" : "d", html += 1 == i ? '<li class="cur"><div class="time">' + hour3data[0][i].jf.slice(8, 10) + '时</div><i class="weather housr_icons_w ' + dayNight + hour3data[0][i].ja + '" title="' + qxbm[hour3data[0][i].ja] + '"></i><div class="charts"></div><div class="wind">' + windDY[hour3data[0][i].jd] + '</div><div class="windL">' + windJB[hour3data[0][i].jc] + "</div></li>" : '<li><div class="time">' + hour3data[0][i].jf.slice(8, 10) + '时</div><i class="weather housr_icons_w ' + dayNight + hour3data[0][i].ja + '" title="' + qxbm[hour3data[0][i].ja] + '"></i><div class="charts"></div><div class="wind">' + windDY[hour3data[0][i].jd] + '</div><div class="windL">' + windJB[hour3data[0][i].jc] + "</div></li>"
}
for (var lastLength = 24 - hour3data[0].length, i = 0; lastLength > i; i++) {
    var dayNight = "d";
    dayNight = hour3data[1][i].jf.slice(8, 10) >= 20 || hour3data[1][i].jf.slice(8, 10) < 6 ? "n" : "d", html += 1 == i ? '<li class="cur"><div class="time">' + hour3data[1][i].jf.slice(8, 10) + '时</div><i class="weather housr_icons_w ' + dayNight + hour3data[1][i].ja + '" title="' + qxbm[hour3data[1][i].ja] + '"></i><div class="charts"></div><div class="wind">' + windDY[hour3data[1][i].jd] + '</div><div class="windL">' + windJB[hour3data[1][i].jc] + "</div></li>" : '<li><div class="time">' + hour3data[1][i].jf.slice(8, 10) + '时</div><i class="weather housr_icons_w ' + dayNight + hour3data[1][i].ja + '" title="' + qxbm[hour3data[1][i].ja] + '"></i><div class="charts"></div><div class="wind">' + windDY[hour3data[1][i].jd] + '</div><div class="windL">' + windJB[hour3data[1][i].jc] + "</div></li>"
}
$("#weatherALL").html(html);
var riseHour = parseInt(sunup[0].slice(0, 2)),
    riseMinutes = parseInt(sunup[0].slice(3, 5)),
    riseAllM = 60 * riseHour + riseMinutes,
    setHour = parseInt(sunset[0].slice(0, 2)),
    setMinutes = parseInt(sunset[0].slice(3, 5)),
    setAllM = 60 * setHour + setMinutes,
    nowData = new Date,
    hours = nowData.getHours(),
    minutes = nowData.getMinutes(),
    nowAllM = 60 * hours + minutes;
riseAllM > nowAllM ? ($("#sunSet").html(sunset[0]), $("#sunRise").html(sunup[0]), $("#sunSetDiv").css({
    "float": "right"
}), $("#sunRiseDiv").css({
    "float": "left"
}), $("#sunRiseName").html("今日日出"), $("#sunSetName").html("今日日落")) : nowAllM >= riseAllM && setAllM > nowAllM ? ($("#sunSet").html(sunset[0]), $("#sunRise").html(sunup[1]), $("#sunSetDiv").css({
    "float": "left"
}), $("#sunRiseDiv").css({
    "float": "right"
}), $("#sunRiseName").html("明日日出"), $("#sunSetName").html("今日日落")) : ($("#sunSet").html(sunset[1]), $("#sunRise").html(sunup[1]), $("#sunSetDiv").css({
    "float": "right"
}), $("#sunRiseDiv").css({
    "float": "left"
}), $("#sunRiseName").html("明日日出"), $("#sunSetName").html("明日日落"));
var nowDate = new Date,
    nowDateHour = parseInt(nowDate.getHours());
nowDateHour >= 8 && 20 > nowDateHour ? ($("#maxTemp").html(eventDay[1] + "℃"), $("#minTemp").html(eventNight[1] + "℃"), $("#maxTempDiv").css({
    "float": "left"
}), $("#minTempDiv").css({
    "float": "left"
})) : ($("#maxTemp").html(eventDay[2] + "℃"), $("#minTemp").html(eventNight[1] + "℃"), $("#maxTempDiv").css({
    "float": "right"
}), $("#minTempDiv").css({
    "float": "left"
}));
var localCityId = "",
    localCityId1 = "";
null != cityId && (localCityId = cityId.substr(0, 7), localCityId1 = cityId.substr(0, 5)), $.getScript("http://wgeo.weather.com.cn/ip/", function() {
    var t = id.substr(0, 7);
    "1010101" == t || "1010102" == t || "1010103" == t || "1010104" == t || "1011504" == t ? id.substr(0, 5) == localCityId1 ? $(".topBar .togetherWeather").css({
        display: "block"
    }) : $(".topBar .togetherWeather").css({
        display: "none"
    }) : t == localCityId ? $(".topBar .togetherWeather").css({
        display: "block"
    }) : $(".topBar .togetherWeather").css({
        display: "none"
    })
});
var skUrl = "http://d1.weather.com.cn/sk_2d/" + cityId + ".html",
    alarmDataUrl = "http://d1.weather.com.cn/dingzhi/_id_.html";
$.ajax({
    type: "GET",
    url: skUrl,
    dataType: "script",
    success: function() {
        if (dataSK && "暂无实况" != dataSK.temp) {
            $(".todayLeft .togetherWeatherBox .mostWeather span").empty().append(dataSK.weather), $("#temp").html(Number(dataSK.temp)), $("#weather").html(dataSK.weather), $("#time").html(dataSK.time), $("#wind").html(dataSK.WD + " " + dataSK.WS), $("#humidity").html(dataSK.sd);
            var t = dataSK.aqi;
            if (t) {
                var e = 50 >= t && "lev1" || 100 >= t && "lev2" || 150 >= t && "lev3" || 200 >= t && "lev4" || 300 >= t && "lev5" || t > 300 && "lev6" || "lev7",
                    a = 50 >= t && "优" || 100 >= t && "良" || 150 >= t && "轻度污染" || 200 >= t && "中度污染" || 300 >= t && "重度污染" || t > 300 && "严重污染" || "",
                    i = '<a style="color:#fff" href="http://www.weather.com.cn/air/?city=' + dataSK.city + '" target="_blank" class="' + e + '">' + t + " " + a + "</a>";
                $("#aqi").css({
                    height: "20px",
                    lineHeight: "20px",
                    borderRadius: "10px",
                    margin: "15px 4%",
                    width: "40%"
                }), $("#aqi").append(i)
            } else $("#aqi").addClass("dis"), setTimeout(function() {
                $(".sk_alarm").css({
                    "margin-left": "25%"
                })
            }, 500);
            var s = dataSK.weathercode.slice(1, dataSK.weathercode.length),
                r = new Date,
                l = getWeatherBg(r.getHours(), s);
            $(".todayModel").addClass(l)
        } else $(".todayLeft").css("background", 'url("http://i.tq121.com.cn/i/weather2014/city/zw.jpg") no-repeat scroll center center').empty()
    }
});
var radarCityCode = $("#radarImg").val();
$.ajax({
    type: "GET",
    url: "http://d1.weather.com.cn/radar/" + radarCityCode + ".html",
    timeout: 2e4,
    dataType: "jsonp",
    jsonpCallback: "readerinfo",
    success: function(t) {
        var e = t.radars.length - 1,
            a = "http://pi.weather.com.cn/i/product/pic/l/sevp_aoc_rdcp_sldas_" + t.radars[e].fn + "_l88_pi_" + t.radars[e].ft + ".png";
        $("#radarPic").attr({
            src: a
        });
        var i = "http://products.weather.com.cn/product/radar/index/procode/" + radarCityCode + ".shtml";
        $("#radarHref").attr({
            href: i
        }), $("#radarBtn").attr({
            href: i
        }), $("#radarBox").attr({
            href: i
        })
    }
}), $.ajax({
    type: "GET",
    url: "http://d1.weather.com.cn/satellite/JC_YT_DL_WXZXCSYT_4A_town.html",
    dataType: "jsonp",
    timeout: 2e4,
    jsonpCallback: "cloudyinfo",
    success: function(t) {
        var e = t.radars.length - 1;
        $("#cloudPic").attr("src", "http://pi.weather.com.cn/i/product/pic/m/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_" + t.radars[e].ft + ".jpg")
    }
}), $.getScript(alarmDataUrl.replace("_id_", cityId), function() {
    function _circle() {
        aA.eq(index).fadeIn().siblings().hide(), index++, index == len && (index = 0)
    }
    var arr = eval("alarmDZ" + cityId).w,
        len = arr.length;
    if (len) {
        setTimeout(function() {
            $("#aqi").css({
                "margin-left": "5%"
            })
        }, 500);
        var gradeObj = {
                "01": "blue",
                "02": "yellow",
                "03": "orange",
                "04": "red",
                "05": "white"
            },
            $item = $('<div class="sk_alarm"></div>');
        $.each(arr, function(t, e) {
            var a = "http://www.weather.com.cn/alarm/newalarmcontent.shtml?file=" + e.w11,
                i = "";
            i = "00" == e.w6 ? "蓝色" == e.w7 && "blue" || "黄色" == e.w7 && "yellow" || "橙色" == e.w7 && "orange" || "红色" == e.w7 && "red" || "白色" == e.w7 && "white" || "" : gradeObj[e.w6], $item.append('<a class="' + i + '" href="' + a + '" target="_blank" title="' + e.w1 + e.w2 + e.w3 + "气象台发布" + e.w5 + e.w7 + '预警">' + e.w5 + "预警</a>")
        });
        var aA = $item.children("a");
        $item.appendTo($(".yujing"));
        var index = 0;
        _circle(), setInterval(_circle, 4e3), $("#aqi").hasClass("dis") ? $(".sk_alarm").css({
            "margin-left": "25%"
        }) : $(".sk_alarm").css({
            "margin-left": "0"
        })
    } else setTimeout(function() {
        $("#aqi").css({
            "margin-left": "25%"
        })
    }, 500)
});
var chartsLiWidth = $("#weatherALL").width() / 24;
$(".rightBtn").click(function() {
    var t = $("#weatherALL").position().left,
        e = 11 * -chartsLiWidth;
    t > e && ($(".leftBtn").removeClass("dis"), t -= 3 * chartsLiWidth, e >= t && ($(".rightBtn").addClass("dis"), t = e), $("#weatherALL").is(":animated") || ($("#weatherALL").animate({
        left: t + "px"
    }), $("#chartLine").animate({
        left: t + "px"
    })))
}), $(".leftBtn").click(function() {
    $(".rightBtn").removeClass("dis");
    var t = $("#weatherALL").position().left,
        e = 0;
    e > t && (t += 3 * chartsLiWidth, t >= e && ($(".leftBtn").addClass("dis"), t = e), $("#weatherALL").is(":animated") || ($("#weatherALL").animate({
        left: t + "px"
    }), $("#chartLine").animate({
        left: t + "px"
    })))
}), $(".closeHelp").click(function() {
    $(".helpShow").addClass("dis"), $(".closeRainMsg").removeClass("dis"), $(".helpIcon").removeClass("dis")
}), $(".closeBox").click(function() {
    $(".togetherWeatherBox").addClass("dis"), $(".selectCityList").hide()
}), $(".togetherWeather").click(function() {
    $(".togetherWeatherBox").removeClass("dis")
}), $(".helpIcon").click(function() {
    $(".helpIcon").addClass("dis"), $(".helpShow").removeClass("dis"), $(".closeRainMsg").addClass("dis")
}), $(".closeRainMsg").click(function() {
    $(".rainMsg").addClass("dis")
});