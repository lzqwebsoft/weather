package util

import (
	"bytes"
	"encoding/json"
	"fmt"
	"image"
	"io/ioutil"
	"regexp"
	"strings"
	"time"

	"golang.org/x/net/html"
	"websoft.club/weather/model"

	"github.com/PuerkitoBio/goquery"
)

// GetCNWeather 请求中央气象台获取天气数据
// 例 http://www.weather.com.cn/weathern/101200208.shtml
func GetCNWeather(cityCode string) (*model.Weather, error) {
	weather := new(model.Weather)
	weather.DataSource = "中央气象台"
	liveReferer := fmt.Sprintf("http://www.weather.com.cn/weather1dn/%s.shtml", cityCode)
	headers := map[string]string{
		"referer":    liveReferer,
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
	}
	// ============================================================================
	//                            获取实时天气预报
	// ============================================================================
	liveURL := fmt.Sprintf("http://d1.weather.com.cn/sk_2d/%s.html", cityCode)
	liveResult, err := Get(liveURL, nil, headers)
	if err != nil {
		return nil, fmt.Errorf("获取实时天气失败: " + err.Error())
	}
	liveVarRegexp := regexp.MustCompile("^var ([0-9A-Za-z_ ]+)?=(.+);?$")
	currentDate := time.Now()
	if matches := liveVarRegexp.FindAllSubmatch(liveResult, 1); matches != nil && len(matches) == 1 {
		live := new(model.Live)
		if err = json.Unmarshal(matches[0][2], live); err == nil {
			live.AQITxt = live.GetAQIText()
			currentDate = live.GetDateDetail()
			live.DateDetail = currentDate.Format("20060102")
			live.WindSpeed = html.UnescapeString(live.WindSpeed)
			weather.Now = live
		} else {
			return nil, fmt.Errorf("解析实时天气失败: " + err.Error())
		}
	} else {
		return nil, fmt.Errorf("解析实时天气失败。")
	}
	// ============================================================================
	//                            获取七天天气预报
	// ============================================================================
	urlPath := fmt.Sprintf("http://www.weather.com.cn/weathern/%s.shtml", cityCode)
	result, err := Get(urlPath, nil, headers)
	if err != nil {
		return nil, fmt.Errorf("获取七天天气预报失败: %s", err.Error())
	}
	doc, err := goquery.NewDocumentFromReader(bytes.NewReader(result))
	if err != nil {
		return nil, fmt.Errorf("解析七天天气预报HTML失败: %s", err.Error())
	}

	// 获取更新时间
	updateTime, _ := doc.Find("input#update_time").Attr("value")
	weather.UpdateTime = updateTime

	// doc.Find("title").Text().SubStgrin   // title里面有位置信息
	weathers := make([]*model.DailyItem, 0)
	doc.Find("div.weather_7d > div > ul.blue-container.sky li.blue-item").Each(func(i int, s *goquery.Selection) {
		item := new(model.DailyItem)
		item.WeatherInfo = s.Find("p.weather-info").Text() // 天气
		windSelection := s.Find("div.wind-container")
		WindDirection01, _ := windSelection.Find("i.wind-icon").First().Attr("title")
		WindDirection02, _ := windSelection.Find("i.wind-icon").Last().Attr("title")
		item.WindDirection = WindDirection01 + "转" + WindDirection02  // 风向
		item.WindLevel = s.Find("p.wind-info").Text()                 // 风级
		item.Date = currentDate.AddDate(0, 0, i-1).Format("20060102") // 解析时间
		weathers = append(weathers, item)
	})
	// 获取温度与太阳升起与落下时间
	jsscript := doc.Find("div.weather_7d > div.blueFor-container > script").Text()
	jsVarRegexp := regexp.MustCompile("var ([0-9A-Za-z_ ]+)?=([\\[\\]:0-9a-zA-Z\",\\{\\}]+);?")
	for _, match := range jsVarRegexp.FindAllSubmatch([]byte(jsscript), -1) {
		// fmt.Println(string(match[1]) + "--------" + string(match[2]))
		if len(match) != 3 {
			continue
		}
		varname := strings.TrimSpace(string(match[1]))
		if varname == "eventDay" {
			// 最高温度
			var maxTemps []string
			err = json.Unmarshal(match[2], &maxTemps)
			for idx, temp := range maxTemps {
				weathers[idx].MaxTemp = temp
			}
		} else if varname == "eventNight" {
			// 最低温度
			var minTemps []string
			json.Unmarshal(match[2], &minTemps)
			for idx, value := range minTemps {
				weathers[idx].MinTemp = value
			}
		} else if varname == "sunup" {
			// 太阳升起时间，从今天开始
			var upTimes []string
			json.Unmarshal(match[2], &upTimes)
			for idx, value := range upTimes {
				weathers[idx+1].SunUpTime = value
			}
		} else if varname == "sunset" {
			// 太阳落下时间，从今天开始
			var downTimes []string
			json.Unmarshal(match[2], &downTimes)
			for idx, value := range downTimes {
				weathers[idx+1].SunDownTime = value
			}
		}
	}
	// 各种指数
	doc.Find("div.weather_shzs > div.lv").Each(func(d int, s *goquery.Selection) {
		s.Find("dl").Each(func(i int, selection *goquery.Selection) {
			lifeStyle := new(model.LifeStyle)
			if i == 0 {
				// 紫外线
				lifeStyle.Name = "紫外线"
			} else if i == 1 {
				// 减肥
				lifeStyle.Name = "减肥"
			} else if i == 2 {
				// 血糖
				lifeStyle.Name = "血糖"
			} else if i == 3 {
				// 穿衣
				lifeStyle.Name = "穿衣"
			} else if i == 4 {
				// 洗车
				lifeStyle.Name = "洗车"
			} else if i == 5 {
				// 空气污染扩散
				lifeStyle.Name = "空气污染扩散"
			}
			lifeStyle.Grading = selection.Find("dt > em").Text()
			lifeStyle.Description = selection.Find("dd").Text()
			weathers[d+1].LifeStyles = append(weathers[d+1].LifeStyles, lifeStyle)
		})
	})
	// 分时天气预报
	hours3JSScript := doc.Find("div.weather_7d > div > div > script").Text()
	for _, match := range jsVarRegexp.FindAllSubmatch([]byte(hours3JSScript), -1) {
		// fmt.Println(string(match[1]) + "--------" + string(match[2]))
		varname := strings.TrimSpace(string(match[1]))
		if varname == "hour3data" {
			var hour3data [][]*model.HourData
			json.Unmarshal(match[2], &hour3data)
			for idx, value := range hour3data {
				weathers[idx+1].Hours3Data = value
				// 解码分时天天气预报
				weathers[idx+1].DecodeHours3Data()
			}
		}
	}

	weather.Daily = weathers
	return weather, nil
}

