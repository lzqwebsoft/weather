package model

import (
	"fmt"
	"strconv"
	"time"
)

// DailyItem 单天的天气信息
type DailyItem struct {
	// 天气日期
	Date string
	// WeatherInfo 天气信息
	WeatherInfo string
	// WindDirection 风向
	WindDirection string
	// WindLevel 风级
	WindLevel string
	// MaxTemp 最高温度 单位摄氏
	MaxTemp string
	// MinTemp 最低温度 单位摄氏
	MinTemp string
	// SunUpTime 日出时间
	SunUpTime string
	// SunDownTime 日落时间
	SunDownTime string
	// Ultraviolet 紫外线强度
	Ultraviolet string
	// UltravioletTxt 紫外线强度说明
	UltravioletTxt string
	// LoseWeight 减肥易度
	LoseWeight string
	// LoseWeightText 减肥易度说明
	LoseWeightTxt string
	// BloodSugar 血糖指数
	BloodSugar string
	// BloodSugarTxt 血糖指数描述
	BloodSugarTxt string
	// Dressing 穿衣指数
	Dressing string
	// DressingTxt  穿衣指数描述
	DressingTxt string
	// CarWash 洗车指数
	CarWash string
	// CarWashTxt 洗车指数描述
	CarWashTxt string
	// AirPollutionSpread 空气污染扩散指数
	AirPollutionSpread string
	// AirPollutionSpreadTxt 空气污染扩散指数描述
	AirPollutionSpreadTxt string
	// Hours3Data 分段天气，一般分为24个小时
	Hours3Data []HourData
}

// DecodeHours3Data 解码所有分时预报信息
func (daily *DailyItem) DecodeHours3Data() {
	for i, item := range daily.Hours3Data {
		if ok := item.decodeHourData(); ok {
			daily.Hours3Data[i] = item
		}
	}
}

// HourData 分段天气最小单元
type HourData struct {
	Weather  string `json:"ja"` // 天气
	Tempe    string `json:"jb"` // 温度
	WindDY   string `json:"jd"` // 风向
	WindJB   string `json:"jc"` // 风级
	Time     string `json:"jf"` // 天气时刻
	IsDecode bool   `json:"-"`  // 判断信息是否解码
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
	"n00": "晴",
	"n01": "多云",
	"n02": "阴",
	"n03": "阵雨",
	"n07": "小雨",
	"n08": "中雨",
	"n10": "暴雨",
	"n11": "大暴雨",
	"n12": "特大暴雨",
	"n13": "阵雪",
	"n14": "小雪",
	"n15": "中雪",
	"n16": "大雪",
	"n17": "暴雪",
	"n18": "雾",
	"n19": "冻雨",
	"n20": "沙尘暴",
	"n21": "小到中雨",
	"n22": "中到大雨",
	"n23": "大到暴雨",
	"n24": "暴雨到大暴雨",
	"n25": "大暴雨到特大暴雨",
	"n26": "小到中雪",
	"n27": "中到大雪",
	"n28": "大到暴雪",
	"n29": "浮尘",
	"n30": "扬沙",
	"n31": "强沙尘暴",
	"n53": "霾",
	"n99": "N/A",
	"d00": "晴",
	"d01": "多云",
	"d02": "阴",
	"d03": "阵雨",
	"d06": "雨夹雪",
	"d07": "小雨",
	"d08": "中雨",
	"d10": "暴雨",
	"d11": "大暴雨",
	"d12": "特大暴雨",
	"d13": "阵雪",
	"d14": "小雪",
	"d15": "中雪",
	"d16": "大雪",
	"d17": "暴雪",
	"d18": "雾",
	"d19": "冻雨",
	"d20": "沙尘暴",
	"d21": "小到中雨",
	"d22": "中到大雨",
	"d23": "大到暴雨",
	"d24": "暴雨到大暴雨",
	"d25": "大暴雨到特大暴雨",
	"d26": "小到中雪",
	"d27": "中到大雪",
	"d28": "大到暴雪",
	"d29": "浮尘",
	"d30": "扬沙",
	"d31": "强沙尘暴",
	"d53": "霾",
	"d99": "N/A",
}

// {"00":"晴","01":"多云","02":"阴","03":"阵雨","04":"雷阵雨","05":"雷阵雨伴有冰雹","06":"雨夹雪","07":"小雨","08":"中雨","09":"大雨","10":"暴雨",
//  "11":"大暴雨","12":"特大暴雨","13":"阵雪","14":"小雪","15":"中雪","16":"大雪","17":"暴雪","18":"雾","19":"冻雨","20":"沙尘暴","21":"小到中雨",
//  "22":"中到大雨","23":"大到暴雨","24":"暴雨到大暴雨","25":"大暴雨到特大暴雨","26":"小到中雪","27":"中到大雪","28":"大到暴雪","29":"浮尘","30":"扬沙",
//  "31":"强沙尘暴","53":"霾","99":""};

// String 转为string
func (daily *DailyItem) String() string {
	hours2Datas := ""
	for _, item := range daily.Hours3Data {
		hours2Datas += item.String() + "\r\n"
	}
	return fmt.Sprintf("%s %s %s 最高温%s 最低温%s 日出: %s 日落: %s\r\n分时天气:\r\n%s\r\n%s-%s\r\n%s-%s\r\n%s-%s\r\n%s-%s\r\n%s-%s\r\n%s-%s\r\n",
		daily.WeatherInfo, daily.WindDirection, daily.WindLevel, daily.MaxTemp, daily.MinTemp,
		daily.SunUpTime, daily.SunDownTime, hours2Datas, daily.Ultraviolet, daily.UltravioletTxt, daily.LoseWeight, daily.LoseWeightTxt,
		daily.BloodSugar, daily.BloodSugarTxt, daily.Dressing, daily.DressingTxt, daily.CarWash, daily.CarWashTxt,
		daily.AirPollutionSpread, daily.AirPollutionSpreadTxt)
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
	watherCSS, err := strconv.Atoi(hdata.Weather)
	if err != nil {
		return false
	}
	if watherCSS > 5 && 20 > watherCSS {
		hdata.Weather = "d" + hdata.Weather
	} else {
		hdata.Weather = "n" + hdata.Weather
	}
	if weatherTxt, ok := allWeatherInfo[hdata.Weather]; ok {
		hdata.Weather = weatherTxt // 代码转文字
	}

	// 解码时间 r.jf.slice(8, 10);l.time = n
	wtime, err := time.Parse("2006010215", hdata.Time)
	if err != nil {
		return false
	}
	hdata.Time = wtime.Format("15时")

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
