function dw(t, e) {
    function o(t) {
        return l ? H - PADDING.top - 20 - (H - PADDING.top - PADDING.buttom - 20) / m * (t - p) : H - PADDING.top - (H - PADDING.top - PADDING.buttom - 20) / m * (t - p)
    }
    function a(t, e) {
        return [PADDING.left + (W - PADDING.left - PADDING.right) / (values.length - 1) * t, o(e)]
    }
    function i() {
        for (var t = [], e = 1, o = x.length; o > e; e++) t.push(x[e], D[e]);
        t = ["M", x[0], D[0], "R"].concat(t);
        var a;
        a = l ? "L" + (W - PADDING.left) + "," + 0 + ",42," + 0 + "z" : "L" + (W - PADDING.left) + "," + (H - PADDING.buttom) + ",42," + (H - PADDING.top) + "z",
            $.attr({
                path: t
            }),
            b.attr({
                path: t + a
            })
    }
    var l = t.xr,
        n = t.line,
        s = e.color,
        c = e.dotColor,
        d = e.dotDiameter,
        v = e.dotStrokeColor,
        u = e.dotStroke,
        h = e.opacity;
    PADDING = e.PADDING,
        W = e.W,
        H = e.H,
        r = Raphael(t.id, W, H),
        textStyle = e.textStyle,
        values = e.values,
        len = values.length;
    var m, f = Math.max.apply({},
        values),
        p = Math.min.apply({},
            values);
    m = f === p ? f / 2 : f - p;
    var $, x = ([["M"].concat(a(0, values[0]))], []),
        D = [],
        C = (r.set(), r.set()),
        b = ((W - PADDING) / values.length, r.path().attr({
            stroke: "none",
            fill: s,
            opacity: h
        }));
    $ = n ? r.path().attr({
        stroke: s,
        "stroke-width": 2
    }) : r.path().attr({
        stroke: s,
        "stroke-width": 0
    });
    var w;
    for (S = 0, w = values.length - 1; w > S; S++) {
        var y, k = a(S, values[S]),
            g = a(S + 1, values[S + 1]);
        x[S] = k[0],
            D[S] = k[1],
            (y = function (t, e) {
                var o;
                o = n ? {
                    fill: c,
                    stroke: v,
                    "stroke-width": u
                } : t ? {
                    fill: c,
                    stroke: v,
                    "stroke-width": u
                } : {
                            fill: "RGB(194,194,195)",
                            stroke: "RGB(194,194,195)",
                            "stroke-width": "1"
                        },
                    C.push(r.circle(e[0], e[1], d).attr(o))
            })(S, k),
            S == w - 1 && y(S + 1, g)
    }
    if (k = a(w, values[w]), x.push(k[0]), D.push(k[1]), !n) if (l) {
        var N = r.text(x[0], D[0] + 15, values[0] + "°C");
        N.attr({
            fill: "RGB(194,194,195)",
            "font-size": "14px",
            "text-anchor": "center"
        })
    } else {
        var N = r.text(x[0], D[0] - 15, values[0] + "°C");
        N.attr({
            fill: "RGB(194,194,195)",
            "font-size": "16px",
            "text-anchor": "center"
        })
    }
    var S;
    for (S = n ? 0 : 1, w = values.length; w > S; S++) if (l) {
        var N = r.text(x[S], D[S] + (e.fontWz || 15), values[S] + "°C");
        N.attr(textStyle)
    } else {
        var N = r.text(x[S], D[S] - (e.fontWz || 15), values[S] + "°C");
        N.attr(textStyle)
    }
    i()
}
function initHouers(t) {
    function e(t) {
        for (var e = [], o = ["无持续风向", "东北风", "东风", "东南风", "南风", "西南风", "西风", "西北风", "北风", "旋转风"], a = ["<3级", "3-4级", "4-5级", "5-6级", "6-7级", "7-8级", "8-9级", "9-10级", "10-11级", "11-12级"], i = 0; i < t.length; i++) {
            var r = t[i],
                l = {},
                n = r.jf.slice(8, 10);
            l.time = n,
                l.template = r.jb,
                l.wather = n > 5 && 20 > n ? "d" + r.ja : "n" + r.ja,
                l.windDY = o[r.jd],
                l.windJB = a[r.jc],
                l.itemOne = i % 2 ? "item-one" : "",
                e.push(l)
        }
        return e
    }
    function o(t, e) {
        var o = "";
        return o += '<li class="details-item ' + e.itemOne + '">' + '<i class="item-icon housr_icons ' + e.wather + '"></i>' + '<div class="curor"></div>' + '<p class="wind-info">' + e.windDY + "</p>" + '<p class="wind-js">' + e.windJB + "</p> " + "</li>"
    }
    function a(t, e) {
        return 0 === t ? '<li class="houer-item active">' + e.time + "时</li>" : '<li class="houer-item">' + e.time + "时</li>"
    }
    if (0 !== t) {
        var i = t - 1,
            r = function () {
                try {
                    return !0
                } catch (t) {
                    return !1
                }
            }();
        if (r) if (0 === i) {
            var l = parseInt(sunup[0].slice(0, 2)),
                n = parseInt(sunup[0].slice(3, 5)),
                s = 60 * l + n,
                c = parseInt(sunset[0].slice(0, 2)),
                d = parseInt(sunset[0].slice(3, 5)),
                v = 60 * c + d,
                u = new Date,
                h = u.getHours(),
                m = u.getMinutes(),
                f = 60 * h + m;
            s > f ? ($($(".sunup .time")[1]).text(sunup[0]), $($(".sunup .time")[0]).text(sunset[0])) : f >= s && v > f ? ($($(".sunup .time")[1]).text(sunup[0]), $($(".sunup .time")[0]).text(sunset[1])) : ($($(".sunup .time")[1]).text(sunup[1]), $($(".sunup .time")[0]).text(sunset[1]))
        } else $($(".sunup .time")[1]).text(sunup[i]),
            $($(".sunup .time")[0]).text(sunset[i]);
        var p, x = hour3data[i];
        p = x.length;
        for (var D = e(x), C = [], b = [], w = 0; p > w; w++) C.push(o(w, D[w])),
            b.push(a(w, D[w]));
        $(".details-houers-container").empty().html(C.join("")),
            $(".houers-container").empty().html(b.join(""));
        var y = x.map(function (t) {
            return t.jb
        });
        if (3 > i) {
            var k = "<li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>";
            $(".content-shade").empty().html(k).css("width", "1300px"),
                $(".content-container .scroll-container ").css("width", "1306px");
            var g = {
                id: "drawTF",
                xr: "xr",
                line: "line"
            },
                N = {
                    color: "#e99a58",
                    dotColor: "#e9914c",
                    dotDiameter: 5,
                    dotStrokeColor: "#fff",
                    dotStroke: "3",
                    opacity: 0,
                    PADDING: {
                        left: 30,
                        top: 7,
                        right: 30,
                        buttom: 7
                    },
                    W: 1300,
                    H: 80,
                    textStyle: {
                        fill: "#999",
                        "font-size": "16px",
                        "text-anchor": "center"
                    },
                    values: y,
                    fontWz: 20
                },
                S = {
                    color: "#e99a58",
                    dotColor: "#e9914c",
                    dotDiameter: 5,
                    dotStrokeColor: "#fff",
                    dotStroke: "3",
                    opacity: 0,
                    PADDING: {
                        left: 30,
                        top: 7,
                        right: 30,
                        buttom: 15
                    },
                    W: 650,
                    H: 70,
                    textStyle: {
                        fill: "#999",
                        "font-size": "16px",
                        "text-anchor": "center"
                    },
                    values: y,
                    fontWz: 20
                };
            $("#drawTF").empty(),
                $("#drawTE").empty(),
                $(".header-container .title").text("逐小时预报"),
                p > 20 ? (dw(g, N), $(".content-container").niceScroll({
                    cursorcolor: "#bcbcbc",
                    background: "#dfdfdf",
                    autohidemode: !1,
                    cursorwidth: "10px",
                    cursorborder: "none"
                }), $(".content-container").getNiceScroll().show()) : (dw(g, S), $(".content-container").getNiceScroll().hide())
        } else if ($("#drawTF").empty(), $("#drawTE").empty(), p > 9) {
            var g = {
                id: "drawTF",
                xr: "xr",
                line: "line"
            },
                N = {
                    color: "#e99a58",
                    dotColor: "#e9914c",
                    dotDiameter: 5,
                    dotStrokeColor: "#fff",
                    dotStroke: "3",
                    opacity: 0,
                    PADDING: {
                        left: 30,
                        top: 7,
                        right: 30,
                        buttom: 7
                    },
                    W: 870,
                    H: 80,
                    textStyle: {
                        fill: "#999",
                        "font-size": "16px",
                        "text-anchor": "center"
                    },
                    values: y,
                    fontWz: 20
                };
            dw(g, N);
            var G = "<li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>";
            $(".content-shade").empty().html(G).css("width", "875px"),
                $(".content-container .scroll-container").css("width", "880px"),
                $(".content-container").niceScroll({
                    cursorcolor: "#bcbcbc",
                    background: "#dfdfdf",
                    autohidemode: !1,
                    cursorwidth: "10px",
                    cursorborder: "none"
                }),
                $(".content-container").getNiceScroll().show()
        } else {
            $(".content-container").getNiceScroll().hide(),
                $(".header-container .title").text("逐3小时预报"),
                $("#ascrail2003-hr").hide();
            var g = {
                id: "drawTE",
                xr: "xr",
                line: "line"
            },
                N = {
                    color: "#e99a58",
                    dotColor: "#e9914c",
                    dotDiameter: 5,
                    dotStrokeColor: "#fff",
                    dotStroke: "3",
                    opacity: 0,
                    PADDING: {
                        left: 41,
                        top: 7,
                        right: 41,
                        buttom: 7
                    },
                    W: 650,
                    H: 80,
                    textStyle: {
                        fill: "#999",
                        "font-size": "16px",
                        "text-anchor": "center"
                    },
                    values: y,
                    fontWz: 20
                };
            $("#drawTF").empty(),
                $("#drawTE").empty(),
                dw(g, N)
        }
    }
}
"function" != typeof Array.prototype.map && (Array.prototype.map = function (t, e) {
    var o = [];
    if ("function" == typeof t) for (var a = 0,
        i = this.length; i > a; a++) o.push(t.call(e, this[a], a, this));
    return o
}),
    initHouers(1);
