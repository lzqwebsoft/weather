package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"regexp"
	"strings"

	"websoft.club/weather/model"
	"websoft.club/weather/util"

	"github.com/PuerkitoBio/goquery"
)

// GetWeather 请求中央气象台获取天气数据
// 例 http://www.weather.com.cn/weathern/101200208.shtml
func GetWeather(cityCode string) {
	urlPath := fmt.Sprintf("http://www.weather.com.cn/weathern/%s.shtml", cityCode)
	result, err := util.Get(urlPath, nil, nil)
	if err != nil {
		fmt.Println(err)
	}
	doc, err := goquery.NewDocumentFromReader(bytes.NewReader(result))
	if err != nil {
		fmt.Println(err)
	}
	// doc.Find("title").Text().SubStgrin   // title里面有位置信息
	weathers := make([]*model.DailyItem, 0)
	doc.Find("div.weather_7d > div > ul.blue-container.sky li.blue-item").Each(func(i int, s *goquery.Selection) {
		item := new(model.DailyItem)
		item.WeatherInfo = s.Find("p.weather-info").Text() // 天气
		windSelection := s.Find("div.wind-container")
		WindDirection01, _ := windSelection.Find("i.wind-icon").First().Attr("title")
		WindDirection02, _ := windSelection.Find("i.wind-icon").Last().Attr("title")
		item.WindDirection = WindDirection01 + "转" + WindDirection02 // 风向
		item.WindLevel = s.Find("p.wind-info").Text()                // 风级
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
			if i == 0 {
				// 紫外线
				weathers[d+1].Ultraviolet = selection.Find("dt > em").Text()
				weathers[d+1].UltravioletTxt = selection.Find("dd").Text()
			} else if i == 1 {
				// 减肥
				weathers[d+1].LoseWeight = selection.Find("dt > em").Text()
				weathers[d+1].LoseWeightTxt = selection.Find("dd").Text()
			} else if i == 2 {
				// 血糖
				weathers[d+1].BloodSugar = selection.Find("dt > em").Text()
				weathers[d+1].BloodSugarTxt = selection.Find("dd").Text()
			} else if i == 3 {
				// 穿衣
				weathers[d+1].Dressing = selection.Find("dt > em").Text()
				weathers[d+1].DressingTxt = selection.Find("dd").Text()
			} else if i == 4 {
				// 洗车
				weathers[d+1].CarWash = selection.Find("dt > em").Text()
				weathers[d+1].CarWashTxt = selection.Find("dd").Text()
			} else if i == 5 {
				// 空气污染扩散
				weathers[d+1].AirPollutionSpread = selection.Find("dt > em").Text()
				weathers[d+1].AirPollutionSpreadTxt = selection.Find("dd").Text()
			}
		})
	})
	// 分时天气预报
	hours3JSScript := doc.Find("div.weather_7d > div > div > script").Text()
	for _, match := range jsVarRegexp.FindAllSubmatch([]byte(hours3JSScript), -1) {
		// fmt.Println(string(match[1]) + "--------" + string(match[2]))
		varname := strings.TrimSpace(string(match[1]))
		if varname == "hour3data" {
			var hour3data [][]model.HourData
			json.Unmarshal(match[2], &hour3data)
			for idx, value := range hour3data {
				weathers[idx+1].Hours3Data = value
				// 解码分时天天气预报
				weathers[idx+1].DecodeHours3Data()
			}
		}
	}
	for _, item := range weathers {
		fmt.Println(item)
	}
}

func main() {
	GetWeather("101200805")
}
