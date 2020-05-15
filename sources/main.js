function ajax_upload() {
    date = "", pre_date = "", nex_date = "";
    var t = current_year,
        a = next_year;
    6 > current_month && (t = pre_year, a = current_year), parseInt($(".input_nian").val()) == t ? url = "http://d1.weather.com.cn/calendarFromMon/" + t + "/" + cityd + "_" + t + buzero(parseInt($(".input_yue").val())) + ".html" : parseInt($(".input_nian").val()) == a && (url = "http://d1.weather.com.cn/calendarFromMon/" + a + "/" + cityd + "_" + a + buzero(parseInt($(".input_yue").val())) + ".html"), addDate()
}

function addDate() {
    var t = parseInt($(".input_nian").val()),
        a = parseInt($(".input_yue").val()),
        e = get_current_day(a, parseInt($(".input_nian").val())),
        n = 0,
        r = 0;
    n = a - 1 > 0 ? get_current_day(a - 1, parseInt($(".input_nian").val())) : get_current_day(12, parseInt($(".input_nian").val()) - 1), r = 13 > a + 1 ? get_current_day(a + 1, parseInt($(".input_nian").val())) : get_current_day(1, parseInt($(".input_nian").val()) + 1);
    var s = new Date;
    s.setFullYear(t), s.setMonth(a - 1), s.setDate(1);
    var i = s.getDay(),
        l = 0;
    l = 0 == i ? 6 : i - 1, url && $.ajax({
        type: "get",
        async: !0,
        url: url,
        dataType: "script",
        success: function() {
            date = fc40, drawLine(date.slice(l, e + l))
        }
    })
}

function buzero(t) {
    return 10 > t ? "0" + t : t
}

function get_current_day(t, a) {
    return 1 == t || 3 == t || 5 == t || 7 == t || 8 == t || 10 == t || 12 == t ? 31 : 4 == t || 6 == t || 9 == t || 11 == t ? 30 : 2 == t && isLeapYear(a) ? 29 : 28
}

function isLeapYear(t) {
    return 0 == t % 4 && 0 != t % 100 ? !0 : 0 == t % 400 ? !0 : !1
}

function jiequ(t) {
    var a = parseInt(t.substring(0, t.length - 1));
    return a
}

