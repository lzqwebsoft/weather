package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"image"
	"image/draw"
	"image/png"
	"log"
	"net/http"
	"os"
	"path"

	"websoft.club/weather/model"
	"websoft.club/weather/util"
)

// 城市码
// 来源：https://apip.weatherdt.com/float/static/js/city.js

// 欢迎页面
func welcome(resp http.ResponseWriter, reqs *http.Request) {
	basePath := path.Base(reqs.URL.Path)
	if basePath == "." || basePath == "/" {
		citycode := reqs.URL.Query().Get("code")
		// 没有城市码则读取IP地址对应的地址
		if citycode == "" {
			citycode = "101200805" // 默认为监利
			ipaddr := util.ClientIP(reqs)
			datas, err := util.GetCityByIP(ipaddr)
			if err == nil {
				// 由IP地址对应的城市名，找到对应的天气城市码
				if country, ok := datas["country_name"]; ok && country == "中国" {
					cityname := datas["city_name"]
					if citys := util.SearchCity(cityname); citys != nil && len(citys) > 0 {
						citycode = citys[0].Code
					}
				}
			}
		}
		// 由城市码查询对应的城市天气
		result, err := util.GetCNWeather(citycode)
		if err == nil && result != nil {
			templates := template.Must(template.ParseFiles("templates/index.html"))
			templates.Execute(resp, result)
			return
		}
		templates := template.Must(template.ParseFiles("templates/error.html"))
		templates.Execute(resp, err)
		return
	}
	resp.WriteHeader(404)
	fmt.Fprintf(resp, "<h1>404 Not Found!<h1>")
}

// 天气图标
func weatherIcon(resp http.ResponseWriter, reqs *http.Request) {
	resp.Header().Set("Content-Type", "image/png")

	size := reqs.URL.Query().Get("size")   // 图标大小及模式
	wcode := reqs.URL.Query().Get("wcode") // 天气代码
	if wcode == "" {
		wcode = "n99"
	}
	wiconData := util.GetWeatherIcon(size, wcode)
	bgfile, _ := os.Open(wiconData.FatherIconsLocation)
	defer bgfile.Close()
	bgimg, _ := png.Decode(bgfile)
	weatherIcon := image.NewRGBA(image.Rect(0, 0, wiconData.Width, wiconData.Height))
	draw.Draw(weatherIcon, bgimg.Bounds().Add(wiconData.Position), bgimg, bgimg.Bounds().Min, draw.Src)

	png.Encode(resp, weatherIcon)

}

// 城市天气结果JSON对象
type weatherResult struct {
	Code    int            `json:"code"`
	Message string         `json:"message"`
	Weather *model.Weather `json:"weather,omitempty"`
}

// 根据城市码获取天气信息
func weather(resp http.ResponseWriter, reqs *http.Request) {
	resp.Header().Set("Content-Type", "application/json;charset=UTF-8")
	datas := weatherResult{
		Code:    500,
		Message: "获取失败",
		Weather: nil,
	}
	citycode := path.Base(reqs.URL.Path)
	if citycode != "/" && citycode != "." && citycode != "weather" {
		result, err := util.GetCNWeather(citycode)
		if err != nil {
			datas.Message = err.Error()
		} else {
			datas.Code = 200
			datas.Message = "获取成功"
			datas.Weather = result
		}
	} else {
		datas.Message = "请指定有效的城市码！"
	}
	jsonStr, _ := json.Marshal(datas)
	fmt.Fprintln(resp, string(jsonStr))
}

// 搜索城市结果JSON对象
type cityResult struct {
	Code    int                    `json:"code"`
	Message string                 `json:"message"`
	Citys   []*util.SearchCityName `json:"citys,omitempty"`
}

// 查找对应的城市编码
func searchCity(resp http.ResponseWriter, reqs *http.Request) {
	resp.Header().Set("Content-Type", "application/json;charset=UTF-8")
	datas := cityResult{
		Code:    500,
		Message: "未找到结果",
		Citys:   nil,
	}

	name := reqs.URL.Query().Get("name")
	if name != "" {
		if citys := util.SearchCity(name); citys != nil && len(citys) > 0 {
			datas.Code = 200
			datas.Message = "找到结果"
			datas.Citys = citys
		}
	}
	jsonStr, _ := json.Marshal(datas)
	fmt.Fprintln(resp, string(jsonStr))
}

// 获取所有的城市编码
type proviceResult struct {
	Code     int              `json:"code"`
	Message  string           `json:"message"`
	Provices []*model.Provice `json:"provices,omitempty"`
}

func allProvices(resp http.ResponseWriter, reqs *http.Request) {
	resp.Header().Set("Content-Type", "application/json;charset=UTF-8")
	datas := proviceResult{
		Code:     500,
		Message:  "未找到结果",
		Provices: nil,
	}
	if citys := util.LoadAllCitys(); citys != nil && len(citys) > 0 {
		datas.Code = 200
		datas.Message = "找到结果"
		datas.Provices = citys
	}
	jsonStr, _ := json.Marshal(datas)
	fmt.Fprintln(resp, string(jsonStr))
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", welcome)
	// 静态文件处理
	files := http.FileServer(http.Dir("public"))
	mux.Handle("/resources/", http.StripPrefix("/resources/", files))
	mux.HandleFunc("/icon.png", weatherIcon)
	mux.HandleFunc("/weather/", weather)
	mux.HandleFunc("/city/search", searchCity)
	mux.HandleFunc("/provices", allProvices)
	log.Fatal(http.ListenAndServe("127.0.0.1:9001", mux))
}
