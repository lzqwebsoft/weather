package model

import (
	"fmt"
	"regexp"
	"strconv"
	"time"
)

// Weather 城市的天气数据
type Weather struct {
	UpdateTime string       `json:"update_time"` // 天气更新时间
	DataSource string       `json:"data_source"` // 数据来源
	Now        *Live        `json:"now"`         // 实况天气
	Daily      []*DailyItem `json:"dailies"`     // 七天天气预报信息，从昨天开始
}

// Live 实况天气
type Live struct {
	Time             string `json:"time"`        // 实况天气的时间
	TempF            string `json:"tempf"`       // 实况温度，华氏
	Temp             string `json:"temp"`        // 实况的温度，摄氏
	Weather          string `json:"weather"`     // 实况天气
	WeatherCode      string `json:"weathercode"` // 实况天气码
	Rain             string `json:"rain"`        // 降雨概率
	Rain24h          string `json:"rain24h"`     // 24小时降雨概率
	WindDirection    string `json:"WD"`          // 风向
	WindLevel        string `json:"WS"`          // 风级
	WindSpeed        string `json:"wse"`         // 风速
	Visibility       string `json:"njd"`         // 能见度
	AirPressure      string `json:"qy"`          // 气压
	AQI              string `json:"aqi"`         // 实时空气质量指数
	AQIPM25          string `json:"aqi_pm25"`    // 实时空气质量指数PM25
	AQITxt           string `json:"aqi_txt"`     // 实时空气质量说明
	CityCode         string `json:"city"`        // 城市码
	CityName         string `json:"cityname"`    // 城市名称
	DateLabel        string `json:"date"`        // 当前日期
	DateDetail       string `json:"date_detail"` // 当前日期年月日YYYYMMDD
	CityNameEng      string `json:"nameen"`      // 城市英文名
	RelativeHumidity string `json:"sd"`          // 相对湿度
}

// GetAQIText 空气质量描述
func (live *Live) GetAQIText() string {
	aqi, err := strconv.Atoi(live.AQI)
	if err != nil {
		return ""
	}
	switch {
	case aqi <= 50:
		return "优"
	case aqi <= 100:
		return "良"
	case aqi <= 150:
		return "轻度污染"
	case aqi <= 200:
		return "中度污染"
	case aqi <= 300:
		return "重度污染"
	case aqi > 300:
		return "严重污染"
	default:
		return ""
	}
}

// GetDateDetail 获取当前日期详情
func (live *Live) GetDateDetail() time.Time {
	loc, _ := time.LoadLocation("Asia/Shanghai")
	now := time.Now().In(loc)
	dateRegexp := regexp.MustCompile(`(\d{1,2})月(\d{1,2})日`)
	if match := dateRegexp.FindAllStringSubmatch(live.DateLabel, 1); match != nil && len(match) == 1 {
		dateStr := fmt.Sprintf("%d-%s-%s", now.Year(), match[0][1], match[0][2])
		weatherDate, _ := time.Parse("2006-01-02", dateStr)
		return weatherDate
	}
	return now
}

// DailyItem 单天的天气信息
type DailyItem struct {
	Date          string       `json:"date"`                  // Date 天气日期YYYYMMDD
	Week          string       `json:"week"`                  // Week 星期几
	WeatherInfo   string       `json:"weather_info"`          // WeatherInfo 天气信息
	WeatherCode   []string     `json:"weather_code"`          // WeatherCode 天气图标，两个为白天与夜晚
	WindDirection string       `json:"wind_direction"`        // WindDirection 风向
	WindLevel     string       `json:"wind_level"`            // WindLevel 风级
	MaxTemp       string       `json:"max_temp"`              // MaxTemp 最高温度 单位摄氏
	MinTemp       string       `json:"min_temp"`              // MinTemp 最低温度 单位摄氏
	SunUpTime     string       `json:"sun_rise,omitempty"`    // SunUpTime 日出时间
	SunDownTime   string       `json:"sun_reset,omitempty"`   // SunDownTime 日落时间
	LifeStyles    []*LifeStyle `json:"life_style,omitempty"`  // 一些生活指数
	Hours3Data    []*HourData  `json:"hours3_data,omitempty"` // Hours3Data 分段天气，一般分为24个小时
}