function drawLine(t) {
    function a(t, a, e, n, r, s) {
        var i = (e - t) / 2,
            l = (r - e) / 2,
            c = Math.atan((e - t) / Math.abs(n - a)),
            d = Math.atan((r - e) / Math.abs(n - s));
        c = n > a ? Math.PI - c : c, d = n > s ? Math.PI - d : d;
        var o = Math.PI / 2 - (c + d) % (2 * Math.PI) / 2,
            u = i * Math.sin(o + c),
            p = i * Math.cos(o + c),
            h = l * Math.sin(o + d),
            _ = l * Math.cos(o + d);
        return {
            x1: e - u,
            y1: n + p,
            x2: e + h,
            y2: n + _
        }
    }
    var e = [],
        n = [],
        r = [],
        s = [],
        i = [],
        l = [],
        c = 0;
    $.each(t, function(a, d) {
        e[a] = d.hmax, n[a] = d.hmin, (d.maxobs && t[a + 1] && t[a + 1].max || d.minobs && t[a + 1] && t[a + 1].min) && (c = a + 1), r[a] = d.max || "", s[a] = d.min || "", i[a] = d.maxobs, l[a] = d.minobs
    }), c && (i[c] = r[c], l[c] = s[c]), $("#holder0").html('<h1>逐月气温趋势</h1><em class="des">气温曲线</em><div class="y"></div><div class="x"></div><em class="dy">℃</em><i class="turnLeft"></i><i class="turnRight"></i><ul class="stxt"><li class="liSkH"><em></em><span>实况高温</span></li><li class="liSkL"><em></em><span>实况低温</span></li><li class="li1"><em></em><span>高温预报</span></li><li class="li2"><em></em><span>低温预报</span></li><li class="li3"><em></em><span>历史均值高温</span></li><li class="li4"><em></em><span>历史均值低温</span></li></ul>');
    var d = 630,
        o = 174,
        u = 10,
        p = 20,
        h = 20,
        _ = (Math.random(), "#fca087"),
        y = "#7dd0e9",
        m = "#fd5123",
        v = "#37afd1",
        f = "#f7cf15",
        x = "#4ad5f0",
        g = Raphael("holder0", d, o),
        M = g.set();
    g.rect(0, 0, d, o).attr({
        fill: "#fff",
        stroke: "none"
    }), g.path("M,0," + o + "0," + d + "," + o).attr({
        stroke: "#eff0f2",
        "stroke-width": 1
    });
    var w = {
        dots: [
            [],
            [],
            [],
            [],
            [],
            []
        ],
        rects: [],
        gridLines: [],
        lineNum: 0,
        Max: 0,
        Min: 0,
        _getMaxMin: function() {
            var t = e.concat(n).concat(r).concat(s).concat(i).concat(l);
            this.Max = Math.max.apply(Math, t), this.Min = Math.min.apply(Math, t)
        },
        circles: [],
        _setLine: function(t, e, n) {
            var r = $("#holder0"),
                s = r.find(".x"),
                i = r.find(".y"),
                l = t.length,
                c = [];
            this._getMaxMin();
            var _ = (d - u) / l,
                y = this.Max - this.Min,
                m = o - p - h,
                v = m / y,
                f = g.path().attr({
                    stroke: e,
                    "stroke-width": 2,
                    "stroke-linejoin": "round",
                    opacity: "0.8",
                    "class": "i1",
                    "stroke-dasharray": n
                });
            if (!w.lineNum)
                for (var x = 4; x >= 0; x--) i.prepend('<span style="height:' + m / 4 + 'px;">' + Math.round(this.Max - y / 4 * x) + "</span>").css("top", h + 2 + "px");
            if (!w.lineNum)
                for (var x = 0, b = l; b > x; x++) {
                    var I = Math.round(u + _ * (x + .5)),
                        L = g.path("M," + I + ",0," + I + "," + o).attr({
                            stroke: "#eff0f2",
                            "stroke-width": 1
                        });
                    w.gridLines.push(L), s.append('<span style="width:' + _ + 'px">' + (x + 1) + "</span>")
                }
            w.circles.push(g.circle(-100, -100, 6).attr({
                fill: e,
                stroke: "#fff",
                "stroke-width": 2
            }));
            for (var C = -100, I = -100, x = 0, b = l; b > x; x++) {
                if (t[x]) {
                    var C = Math.round(o - p - v * (t[x] - w.Min)),
                        I = Math.round(u + _ * (x + .5));
                    w.dots[w.lineNum].push({
                        attrs: {
                            cx: I,
                            cy: C
                        },
                        tit: t[x]
                    })
                } else w.dots[w.lineNum].push({
                    attrs: {
                        cx: -100,
                        cy: -100
                    },
                    tit: t[x]
                });
                if (!c.length && t[x] && (c = ["M", I, C, "C", I, C]), t[x] && x && b - 1 > x) {
                    var k = Math.round(o - p - v * t[x - 1]),
                        D = Math.round(u + _ * (x - .5)),
                        Y = Math.round(o - p - v * t[x + 1]),
                        q = Math.round(u + _ * (x + 1.5)),
                        S = a(D, k, I, C, q, Y);
                    c = c.concat([S.x1, S.y1, I, C, S.x2, S.y2])
                }
            }
            if (c = c.concat([I, C, I, C]), f.attr({
                    path: c
                }), 5 == w.lineNum)
                for (var x = 0, b = l; b > x; x++) {
                    var I = Math.round(u + _ * (x + .5)),
                        j = g.rect(u + _ * x, 0, _, o).attr({
                            stroke: "none",
                            fill: "#fff",
                            opacity: 0
                        });
                    M.push(j), w.rects.push(M[x])
                }
            w.lineNum++
        },
        _init: function() {
            this._setLine(e, _, "-"), this._setLine(n, y, "-"), this._setLine(r, m, ""), this._setLine(s, v, ""), this._setLine(i, f, ""), this._setLine(l, x, ""), this._setDot(), this._setToday(r), this._setTitle()
        },
        _setTitle: function() {
            var a = t[0].date;
            a.substr(0, 4) + "年" + a.substr(4, 2) + "月气温曲线", $("#holder0 .des").text("");
            var e = a.substr(4, 2);
            $(".monthDiv ul").find("li").removeClass("cur"), $(".monthDiv ul").find("li").eq(e - 1).addClass("cur")
        },
        _setToday: function() {
            var a = new Date,
                e = a.getMonth() + 1,
                n = a.getDate();
            $.each(t, function(t, a) {
                return a.date.substr(4, 2) == e ? ($("#holder0 .x span").eq(n - 1).addClass("today"), !1) : void 0
            })
        },
        triangleArray: new Array,
        _triangleL: function(t) {
            var a = 80,
                e = ["M", t, a + 8, "L", t + 8, a, t + 8, a + 16, t, a + 8, "z"],
                n = e.join(","),
                r = g.path(n).attr({
                    fill: "#1f6ebd",
                    stroke: "none",
                    opacity: "0.9"
                });
            w.triangleArray.push(r)
        },
        _triangleR: function(t) {
            var a = 80,
                e = ["M", t, a, "L", t + 8, a + 8, t, a + 16, t, a, "z"],
                n = e.join(","),
                r = g.path(n).attr({
                    fill: "#1f6ebd",
                    stroke: "none",
                    opacity: "0.9"
                });
            w.triangleArray.push(r)
        },
        _setDot: function() {
            var t = -150,
                a = 60,
                e = g.rect(t, a, 140, 90).attr({
                    fill: "#1f6ebd",
                    stroke: "none",
                    opacity: "0.9"
                }),
                n = g.set();
            n.push(g.text(t + 22, a + 20), g.text(t + 22, a + 41), g.text(t + 22, a + 65), g.text(t + 22, a + 86)), n.attr({
                fill: "#fff",
                "text-anchor": "start",
                "font-size": "12px"
            }), g.set();
            for (var r = w.rects.length - 1; r >= 0; r--) ! function(r, s, i, l, c, d, o, u, p) {
                s.mouseover(function() {
                    w.circles[0].attr("cx", i.attrs.cx).attr("cy", i.attrs.cy), w.circles[1].attr("cx", l.attrs.cx).attr("cy", l.attrs.cy), w.circles[2].attr("cx", c.attrs.cx).attr("cy", c.attrs.cy), w.circles[3].attr("cx", d.attrs.cx).attr("cy", d.attrs.cy), w.circles[4].attr("cx", o.attrs.cx).attr("cy", o.attrs.cy), w.circles[5].attr("cx", u.attrs.cx).attr("cy", u.attrs.cy), $("#holder0 .x span").removeClass("on").eq(r).addClass("on"), c.tit ? (n[0].attr({
                        text: "预报高温：" + c.tit + "℃",
                        y: a + 17
                    }), n[1].attr({
                        text: "预报低温：" + d.tit + "℃",
                        y: a + 35
                    }), n[2].attr({
                        text: "历史均值高温：" + i.tit + "℃",
                        y: a + 53
                    }), n[3].attr({
                        text: "历史均值低温：" + l.tit + "℃",
                        y: a + 71
                    })) : o.tit ? (n[0].attr({
                        text: "实况高温：" + o.tit + "℃",
                        y: a + 17
                    }), n[1].attr({
                        text: "实况低温：" + u.tit + "℃",
                        y: a + 35
                    }), n[2].attr({
                        text: "历史均值高温：" + i.tit + "℃",
                        y: a + 53
                    }), n[3].attr({
                        text: "历史均值低温：" + l.tit + "℃",
                        y: a + 71
                    })) : (n[0].attr({
                        y: "-100"
                    }), n[1].attr({
                        y: "-100"
                    }), n[2].attr({
                        text: "历史均值高温：" + i.tit + "℃",
                        y: a + 34
                    }), n[3].attr({
                        text: "历史均值低温：" + l.tit + "℃",
                        y: a + 56
                    }));
                    var t = i.attrs.cx;
                    200 > t ? (n.attr({
                        x: t - 160 + 188
                    }), e.attr({
                        x: t - 168 + 188
                    }), w._triangleL(t + 12)) : (n.attr({
                        x: t - 128 - 20
                    }), e.attr({
                        x: t - 138 - 20
                    }), w._triangleR(t + 2 - 20)), p.attr("stroke", "#bfccd2")
                }), s.mouseout(function() {
                    for (var a = w.triangleArray.length - 1; a >= 0; a--) w.triangleArray[a].attr({
                        opacity: "0"
                    });
                    w.triangleArray = [], w.circles[0].attr("cx", -100).attr("cy", -100), w.circles[1].attr("cx", -100).attr("cy", -100), w.circles[2].attr("cx", -100).attr("cy", -100), w.circles[3].attr("cx", -100).attr("cy", -100), w.circles[4].attr("cx", -100).attr("cy", -100), w.circles[5].attr("cx", -100).attr("cy", -100), $("#holder0 .x span").removeClass("on"), e.attr("x", t), n.attr("x", t), w._triangleL(-80), p.attr("stroke", "#eff0f2")
                })
            }(r, w.rects[r], w.dots[0][r], w.dots[1][r], w.dots[2][r], w.dots[3][r], w.dots[4][r], w.dots[5][r], w.gridLines[r])
        }
    };
    w._init()
}
var cityd = location.href.match(/\d{9}/)[0],
    current_time = new Date,
    current_year = current_time.getFullYear(),
    current_month = current_time.getMonth() + 1,
    current_day = current_time.getDate(),
    nnext_year = current_time.getFullYear() + 2,
    next_year = current_time.getFullYear() + 1,
    pre_year = current_time.getFullYear() - 1,
    ppre_year = current_time.getFullYear() - 2;
