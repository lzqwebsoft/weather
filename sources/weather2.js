function setAirData(t) {
    function a(t) {
        for (var a = 0,
            i = t.length - 1; i >= 0; i--) a += Number(t[i]);
        return Math.floor(10 * a) / 10
    }
    function i(t) {
        for (var a = t,
            i = a.length - 1;
            "" == a[i] && i > 0;)--i;
        return a[i]
    }
    function e(t) {
        return t.length == p
    }
    var r = '<div class="tabs"><h2>整点天气实况</h2><p id="currHour"></p><p class="second"><b id="detailHour"></b></p><ul><li class="aqi_on on" data-role="air">空气质量</li><li class="p2" data-role="tem">温度</li><li class="sd" data-role="humidity">相对湿度</li><li class="js" data-role="rain">降水量</li><li class="fl" data-role="wind">风力风向</li></ul></div><div class="split"></div><div class="chart"><div id="hourHolder"><div class="xLabel"></div><div class="yLabel"></div><div class="result"></div><div class="showData"></div></div><em>(h)</em><b id="wd"></b> <b id="tem">℃</b> <b id="pm10">(μg/m³)</b> <b id="sd">(%)</b> <b id="js">(mm)</b> <b id="fl">(级)</b><p class="air detail">空气质量指数：简称AQI，是定量描述空气质量状况的无量纲指数。（数据由生态环境部提供）</p><p class="humidity">相对湿度：空气中实际水汽压与当时气温下的饱和水汽压之比，以百分比（%）表示。</p><p class="pm10 tem">温度：表示大气冷热程度的物理量，气象上给出的温度是指离地面1.5米高度上百叶箱中的空气温度。</p><p class="rain">降水量：某一时段内的未经蒸发、渗透、流失的降水，在水平面上积累的深度，以毫米（mm）为单位。 </p><p class="wind">风力风向：空气的水平运动，风力是风吹到物体上所表示出力量的大小，风向指风的来向。</p><div class="aqiColorExp clearfix"><span class="span1">优</span> <span class="span2">良</span> <span class="span3">轻度</span> <span class="span4">中度</span> <span class="span5">重度</span> <span class="span6">严重</span></div>',
        s = $("#weatherChart").html(r);
    Raphael.fn.drawGrid = function (t, a, i, e, r, s) {
        s = s || "#000";
        for (var n = ["M", Math.round(t) + .5, Math.round(a) + .5, "L", Math.round(t + i) + .5, Math.round(a) + .5], h = e / r, l = 1; r >= l; l++) n = n.concat(["M", Math.round(t) + .5, Math.round(a + l * h) + .5, "H", Math.round(t + i) + .5]);
        return this.path(n.join(",")).attr({
            stroke: s,
            fill: "#fff"
        })
    },
        Raphael.fn.polygon = function (t, a, i) {
            var e = ["M", t, a, "L", t - i * Math.sin(15), a + Math.sin(15) * i * Math.sqrt(3), t, a - 2 * i * Math.sin(15), t + i * Math.sin(15), a + Math.sin(15) * i * Math.sqrt(3), "z"];
            return this.path(e.join(","))
        };
    var n = 6,
        h = null,
        l = function (t, a) {
            return "" == t || "null" == t || a && 0 == t
        },
        d = {
            length: 0,
            date: [],
            air: [],
            airSum: 0,
            tem: [],
            temSum: 0,
            humidity: [],
            humiditySum: 0,
            rain: [],
            rainSum: 0,
            windLevel: [],
            windAngle: [],
            windDirection: [],
            windSum: 0,
            flagData: {
                air: {
                    max: 0,
                    min: 0
                },
                tem: {
                    max: 0,
                    min: 0
                },
                humidity: {
                    max: 0,
                    min: 0
                },
                rain: {
                    max: 0,
                    min: 0
                },
                wind: {
                    max: 0,
                    min: 0
                }
            },
            min: {
                air: 0,
                tem: 0,
                humidity: 0,
                rain: 0,
                wind: 0
            },
            max: {
                air: 0,
                tem: 90,
                humidity: 0,
                rain: 0,
                wind: 12
            },
            step: {
                air: 0,
                tem: 1,
                humidity: 1,
                rain: 1,
                wind: 2
            },
            invalid: {
                air: [],
                tem: [],
                humidity: [],
                rain: [],
                wind: []
            },
            init: function (t) {
                function a(t) {
                    for (var a = -99,
                        i = 0; i < t.length; i++) t[i] && Number(t[i]) > a && (a = t[i]);
                    return a
                }
                var i = t.od.od2;
                this.length = 25;
                for (var e = this.length - 1; e >= 0; e--) {
                    var r = i[e];
                    this.date.push(r.od21),
                        l(r.od28) && this.invalid.air.push(e),
                        this.air.push(r.od28),
                        l(r.od22) && this.invalid.tem.push(e),
                        this.tem.push(r.od22),
                        l(r.od27) && this.invalid.humidity.push(e),
                        this.humidity.push(r.od27),
                        l(r.od26) && this.invalid.rain.push(e),
                        this.rain.push(r.od26),
                        l(r.od25, !0) && this.invalid.wind.push(e),
                        this.windLevel.push(r.od25),
                        this.windAngle.push(r.od23),
                        this.windDirection.push(r.od24),
                        this.rainSum += parseFloat(r.od26) || 0,
                        this.airSum += parseFloat(r.od28) || 0,
                        this.temSum += parseFloat(r.od22) || 0,
                        this.humiditySum += parseFloat(r.od27) || 0,
                        this.windSum += parseFloat(r.od25) || 0
                }
                var s = function (t, a) {
                    var i = [];
                    return $.each(t,
                        function (e, r) {
                            isNaN(r) ? (i.push(a), t[e] = "") : i.push(r)
                        }),
                        i
                },
                    h = d.max,
                    m = d.min,
                    o = function (t) {
                        for (var a = 99,
                            i = 0; i < t.length; i++) t[i] && Number(t[i]) < a && (a = t[i]);
                        return a
                    },
                    c = function (t) {
                        return Math.floor(t)
                    },
                    p = function (t) {
                        return Math.ceil(t)
                    },
                    u = d.flagData;
                u.air.max = a(s(d.air, h.air)),
                    u.tem.min = o(s(d.tem, m.tem)),
                    u.tem.max = a(s(d.tem, h.tem)),
                    u.rain.min = o(s(d.rain, m.rain)),
                    u.rain.max = a(s(d.rain, h.rain)),
                    u.humidity.min = o(s(d.humidity, m.humidity)),
                    u.humidity.max = a(s(d.humidity, h.humidity)),
                    u.wind.min = o(s(d.windLevel, m.wind)),
                    u.wind.max = a(s(d.windLevel, h.wind)),
                    d.min.air = c(d.flagData.air.min),
                    d.min.tem = c(d.flagData.tem.min),
                    d.min.rain = c(d.flagData.rain.min),
                    d.min.humidity = c(d.flagData.humidity.min),
                    d.max.air = c(d.flagData.air.max),
                    d.max.tem = c(d.flagData.tem.max),
                    d.max.rain = p(d.flagData.rain.max),
                    d.max.humidity = p(d.flagData.humidity.max),
                    d.min.air = d.min.air - d.step.air,
                    d.min.humidity - d.step.humidity >= 0 && (d.min.humidity -= d.step.humidity),
                    d.min.rain - d.step.rain >= 0 && (d.min.rain -= d.step.rain),
                    d.min.tem - d.step.tem >= 0 && (d.min.tem -= d.step.tem),
                    (d.max.air - d.min.air) / n > d.step.air && (d.step.air = p((d.max.air - d.min.air) / n)),
                    (d.max.humidity - d.min.humidity) / n > d.step.humidity && (d.step.humidity = p((d.max.humidity - d.min.humidity) / n)),
                    (d.max.rain - d.min.rain) / n > d.step.rain && (d.step.rain = p((d.max.rain - d.min.rain) / n)),
                    (d.max.tem - d.min.tem) / n > d.step.tem && (d.step.tem = p((d.max.tem - d.min.tem) / n)),
                    d.max.air = d.min.air + d.step.air * n,
                    d.max.humidity = d.min.humidity + d.step.humidity * n,
                    d.max.tem = d.min.tem + d.step.tem * n,
                    d.max.humidity > 100 && (d.max.humidity = 100, d.min.humidity = d.max.humidity - d.step.humidity * n),
                    d.max.rain = d.min.rain + d.step.rain * n
            }
        };
    d.init(t),
        s.find(".split").append('<p class="air on">过去24小时AQI最高值: ' + d.flagData.air.max + '</p><p class="tem">最高气温: ' + d.flagData.tem.max + "℃ , 最低气温: " + d.flagData.tem.min + '℃</p><p class="humidity">过去24小时最大相对湿度: ' + d.flagData.humidity.max + '%</p><p class="wind">过去24小时最大风力: ' + d.flagData.wind.max + '级</p><p class="rain">过去24小时总降水量：' + a(d.rain) + "mm</p>");
    var m = {
        width: 0,
        height: 0,
        leftgutter: 0,
        bottomgutter: 0,
        topgutter: 0,
        rightgutter: 0,
        rowNum: 0,
        colNum: 0,
        cellHeight: 0,
        cellWidth: 0,
        grid: null,
        rects: null,
        shap: null,
        path: null,
        pathStyle: {
            stroke: "#94c05a",
            "stroke-width": 2,
            "stroke-linejoin": "round"
        },
        init: function (t) {
            var a = [];
            this.width = t.width,
                this.height = t.height,
                this.leftgutter = t.leftgutter,
                this.bottomgutter = t.bottomgutter,
                this.topgutter = t.topgutter,
                this.rightgutter = t.rightgutter,
                this.rowNum = t.rowNum,
                this.colNum = t.colNum,
                this.cellHeight = (this.height - this.topgutter - this.bottomgutter) / this.rowNum,
                this.cellWidth = (this.width - this.leftgutter - this.rightgutter) / this.colNum,
                h = Raphael(t.container, m.width, m.height),
                this.grid = h.drawGrid(m.leftgutter, m.topgutter, m.width - m.leftgutter - m.rightgutter, m.height - m.topgutter - m.bottomgutter, m.rowNum, "#eee"),
                this.rects = h.set(),
                this.shap = h.set();
            for (var i = 0,
                e = this.colNum; e > i; i++) m.rects.push(h.rect(m.leftgutter + m.cellWidth * i, m.topgutter, m.cellWidth, m.height - m.bottomgutter - m.topgutter).attr({
                    stroke: "none",
                    fill: "#fff",
                    opacity: 0
                })),
                    a.push("<span>" + t.date[i] + "</span>");
            $(".xLabel").html(a.join(""))
        },
        drawGraph: function (t) {
            for (var a = [], i = t.step, e = t.unit, r = t.max, s = t.min, n = this.cellWidth, l = this.cellHeight, d = this.topgutter, o = this.leftgutter, c = this.height - d - this.bottomgutter, p = 0; p <= this.rowNum; p++) a.unshift("<span>" + (s + p * i) + "</span>");
            if ($(t.container).html(a.join("")), t.data.length != t.invalid.length) {
                var o = this.leftgutter,
                    n = this.cellWidth,
                    u = t.r || 0,
                    f = this.height - this.bottomgutter,
                    v = $(t.dataContainer);
                switch (t.shap) {
                    case "rect":
                        for (var w = [], p = 0, g = this.colNum; g > p; p++) {
                            var x, y = Math.round(o + n * (p + .5)) + .5,
                                b = Math.round(l * ((r - t.data[p]) / i) + d),
                                C = "#fff";
                            "" == e ? x = t.data[p] <= 50 ? "#9dca80" : t.data[p] <= 100 ? "#f7da64" : t.data[p] <= 150 ? "#f29e39" : t.data[p] <= 200 ? "#da555d" : t.data[p] <= 300 ? "#b9377a" : "#881326" : t.data[p] < 10 ? x = "#6600CC" : t.data[p] >= 10 && t.data[p] <= 25 ? x = "#0000FF" : t.data[p] > 25 && t.data[p] <= 50 ? x = "#008000" : t.data[p] > 50 && t.data[p] <= 100 ? x = "#FFCC00" : t.data[p] > 100 && t.data[p] <= 250 ? x = "#FF6600" : t.data[p] > 250 && (x = "#FF0000"),
                                C && x && w.push({
                                    stroke: C,
                                    "stroke-width": 1,
                                    fill: x
                                }),
                                this.shap.push(h.rect(y - .5 * n + 4, f, 13, 0).attr(w[p])),
                                this.shap[p].animate({
                                    height: c - b + d,
                                    transform: ["t0," + (- f + b)]
                                },
                                    500),
                                function (t, a, i, r) {
                                    if ("" != r && 0 != r) {
                                        var s = function () {
                                            m.shap[t].attr({
                                                fill: "#076ea8"
                                            }),
                                                "" == e ? v.html(r + e) : v.html(r + e);
                                            var s = v.width(),
                                                n = a + 10;
                                            s + a > 660 && (n = a - s - 20),
                                                v.css({
                                                    top: i,
                                                    left: n - 2
                                                }).show()
                                        },
                                            n = function () {
                                                m.shap[t].attr(w[t]),
                                                    v.hide()
                                            },
                                            h = function () {
                                                setTimeout(function () {
                                                    m.shap[t].attr(w[t]),
                                                        v.hide()
                                                },
                                                    5)
                                            };
                                        m.rects[t].hover(s, n),
                                            m.shap[t].hover(s, h)
                                    }
                                }(p, y, b, t.data[p])
                        }
                        break;
                    default:
                        var _ = [],
                            k = h.path().attr({
                                stroke: "#076ea8",
                                "stroke-width": 1
                            }),
                            M = t.invalid.length + 1,
                            H = new Array(M),
                            W = new Array(M),
                            N = 0;
                        this.path = new Array(M);
                        for (var p = 0,
                            g = this.colNum; g > p; p++) {
                            var y = Math.round(o + n * (p + .5)) + .5,
                                b = Math.round(l * ((r - t.data[p]) / i) + d),
                                D = Math.round(l * ((r - s) / i) + d);
                            if ("" == t.data[p]) N++;
                            else if ((0 == p || "" == t.data[p - 1]) && (W[N] = ["M", y, b, "L", y, b], H[N] = ["M", y, D, "L", y, D]), 0 != p && "" != t.data[p + 1] && "" != t.data[p - 1]) {
                                var S = Math.round(l * (r - t.data[p - 1]) / i + d),
                                    F = Math.round(o + n * (p - .5)),
                                    T = Math.round(l * (r - t.data[p + 1]) / i + d),
                                    A = Math.round(o + n * (p + 1.5));
                                W[N] = W[N].concat(F, S, y, b, A, T),
                                    H[N] = H[N].concat(F, D, y, D, A, D)
                            }
                            if ("dot" == t.shap) {
                                var q;
                                "μg/m³" == e || "" == e ? q = t.data[p] <= 50 ? "#6ac6ce" : t.data[p] <= 100 ? "#78ba60" : t.data[p] <= 150 ? "#f4b212" : t.data[p] <= 200 ? "#e24e31" : t.data[p] <= 300 ? "#ce1c5b" : "#880b20" : "℃" == e ? t.data[p] < 0 ? q = "#6600CC" : t.data[p] >= 0 && t.data[p] <= 5 ? q = "#0000FF" : t.data[p] > 5 && t.data[p] <= 10 ? q = "#00CCFF" : t.data[p] > 10 && t.data[p] <= 15 ? q = "#008000" : t.data[p] > 15 && t.data[p] <= 24 ? q = "#FFCC00" : t.data[p] > 24 && t.data[p] <= 32 ? q = "#FF6600" : t.data[p] > 32 && (q = "#FF0000") : t.data[p] < 26 ? q = "#FF0000" : t.data[p] >= 26 && t.data[p] <= 51 ? q = "#FF6600" : t.data[p] > 51 && t.data[p] <= 75 ? q = "#008000" : t.data[p] > 75 && (q = "#6600CC"),
                                    q && _.push({
                                        fill: q,
                                        stroke: q,
                                        "stroke-width": 1
                                    }),
                                    this.shap.push(h.circle(y, f, u).attr(_[p]))
                            } else 0 == p && _.push({
                                fill: "#6600CC",
                                stroke: "#6600CC",
                                "stroke-width": 1
                            }),
                                this.shap.push(h.polygon(y, f, u).attr(_[0]));
                            "" == t.data[p] && this.shap[p].hide(),
                                "dot" == t.shap ? this.shap[p].animate({
                                    cy: b
                                },
                                    500).attr({
                                        cy: b
                                    }) : this.shap[p].animate({
                                        transform: ["t0," + (- f + b) + "r" + (t.angle[p] - 180)]
                                    },
                                        500),
                                function (a, i, r, s, n) {
                                    var h = function () {
                                        k.attr({
                                            path: ["M", i, 0, "V", m.height - 25, "M", 10, r + .5, "H", m.width]
                                        }).show(),
                                            v.html(n + s + e);
                                        var t = v.width(),
                                            a = i + 10;
                                        t + i > 660 && (a = i - t - 20),
                                            v.css({
                                                top: r,
                                                left: a
                                            }).show()
                                    },
                                        l = function () {
                                            k.hide(),
                                                $(t.dataContainer).hide()
                                        },
                                        d = function () {
                                            setTimeout(function () {
                                                k.hide(),
                                                    $(t.dataContainer).hide()
                                            },
                                                5)
                                        };
                                    "" != s && m.rects[a].hover(h, l),
                                        m.shap[a].hover(h, d)
                                }(p, y, b, t.data[p], t.desc && t.desc[p] || "")
                        }
                        for (var j = 0; M > j; j++) H[j] && (this.path[j] = h.path(H[j]), this.path[j].attr(this.pathStyle).hide(), this.path[j].animate({
                            path: W[j]
                        },
                            470).show());
                        for (var L = 0,
                            I = this.colNum; I > L; L++) this.shap[L] && this.shap[L].toFront()
                }
            }
        }
    },
        o = {
            width: 630,
            height: 270,
            leftgutter: 42,
            bottomgutter: 40,
            topgutter: 10,
            rightgutter: 10,
            rowNum: n,
            colNum: d.length,
            container: "hourHolder",
            date: d.date
        },
        c = {
            shap: "rect",
            container: ".yLabel",
            dataContainer: ".showData",
            min: d.min.air,
            max: d.max.air,
            data: d.air,
            unit: "",
            invalid: d.invalid.air,
            step: d.step.air,
            r: 4
        };
    m.init(o),
        m.drawGraph(c);
    var p = d.length;
    $("#currHour"),
        $("#detailHour");
    var u = $("#hourHolder .result");
    i(d.air),
        $("#weatherChart .tabs ul li").hover(function () {
            var t = $(this).attr("class");
            t.length > 3 || $(this).attr("class", $(this).attr("data-role") + " " + t)
        },
            function () {
                $(this).removeClass($(this).attr("data-role"))
            }).click(function () {
                var t = $(".aqiColorExp");
                if (!$(this).hasClass("on")) {
                    var a = $(this).siblings(".on"),
                        r = $(this).attr("data-role");
                    a.attr("data-role"),
                        a.attr("class", a.attr("class").replace("_on", "")).removeClass("on"),
                        $(this).attr("class", $(this).attr("class") + "_on").addClass("on"),
                        s.find(".split").children().filter("." + r).addClass("on").siblings().removeClass("on"),
                        u.hide();
                    var n, l = d.invalid;
                    switch (r) {
                        case "humidity":
                            $("#sd").show().siblings("b").hide(),
                                t.hide();
                            var p = d.humiditySum; (isNaN(p) || 0 == p || e(l.humidity)) && (u.html("暂无数据").show(), $(".split .humidity").hide()),
                                n = $.extend({},
                                    c, {
                                    shap: "dot",
                                    min: d.min.humidity,
                                    max: d.max.humidity,
                                    data: d.humidity,
                                    unit: "%",
                                    invalid: l.humidity,
                                    step: d.step.humidity
                                });
                            break;
                        case "tem":
                            $("#tem").show().siblings("b").hide(),
                                t.hide();
                            var f = d.temSum; (isNaN(f) || e(l.tem)) && (u.html("暂无数据").show(), $(".split .tem").hide()),
                                n = $.extend({},
                                    c, {
                                    shap: "dot",
                                    min: d.min.tem,
                                    max: d.max.tem,
                                    data: d.tem,
                                    unit: "℃",
                                    invalid: l.tem,
                                    step: d.step.tem
                                });
                            break;
                        case "air":
                            $("#wd").show().siblings("b").hide(),
                                i(d.air),
                                t.show();
                            var v = d.airSum; (isNaN(v) || 0 == v || e(l.air)) && (u.html("暂无数据").show(), $(".split .air").hide());
                            break;
                        case "rain":
                            $("#js").show().siblings("b").hide(),
                                i(d.rain);
                            var w = d.rainSum; (isNaN(w) || 0 == w || e(l.rain)) && u.html("24小时内无降水数据").show(),
                                t.hide(),
                                n = $.extend({},
                                    c, {
                                    min: d.min.rain,
                                    max: d.max.rain,
                                    data: d.rain,
                                    unit: "mm",
                                    step: d.step.rain,
                                    invalid: l.rain
                                });
                            break;
                        case "wind":
                            $("#fl").show().siblings("b").hide(),
                                t.hide();
                            var g = d.windSum; (isNaN(g) || 0 == g || e(l.wind)) && (u.html("暂无数据").show(), $(".split .wind").hide()),
                                n = $.extend({},
                                    c, {
                                    shap: "polygon",
                                    min: d.min.wind,
                                    max: d.max.wind,
                                    data: d.windLevel,
                                    angle: d.windAngle,
                                    direction: d.windDirection,
                                    desc: d.windDirection,
                                    unit: "级",
                                    invalid: l.wind,
                                    step: d.step.wind,
                                    r: 8
                                })
                    }
                    h.remove(),
                        m.init(o),
                        m.drawGraph(n || c),
                        $("#weatherChart .chart .detail").removeClass("detail"),
                        $("#weatherChart .chart").find("." + r).addClass("detail")
                }
            });
    var f = !1;
    $.each(t.od.od2,
        function (t, a) {
            a.od28 && (f = !0)
        }),
        f || $("#weatherChart [data-role=air]").hide().next().click()
}
function scrollx(t) {
    var a, i = document,
        e = i.documentElement,
        r = i.body,
        s = window,
        n = i.getElementById(t.id),
        h = /msie 6/i.test(navigator.userAgent);
    n && (n.style.cssText += ";position:" + (t.f && !h ? "fixed" : "absolute") + ";" + (void 0 == t.l ? "right:0;" : "left:" + t.l + "px;") + (void 0 != t.t ? "top:" + t.t + "px" : "bottom:0"), t.f && h ? (n.style.cssText += ";left:expression(documentElement.scrollLeft + " + (void 0 == t.l ? e.clientWidth - n.offsetWidth : t.l) + ' + "px");top:expression(documentElement.scrollTop +' + (void 0 == t.t ? e.clientHeight - n.offsetHeight : t.t) + '+ "px" );', e.style.cssText += ";background-image: url(about:blank);background-attachment:fixed;") : t.f || (s.onresize = s.onscroll = function () {
        clearInterval(a),
            a = setInterval(function () {
                var i, h = e.scrollTop || r.scrollTop;
                i = h - n.offsetTop + (void 0 != t.t ? t.t : (s.innerHeight || e.clientHeight) - n.offsetHeight),
                    0 != i ? n.style.top = n.offsetTop + Math.ceil(Math.abs(i) / 10) * (0 > i ? -1 : 1) + "px" : clearInterval(a)
            },
                10)
    }))
}
define(function (require) {
    require("jquery"),
        require("j/tool/raphael");
    var t = $(".crumbs a:first").text(),
        a = $('<div class="send"><h1>我在<b>' + t + "</b>，现在看到的天空状况是：</h1>" + '<ul class="clearfix">' + "<li><i></i><span>A. 天空蔚蓝</span></li>" + '<li class="on"><i></i><span>B. 天空淡蓝</span></li>' + "<li><i></i><span>C. 天空阴沉</span></li>" + "<li><i></i><span>D. 天空灰霾</span></li>" + "</ul>" + '<i class="close"></i>' + '<input class="submit" type="button" value="提交">' + "</div>"),
        i = $('<div class="succ"><h1>收到啦~</h1><p>蓝天预报因你而更准</p><i class="img"></i></div>'),
        e = $('<div class="fb"><div class="fbm"></div><div class="bg"></div></div>');
    e.find(".fbm").append(a).append(i),
        $("body").append(e),
        location.href.match(/\d{9}/),
        e.find("li").click(function () {
            var t = $(this);
            t.addClass("on").siblings().removeClass("on")
        });
    var r = e.find(".close").bind("click",
        function () {
            e.hide(),
                a.css("display", "block")
        });
    $.getScript("http://wgeo.weather.com.cn/ip/"),
        e.find(".submit").click(function () {
            var i = e.find(".on").index() + 1;
            a.css("display", "none"),
                setTimeout(function () {
                    r.first().click()
                },
                    1500);
            var s = new XMLHttpRequest;
            "withCredentials" in s || (s = new XDomainRequest),
                s.open("POST", "http://fb.weather.com.cn/getdata");
            var n = addr.split(",")[0] || null,
                h = '{ "ip":"' + ip + '","ip_city":"' + n + '","page_city":"' + t + '","raw_data":"' + $("#7d ul.t li:first").attr("class").match(/lv\d/)[0] + '","user_submit_data":"lv' + i + '"}';
            ip && t && n && s.send(h)
        }),
        $("#fb_sub").click(function () {
            var t = new Date,
                i = t.getMinutes(),
                r = t.getHours() + "时" + (10 > i && "0" + i || t.getMinutes()) + "分";
            a.find("em").text(r),
                e.show()
        });
    var s = {
        _getArrMax: function (t) {
            return Math.max.apply(Math, t) || null
        },
        _getArrMin: function (t) {
            return Math.min.apply(Math, t) || null
        },
        len: 0,
        arrTime: [],
        arrWeapic: [],
        arrWeaTxt: [],
        arrTem: [],
        arrWinf: [],
        arrWinl: [],
        _clearArr: function () {
            s.arrTime = [],
                s.arrWeapic = [],
                s.arrWeaTxt = [],
                s.arrTem = [],
                s.arrWinf = [],
                s.arrWinl = [],
                s.arrCircle = [],
                s.arrSky = []
        },
        _initWeaData: function (t) {
            s._clearArr(),
                $.each(t,
                    function (t, a) {
                        var i = a.split(",");
                        s.arrTime.push(i[0].substr(3)),
                            s.arrWeapic.push(i[1]),
                            s.arrWeaTxt.push(i[2]),
                            s.arrTem.push(parseInt(i[3])),
                            s.arrWinf.push(i[4]),
                            s.arrWinl.push(i[5]),
                            s.arrSky.push(i[6])
                    }),
                this.len = t.length;
            var a = s._getArrMin(s.arrTem),
                i = s._getArrMax(s.arrTem);
            if (a != i) var e = (this.svgH - 20) / (i - a);
            else var e = (this.svgH - 20) / 1;
            this.cel_w = this.svgW / this.len;
            var r = [];
            $.each(s.arrTem,
                function (t) {
                    var a = s.cel_w * t + s.cel_w / 2,
                        n = (i - s.arrTem[t]) * e + 9;
                    s.arrCircle.push({
                        x: a,
                        y: n
                    }),
                        r.push([a, n])
                }),
                this.svgPath = r.join(",")
        },
        svgW: 680,
        svgH: 70,
        cel_w: 0,
        svgPath: "",
        linePath: null,
        arrCircle: []
    },
        n = $("#curve"),
        h = n.find(".time"),
        l = n.find(".wpic"),
        d = n.find(".winf"),
        m = n.find(".winl"),
        o = n.find(".tem"),
        c = "7d";
    s._initWeaData(hour3data[c][0]);
    for (var p = Raphael("biggt", s.svgW, s.svgH), u = p.path("M10,20").attr({
        stroke: "#f68227",
        "stroke-width": 2
    }), f = [], v = s.arrCircle[0].x, w = s.arrCircle[0].y, g = 0; g <= s.len - 1; g++) {
        h.append($('<em style="width:' + s.cel_w + "px;left:" + s.cel_w * g + 'px">' + s.arrTime[g] + "</em>"));
        var x = s.arrWinf[g],
            y = s.arrWinl[g];
        if ("微风" == y) var x = "微风",
            y = "<3级";
        d.append($('<em style="width:' + s.cel_w + "px;left:" + s.cel_w * g + 'px">' + x + "</em>")),
            m.append($('<em style="width:' + s.cel_w + "px;left:" + s.cel_w * g + 'px">' + y + "</em>"));
        var b = s.arrCircle[g].x,
            C = s.arrCircle[g].y;
        f.push(p.circle(v, w, 4).attr({
            fill: "#f68227",
            stroke: "#f68227",
            cx: b,
            cy: C
        })),
            o.append($('<em style="width:' + s.cel_w + "px;left:" + s.cel_w * g + "px;top:" + (C + 70) + 'px">' + s.arrTem[g] + "℃</em>")),
            l.append($('<div style="width:' + s.cel_w + "px;left:" + s.cel_w * g + "px;top:" + 30 + 'px"><big title="' + s.arrWeaTxt[g] + '" class="png40 ' + s.arrWeapic[g] + " lv" + s.arrSky[g] + '"></big></div>'))
    }
    u.attr({
        path: "M" + s.svgPath
    }),
        $("#7d>ul.t>li").click(function () {
            function t(t, a) {
                if ("change" == a) {
                    var i = s.arrCircle[t].x,
                        c = s.arrCircle[t].y;
                    e.eq(t).length ? e.eq(t).show().text(s.arrTem[t] + "℃").animate({
                        top: c + 70 + "px",
                        left: s.cel_w * t,
                        width: s.cel_w + "px"
                    },
                        500) : o.append($('<em style="width:' + s.cel_w + "px;left:1000px;top:" + (c + 70) + 'px">' + s.arrTem[t] + "℃</em>").animate({
                            left: s.cel_w * t
                        },
                            500));
                    var u = $("#sky-on").hasClass("off") && "none" || " ",
                        x = s.arrSky[g] && "sky lv" + s.arrSky[g] || " ";
                    r.eq(t).length ? r.eq(t).show().html('<big title="' + s.arrWeaTxt[t] + '" class="png40 ' + s.arrWeapic[g] + " " + x + " " + u + '"></big>').animate({
                        top: c + 30 + "px",
                        left: s.cel_w * g,
                        width: s.cel_w + "px"
                    },
                        500) : l.append($('<div style="width:' + s.cel_w + "px;left:" + 1e3 + "px;top:" + (c + 30) + 'px"><big title="' + s.arrWeaTxt[t] + '" class="png40 ' + s.arrWeapic[t] + " " + x + " " + u + '"></big></div>').animate({
                            left: s.cel_w * t + "px"
                        },
                            500)),
                        n.eq(t).length ? n.eq(t).show().text(s.arrTime[t]).animate({
                            left: s.cel_w * t,
                            width: s.cel_w + "px"
                        },
                            500) : h.append($('<em style="width:' + s.cel_w + "px;left:" + 1e3 + 'px">' + s.arrTime[t] + "</em>").animate({
                                left: s.cel_w * t + "px"
                            },
                                500));
                    var y = s.arrWinf[t],
                        b = s.arrWinl[t];
                    if ("微风" == b) var y = "微风",
                        b = "<3级";
                    v.eq(t).length ? v.eq(t).show().text(y || "").animate({
                        left: s.cel_w * t,
                        width: s.cel_w + "px"
                    },
                        500) : d.append($('<em style="width:' + s.cel_w + "px;left:" + 1e3 + 'px">' + y + "</em>").animate({
                            left: s.cel_w * t + "px"
                        },
                            500)),
                        w.eq(t).length ? w.eq(t).show().text(b || "").animate({
                            left: s.cel_w * t,
                            width: s.cel_w + "px"
                        },
                            500) : m.append($('<em style="width:' + s.cel_w + "px;left:" + 1e3 + 'px">' + b + "</em>").animate({
                                left: s.cel_w * t + "px"
                            },
                                500)),
                        f[t] ? f[t].animate({
                            cy: c,
                            cx: i
                        },
                            500) : f.push(p.circle(1e3, c, 4).attr({
                                fill: "#f68227",
                                stroke: "#f68227"
                            }).animate({
                                cx: i
                            },
                                500))
                } else "delete" == a ? f[t].animate({
                    cx: 1e3
                },
                    500) : alert("style属性设置错误")
            }
            var a = $(this);
            a.addClass("on").siblings("li").removeClass("on");
            var i = a.index();
            s._initWeaData(hour3data[c][i]);
            var e = o.children().hide(),
                r = l.find("div").hide(),
                n = h.children().hide(),
                v = d.children().hide(),
                w = m.children().hide();
            if (f.length > s.len) {
                for (var g = 0; g <= s.len - 1; g++) t(g, "change");
                for (var g = s.len; g <= f.length - 1; g++) t(g, "delete");
                u.animate({
                    path: "M" + s.svgPath
                },
                    500)
            } else {
                for (var g = 0; g <= s.len - 1; g++) t(g, "change");
                u.animate({
                    path: "M" + s.svgPath
                },
                    500)
            }
        }),
        $("#sky-on").click(function () {
            var t = $(this),
                a = t.children("i");
            t.hasClass("off") ? a.stop(!0, !0).animate({
                left: "0px"
            },
                function () {
                    t.removeClass("off"),
                        $("#7d .skyid").addClass("sky"),
                        l.find("big").removeClass("none")
                }) : a.stop(!0, !0).animate({
                    left: "18px"
                },
                    function () {
                        t.addClass("off"),
                            $("#7d .skyid").removeClass("sky"),
                            l.find("big").addClass("none")
                    })
        }).next().hover(function () {
            $(this).next().show()
        },
            function () {
                $(this).next().hide()
            });
    var _ = $(".livezs .li3");
    $.each(_,
        function (t, a) {
            var i = $(a).find("i");
            switch ($(a).find("span").text()) {
                case "舒适":
                    i.addClass("v2");
                    break;
                case "较舒适":
                    i.addClass("v2");
                    break;
                case "较冷":
                    i.addClass("v2");
                    break;
                case "冷":
                    i.addClass("v3");
                    break;
                case "寒冷":
                    i.addClass("v3")
            }
        }),
        setAirData(observe24h_data),
        $("#weatherChart>.tabs>h2>span").live("click",
            function () {
                "0" == $(this).attr("data-n") ? ($("#weatherChart .chart").show(), $("#weatherChart>.tabs>ul").show(), $("#weatherChart>.tabs i").css("left", "52px"), $("#weatherChart .sevenDay").hide()) : ($("#weatherChart .chart").hide(), $("#weatherChart>.tabs>ul").hide(), $("#weatherChart>.tabs i").css("left", "184px"), $("#weatherChart .sevenDay").show())
            });
    for (var n = $(".sevenDay"), k = n.find("ul.f"), M = k.find("li"), H = [], W = [], N = 0, D = 100, S = $("#7d>ul.t>li"), g = S.length - 1; g >= 0; g--) {
        var F = S.eq(g),
            T = F.find("p.tem"),
            A = T.find("span").text().replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, ""),
            q = T.find("i").text().replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, ""),
            j = parseInt(A),
            L = parseInt(q);
        if (!j && 0 != j) var j = L;
        if (!L && 0 != L) var L = j;
        if (E = F.find("big:first").attr("class").match(/d\d{2}/) || " ", G = F.find("big:last").attr("class").match(/n\d{2}/) || " ", parseInt(j) < parseInt(L)) var I = j,
            j = L,
            L = I,
            z = A,
            A = q,
            q = z,
            K = E,
            E = G,
            G = K;
        var R = " " == E && " " || '<big class="png30 ' + E + '"></big>',
            P = " " == G && " " || '<big class="png30 ' + G + '"></big>';
        n.children("ul.f").children("li:eq(" + g + ")").find("p:first").html(A).after(R),
            n.children("ul.f").children("li:eq(" + g + ")").find("p:last").html(q).before(P);
        var X = n.children("ul.d").children("li:eq(" + g + ")").children(".c"),
            Y = F.find("h1").text();
        X.html(Y.match(/[\u4e00-\u9fa5]{2}/g)[0]),
            H.unshift(j),
            W.unshift(L),
            N = j > N ? j : N,
            D = D > L ? L : D
    }
    for (var U = Math.ceil(N / 5) + 1, Q = D % 5, Q = Math.ceil(D / 5) - 2, g = M.length - 1; g >= 0; g--) {
        if (!H[g] && 0 != H[g]) var H = W;
        if (!W[g] && 0 != W[g]) var W = H;
        var O = 12 * (5 * U - H[g]),
            V = H[g] - W[g],
            V = V > 0 ? V : -1 * V;
        M.eq(g).css("marginTop", O + "px").find(".zc").height(12 * V - 20)
    }
    for (var B = "",
        Z = "",
        g = U; g >= Q; g--) B += "<li></li>",
            Z += "<li>" + 5 * g + "°C</li>";
    var J = U - Q;
    n.children("ul.b1").empty().append(B).children("li:last").css({
        "border-left": "none",
        "border-right": "none"
    }).parent("ul").next(".b2").empty().append(Z),
        n.children("ul.d").css("top", 60 * J + 15 + "px"),
        $("#7d .btn em").click(function () {
            var t = $(this),
                a = t.index();
            t.addClass("on").siblings().removeClass("on"),
                $(".curve_livezs").eq(a).show().siblings(".curve_livezs").hide()
        }),
        $("#7d>ul.t>li").click(function () {
            var t = $(this),
                a = t.index();
            $("#livezs>div").removeClass("show").eq(a).addClass("show")
        }),
        $("#abs p img").click(function () {
            $("#abs").hide()
        }),
        $("#adposter_6287 p img").click(function () {
            $(".adposter_6287").hide()
        })
}),
    scrollx({
        id: "adposter_6287",
        l: 0,
        t: 100,
        f: 1
    }),
    scrollx({
        id: "abs",
        r: 0,
        b: 0,
        f: 1
    });