// DecodeHours3Data 解码所有分时预报信息
func (daily *DailyItem) DecodeHours3Data() {
	for i, item := range daily.Hours3Data {
		if ok := item.decodeHourData(); ok {
			daily.Hours3Data[i] = item
		}
	}
}

// GetCNWeekday 获取星期几
func (daily *DailyItem) GetCNWeekday(weakday *time.Time) string {
	week := []string{"星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"}
	return week[int(weakday.Weekday())]
}

// LifeStyle 生活指数
type LifeStyle struct {
	Name        string `json:"name"`        // 生活指数名称
	Grading     string `json:"grading"`     // 生活指数级别
	Description string `json:"description"` // 生活指数描述
}

func (lifeStyle *LifeStyle) String() string {
	return fmt.Sprintf("%s-%s-%s\r\n", lifeStyle.Name, lifeStyle.Name, lifeStyle.Description)
}

// HourData 分段天气最小单元
type HourData struct {
	IconCode string `json:"ja"`    // 天气图标码
	Weather  string `json:"txt"`   // 天气说明
	Tempe    string `json:"jb"`    // 温度
	WindDY   string `json:"jd"`    // 风向
	WindJB   string `json:"jc"`    // 风级
	Time     string `json:"jf"`    // 天气时刻YYYYMMDDHH
	CNTime   string `json:"cn_jf"` // 中文天气时刻：例上午08时
	IsDecode bool   `json:"-"`     // 判断信息是否解码
}

// String 格式化数据
func (hdata *HourData) String() string {
	return fmt.Sprintf("%s天气：%s %s %s %s", hdata.Time, hdata.Weather, hdata.Tempe, hdata.WindDY, hdata.WindJB)
}

// 逐小时预报转码所需要的信息
// 表示风向
var allWindDY = [10]string{"无持续风向", "东北风", "东风", "东南风", "南风", "西南风", "西风", "西北风", "北风", "旋转风"}

// 表示风级
var allWindJB = [10]string{"<3级", "3-4级", "4-5级", "5-6级", "6-7级", "7-8级", "8-9级", "9-10级", "10-11级", "11-12级"}

// 所有的天气信息 n表示夜晚天气，d表示白天天气
var allWeatherInfo = map[string]string{
	"n00":  "晴",
	"n01":  "多云",
	"n02":  "阴",
	"n03":  "阵雨",
	"n04":  "雷阵雨",
	"n05":  "雷阵雨伴有冰雹",
	"n06":  "雨夹雪",
	"n07":  "小雨",
	"n08":  "中雨",
	"n09":  "大雨",
	"n10":  "暴雨",
	"n11":  "大暴雨",
	"n12":  "特大暴雨",
	"n13":  "阵雪",
	"n14":  "小雪",
	"n15":  "中雪",
	"n16":  "大雪",
	"n17":  "暴雪",
	"n18":  "雾",
	"n19":  "冻雨",
	"n20":  "沙尘暴",
	"n21":  "小到中雨",
	"n22":  "中到大雨",
	"n23":  "大到暴雨",
	"n24":  "暴雨到大暴雨",
	"n25":  "大暴雨到特大暴雨",
	"n26":  "小到中雪",
	"n27":  "中到大雪",
	"n28":  "大到暴雪",
	"n29":  "浮尘",
	"n30":  "扬沙",
	"n31":  "强沙尘暴",
	"n53":  "霾",
	"n32":  "浓雾",
	"n49":  "强浓雾",
	"n54":  "中度霾",
	"n55":  "重度霾",
	"n56":  "严重霾",
	"n57":  "大雾",
	"n58":  "特强浓雾",
	"n97":  "雨",
	"n98":  "雪",
	"n301": "雨",
	"n302": "雪",
	"n99":  "N/A",
	"d00":  "晴",
	"d01":  "多云",
	"d02":  "阴",
	"d03":  "阵雨",
	"d04":  "雷阵雨",
	"d05":  "雷阵雨伴有冰雹",
	"d06":  "雨夹雪",
	"d07":  "小雨",
	"d08":  "中雨",
	"d09":  "大雨",
	"d10":  "暴雨",
	"d11":  "大暴雨",
	"d12":  "特大暴雨",
	"d13":  "阵雪",
	"d14":  "小雪",
	"d15":  "中雪",
	"d16":  "大雪",
	"d17":  "暴雪",
	"d18":  "雾",
	"d19":  "冻雨",
	"d20":  "沙尘暴",
	"d21":  "小到中雨",
	"d22":  "中到大雨",
	"d23":  "大到暴雨",
	"d24":  "暴雨到大暴雨",
	"d25":  "大暴雨到特大暴雨",
	"d26":  "小到中雪",
	"d27":  "中到大雪",
	"d28":  "大到暴雪",
	"d29":  "浮尘",
	"d30":  "扬沙",
	"d31":  "强沙尘暴",
	"d53":  "霾",
	"d99":  "N/A",
	"d32":  "浓雾",
	"d49":  "强浓雾",
	"d54":  "中度霾",
	"d55":  "重度霾",
	"d56":  "严重霾",
	"d57":  "大雾",
	"d58":  "特强浓雾",
	"d97":  "雨",
	"d98":  "雪",
	"d301": "雨",
	"d302": "雪",
}