// weatherIcons 天气图标文件
var weatherIcons = map[string]string{
	"normal":   "./images/weather_icon_wNow.png",   // https://i.tq121.com.cn/i/weather2017/weather_icon_wNow.png
	"normal_b": "./images/weather_icon_b.png",      // "https://i.tq121.com.cn/i/weather2017/weather_icon_b.png"
	"small":    "./images/weather_icon_d40s.png",   // "https://i.tq121.com.cn/i/weather2017/weather_icon_d40s.png"
	"small_b":  "./images/weather_icon_d40s_b.png", // "https://i.tq121.com.cn/i/weather2017/weather_icon_d40s_b.png"
	"medium":   "./images/weather_icon_d40m.png",   // "https://i.tq121.com.cn/i/weather2017/weather_icon_d40m.png"
	"medium_b": "./images/weather_icon_d40m_b.png", // https://i.tq121.com.cn/i/weather2017/weather_icon_d40m_b.png
	"large":    "./images/weather_icon_d40l.png",   // https://i.tq121.com.cn/i/weather2017/weather_icon_d40l.png
	"large_b":  "./images/weather_icon_d40l_b.png", // https://i.tq121.com.cn/i/weather2017/weather_icon_d40l_b.png
}

// WeatherIcon 天气图标对象
type WeatherIcon struct {
	Width               int         // 宽度
	Height              int         // 高度
	Position            image.Point // 图标位置
	FatherIconsLocation string      // 图标原始目录
}

// GetWeatherIcon 根据尺寸、及天气代码来得到天气图标对象
func GetWeatherIcon(size, wcode string) *WeatherIcon {
	wicon := new(WeatherIcon)
	switch {
	case size == "small" || size == "small_b":
		wicon.Width = 20
		wicon.Height = 23
		wicon.FatherIconsLocation = weatherIcons[size]
	case size == "medium" || size == "medium_b":
		wicon.Width = 40
		wicon.Height = 45
		wicon.FatherIconsLocation = weatherIcons[size]
	case size == "large" || size == "large_b":
		wicon.Width = 70
		wicon.Height = 77
		wicon.FatherIconsLocation = weatherIcons[size]
	default:
		wicon.Width = 35
		wicon.Height = 35
		wicon.FatherIconsLocation = weatherIcons["normal"]
		if strings.HasSuffix(size, "_b") {
			wicon.FatherIconsLocation = weatherIcons["normal_b"]
		}
	}
	wicon.Position = weatherIconsPoint[wcode]
	return wicon
}