var drawBaseOb = {
    id: "drawO",
    xr: "",
    line: ""
},
    drawBaseObq = {
        id: "drawT",
        xr: "xr",
        line: ""
    },
    drawNoneBlue = {
        color: "rgb(254,240,208)",
        dotColor: "#e7924c",
        dotDiameter: 3,
        dotStrokeColor: "#fff",
        dotStroke: "1",
        opacity: .8,
        PADDING: {
            left: 42,
            top: 5,
            right: 42,
            buttom: 5
        },
        W: 687,
        H: 70,
        textStyle: {
            fill: "#252525",
            "font-size": "16px",
            "text-anchor": "center"
        },
        values: eventDay
    },
    drawNoneBlueq = {
        color: "rgb(254,240,208)",
        dotColor: "#999",
        dotDiameter: 2,
        dotStrokeColor: "#fff",
        dotStroke: "0",
        opacity: .8,
        PADDING: {
            left: 42,
            top: 5,
            right: 42,
            buttom: 5
        },
        W: 687,
        H: 70,
        textStyle: {
            fill: "#7d7d7d",
            "font-size": "14px",
            "text-anchor": "center"
        },
        values: eventNight
    };
dw(drawBaseOb, drawNoneBlue),
    dw(drawBaseObq, drawNoneBlueq),
    $(".click_warp_item").on("click",
        function (t) {
            t.preventDefault(),
                t.stopPropagation();
            var e = $(this).index(),
                o = $(".date-bottom-blue"),
                a = $(".blue-item"),
                i = $(".date-item");
            if (0 !== e) {
                i.removeClass("active"),
                    i.eq(e).addClass("active"),
                    o.removeClass("date-bottom-active"),
                    $(o[e]).addClass("date-bottom-active");
                var r = $(".item-active").clone();
                $(".item-active").detach(),
                    a.removeClass("active"),
                    $(a[e]).append(r).addClass("active"),
                    hour3data[e - 1].length > 9 ? ($(".three-container").hide(), $(".content-container").show()) : ($(".content-container").hide(), $(".three-container").show()),
                    initHouers(e)
            }
        }),
    $(".blue-item").on("click",
        function (t) {
            t.preventDefault(),
                t.stopPropagation();
            var e = $(this).index(),
                o = $(".date-bottom-blue"),
                a = $(".blue-item"),
                i = $(".date-item");
            if (0 !== e) {
                i.removeClass("active"),
                    i.eq(e).addClass("active"),
                    o.removeClass("date-bottom-active"),
                    $(o[e]).addClass("date-bottom-active");
                var r = $(".item-active").clone();
                $(".item-active").detach(),
                    a.removeClass("active"),
                    $(a[e]).append(r).addClass("active"),
                    hour3data[e - 1].length > 9 ? ($(".three-container").hide(), $(".content-container").show()) : ($(".content-container").hide(), $(".three-container").show()),
                    initHouers(e)
            }
        }),
    $(".date-item").on("click",
        function (t) {
            t.preventDefault(),
                t.stopPropagation();
            var e = $(this).index(),
                o = $(".date-bottom-blue"),
                a = $(".blue-item"),
                i = $(".date-item");
            if (0 !== e) {
                i.removeClass("active"),
                    i.eq(e).addClass("active"),
                    o.removeClass("date-bottom-active"),
                    $(o[e]).addClass("date-bottom-active");
                var r = $(".item-active").clone();
                $(".item-active").detach(),
                    a.removeClass("active"),
                    $(a[e]).append(r).addClass("active"),
                    hour3data[e - 1].length > 9 ? ($(".three-container").hide(), $(".content-container").show()) : ($(".content-container").hide(), $(".three-container").show()),
                    initHouers(e)
            }
        }),
    $(".content-shade > li").on("hover",
        function () {
            var t = $(this).index(),
                e = $(".houer-item");
            e.removeClass("active"),
                $(e[t]).addClass("active");
            var o = $(".details-item");
            o.removeClass("active"),
                $(o[t]).addClass("active")
        }),
    $(".three-content-shade > li").on("hover",
        function () {
            var t = $(this).index(),
                e = $(".houer-item");
            e.removeClass("active"),
                $(e[8 + t]).addClass("active");
            var o = $(".details-item");
            o.removeClass("active"),
                $(o[8 + t]).addClass("active")
        }),
    $(".date-item").on("hover",
        function () {
            var t = $(this).index(),
                e = $(".date-item");
            e.removeClass("hover"),
                $(e[t]).addClass("hover");
            var o = $(".date-bottom-blue");
            o.removeClass("date-bottom-activea"),
                $(o[t]).addClass("date-bottom-activea")
        }),
    $(".click_warp_item").on("hover",
        function () {
            var t = $(this).index(),
                e = $(".date-item");
            e.removeClass("hover"),
                $(e[t]).addClass("hover");
            var o = $(".date-bottom-blue");
            o.removeClass("date-bottom-activea"),
                $(o[t]).addClass("date-bottom-activea")
        }),
    $(".blue-item").on("hover",
        function () {
            var t = $(this).index(),
                e = $(".date-item");
            e.removeClass("hover"),
                $(e[t]).addClass("hover");
            var o = $(".date-bottom-blue");
            o.removeClass("date-bottom-activea"),
                $(o[t]).addClass("date-bottom-activea")
        }),
    $(".weather_7d").on("mouseleave",
        function () {
            var t = $(".date-item");
            t.removeClass("hover");
            var e = $(".date-bottom-blue");
            e.removeClass("date-bottom-activea")
        });