$(".input_nian").val(current_year + "年"), $(".input_yue").val(current_month + "月");
var topUpTime = $("#update_time").val();
$(".updateTime").html(topUpTime + " <span style='color:#d7d7d7'>|</span> 数据来源 中央气象台"), $(".W_left .title span.fhjt a").click(function() {
    $(".input_nian").val(current_year + "年"), $(".input_yue").val(current_month + "月"), $(".k").hide(), ajax_upload(), addDate()
});
var chu_Year = parseInt($(".input_nian").val()),
    chu_Yue = parseInt($(".input_yue").val());
$(".L_icon").toggle(function() {
    $(".L_nian_list").slideDown()
}, function() {
    $(".L_nian_list").slideUp()
}), $(".Y_icon").toggle(function() {
    $(".L_yue_list").slideDown()
}, function() {
    $(".L_yue_list").slideUp()
});
var now_y = 0;
$(".Y_left,#holder0 .turnLeft,.turnLeftBtn").live("click", function() {
    $(".W_left .title .L_yue .Y_right").css({
        opacity: "1"
    }), $(".turnRightBtn").css({
        opacity: "1"
    }), $(".k").hide();
    var t = current_year,
        a = pre_year;
    6 > current_month && (t = pre_year, a = ppre_year), 1 == parseInt($(".input_yue").val()) && parseInt($(".input_nian").val()) > t ? ($(".input_nian").val(parseInt($(".input_nian").val()) - 1 + "年"), $(".input_yue").val("12月")) : (now_y = jiequ($(".input_yue").val()) - 1, now_y > 0 && parseInt($(".input_nian").val()) > a ? $(".input_yue").val(now_y + "月") : ($(".W_left .title .L_yue .Y_left").css({
        opacity: "0.2"
    }), $(".turnLeftBtn").css({
        opacity: "0"
    }), $("#holder0 .turnLeft").css({
        background: "none"
    }))), chu_Yue != parseInt($(".input_yue").val()) && (chu_Yue = parseInt($(".input_yue").val()), ajax_upload())
}), $(".Y_right,#holder0 .turnRight,.turnRightBtn").live("click", function() {
    $(".W_left .title .L_yue .Y_left").css({
        opacity: "1"
    }), $(".turnLeftBtn").css({
        opacity: "1"
    }), $(".k").hide();
    var t = next_year,
        a = nnext_year;
    6 > current_month && (t = current_year, a = next_year), 12 == parseInt($(".input_yue").val()) && parseInt($(".input_nian").val()) < t ? ($(".input_nian").val(parseInt($(".input_nian").val()) + 1 + "年"), $(".input_yue").val("1月")) : (now_y = jiequ($(".input_yue").val()) + 1, 13 > now_y && parseInt($(".input_nian").val()) < a ? $(".input_yue").val(now_y + "月") : ($(".W_left .title .L_yue .Y_righ").css({
        opacity: "0.2"
    }), $(".turnRightBtn").css({
        opacity: "0"
    }), $("#holder0 .turnRight").css({
        background: "none"
    }))), chu_Yue != parseInt($(".input_yue").val()) && (chu_Yue = parseInt($(".input_yue").val()), ajax_upload())
}), $(".monthDiv ul li").live("click", function() {
    $(".turnRightBtn").css({
        opacity: "1"
    }), $(".turnLeftBtn").css({
        opacity: "1"
    }), $(".input_yue").val($(this).text()), chu_Yue = parseInt($(".input_yue").val()), ajax_upload()
});
var date = "",
    pre_date = "",
    nex_date = "",
    url = "",
    pre_url = "",
    next_url = "";
ajax_upload();