// {"00":"晴","01":"多云","02":"阴","03":"阵雨","04":"雷阵雨","05":"雷阵雨伴有冰雹","06":"雨夹雪","07":"小雨","08":"中雨","09":"大雨","10":"暴雨",
//  "11":"大暴雨","12":"特大暴雨","13":"阵雪","14":"小雪","15":"中雪","16":"大雪","17":"暴雪","18":"雾","19":"冻雨","20":"沙尘暴","21":"小到中雨",
//  "22":"中到大雨","23":"大到暴雨","24":"暴雨到大暴雨","25":"大暴雨到特大暴雨","26":"小到中雪","27":"中到大雪","28":"大到暴雪","29":"浮尘","30":"扬沙",
//  "31":"强沙尘暴","53":"霾","99":""};

// String 转为string
func (daily *DailyItem) String() string {
	hours3Datas := ""
	for _, item := range daily.Hours3Data {
		hours3Datas += item.String() + "\r\n"
	}
	return fmt.Sprintf("%s %s %s 最高温%s 最低温%s 日出: %s 日落: %s\r\n分时天气:\r\n%s\r\n%s\r\n",
		daily.WeatherInfo, daily.WindDirection, daily.WindLevel, daily.MaxTemp, daily.MinTemp,
		daily.SunUpTime, daily.SunDownTime, hours3Datas, daily.LifeStyles)
}

// DecodeHourData 解密逐小时预报
// from js source: http://i.tq121.com.cn/j/weather2017/7d.js
// "ja":"02","jb":"10","jc":"1","jd":"8","je":"71","jf":"2020041008"
// ja: 天气图标的位置css样式  w: 35px; h: 35px; 总的是W：960，H: 320
// jb: 温度
// jc: 风级
// jd：风向
// je: @TODO 未解密
// jf: 日期与时刻
func (hdata *HourData) decodeHourData() bool {
	if hdata.IsDecode {
		return hdata.IsDecode
	}
	// 解码天气 l.wather = n > 5 && 20 > n ? "d" + r.ja : "n" + r.ja,
	watherCSS, err := strconv.Atoi(hdata.IconCode)
	if err != nil {
		return false
	}
	if watherCSS > 5 && 20 > watherCSS {
		hdata.IconCode = "d" + hdata.IconCode
	} else {
		hdata.IconCode = "n" + hdata.IconCode
	}
	if weatherTxt, ok := allWeatherInfo[hdata.IconCode]; ok {
		hdata.Weather = weatherTxt // 代码转文字
	}

	// 解码时间 r.jf.slice(8, 10);l.time = n
	wtime, err := time.Parse("2006010215", hdata.Time)
	if err != nil {
		return false
	}
	hour, _, _ := wtime.Clock()
	if hour > 12 {
		hour = hour - 12
		hdata.CNTime = fmt.Sprintf("下午%02d时", hour)
	} else {
		hdata.CNTime = fmt.Sprintf("上午%02d时", hour)
	}

	// 解码温度 l.template = r.jb
	hdata.Tempe += "°C"
	// 解码风向 l.windDY = o[r.jd]
	dyIDX, err := strconv.Atoi(hdata.WindDY)
	if err != nil {
		return false
	}
	hdata.WindDY = allWindDY[dyIDX]
	// 解码风级 l.windJB = a[r.jc]
	jbIDX, err := strconv.Atoi(hdata.WindJB)
	if err != nil {
		return false
	}
	hdata.WindJB = allWindJB[jbIDX]
	hdata.IsDecode = true
	return true
}