// weatherIconsPoint 天气图标位置
var weatherIconsPoint = map[string]image.Point{
	"d00":  image.Pt(0, 0),
	"d01":  image.Pt(-78, 0),
	"d02":  image.Pt(-160, 0),
	"d03":  image.Pt(-240, 0),
	"d04":  image.Pt(-320, 0),
	"d05":  image.Pt(-400, 0),
	"d06":  image.Pt(-480, 0),
	"d07":  image.Pt(-560, 0),
	"d08":  image.Pt(-640, 0),
	"d09":  image.Pt(-720, 0),
	"d10":  image.Pt(-800, 0),
	"d11":  image.Pt(-880, 0),
	"d12":  image.Pt(0, -80),
	"d13":  image.Pt(-80, -80),
	"d14":  image.Pt(-160, -80),
	"d15":  image.Pt(-240, -80),
	"d16":  image.Pt(-320, -80),
	"d17":  image.Pt(-400, -80),
	"d18":  image.Pt(-480, -80),
	"d19":  image.Pt(-560, -80),
	"d20":  image.Pt(-640, -80),
	"d21":  image.Pt(-720, -80),
	"d22":  image.Pt(-800, -80),
	"d23":  image.Pt(-880, -80),
	"d24":  image.Pt(0, -160),
	"d25":  image.Pt(-80, -160),
	"d26":  image.Pt(-160, -160),
	"d27":  image.Pt(-240, -160),
	"d28":  image.Pt(-320, -160),
	"d29":  image.Pt(-400, -160),
	"d30":  image.Pt(-480, -160),
	"d31":  image.Pt(-560, -160),
	"d53":  image.Pt(-640, -160),
	"d99":  image.Pt(-720, -160),
	"d32":  image.Pt(-800, -160),
	"d49":  image.Pt(-880, -160),
	"d54":  image.Pt(0, -240),
	"d55":  image.Pt(-80, -240),
	"d56":  image.Pt(-160, -240),
	"d57":  image.Pt(-800, -160),
	"d58":  image.Pt(-800, -160),
	"d301": image.Pt(-400, -240),
	"d302": image.Pt(-480, -240),
	"d97":  image.Pt(-400, -240),
	"d98":  image.Pt(-480, -240),
	"n00":  image.Pt(-560, -240),
	"n02":  image.Pt(-160, 0),
	"n01":  image.Pt(-640, -240),
	"n03":  image.Pt(-720, -240),
	"n04":  image.Pt(-320, 0),
	"n05":  image.Pt(-400, 0),
	"n06":  image.Pt(-480, 0),
	"n07":  image.Pt(-560, 0),
	"n08":  image.Pt(-640, 0),
	"n09":  image.Pt(-720, 0),
	"n10":  image.Pt(-800, 0),
	"n11":  image.Pt(-880, 0),
	"n12":  image.Pt(0, -80),
	"n13":  image.Pt(-800, -240),
	"n14":  image.Pt(-160, -80),
	"n15":  image.Pt(-240, -80),
	"n16":  image.Pt(-320, -80),
	"n17":  image.Pt(-400, -80),
	"n18":  image.Pt(-480, -80),
	"n19":  image.Pt(-560, -80),
	"n20":  image.Pt(-640, -80),
	"n21":  image.Pt(-720, -80),
	"n22":  image.Pt(-800, -80),
	"n23":  image.Pt(-880, -80),
	"n24":  image.Pt(0, -160),
	"n25":  image.Pt(-80, -160),
	"n26":  image.Pt(-160, -160),
	"n27":  image.Pt(-240, -160),
	"n28":  image.Pt(-320, -160),
	"n29":  image.Pt(-400, -160),
	"n30":  image.Pt(-480, -160),
	"n31":  image.Pt(-560, -160),
	"n53":  image.Pt(-640, -160),
	"n99":  image.Pt(-720, -160),
	"n32":  image.Pt(-800, -160),
	"n49":  image.Pt(-880, -160),
	"n54":  image.Pt(0, -240),
	"n55":  image.Pt(-80, -240),
	"n56":  image.Pt(-160, -240),
	"n57":  image.Pt(-800, -160),
	"n58":  image.Pt(-800, -160),
	"n301": image.Pt(-400, -240),
	"n302": image.Pt(-480, -240),
	"n97":  image.Pt(-400, -240),
	"n98":  image.Pt(-480, -240),
}

// LoadAllCitys 加载所有的城市列表
func LoadAllCitys() []*model.Provice {
	jsCityBytes, _ := ioutil.ReadFile("./sources/city.js")
	citysRegexp := regexp.MustCompile("^([0-9A-Za-z_. ]+)?=(.+);?$")
	if match := citysRegexp.FindAllSubmatch(jsCityBytes, 1); match != nil && len(match) == 1 {
		citys := make([]*model.Provice, 0)
		if err := json.Unmarshal(match[0][2], &citys); err == nil {
			return citys
		}
	}
	return nil
}
