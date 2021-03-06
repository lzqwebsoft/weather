# 天气

Go语言编写的简易天气预报服务端小程序。

项目运行后直接在浏览器中访问:[http://localhost:9001](http://localhost:9001)

[在线Demo](http://tq.websoft.club/)

### 1. 获取天气

`/weather/[citycode]`

`citycode`为城市编码，例获取北京天气：[http://localhost:9001/weather/101010100](http://localhost:9001/weather/101010100)


<details>
  <summary>示例结果</summary>

```json
{
	"code": 200,
	"message": "获取成功",
	"weather": {
		"update_time": "18:00",
		"data_source": "中央气象台",
		"now": {
			"time": "18:05",
			"tempf": "84",
			"temp": "29",
			"weather": "多云",
			"weathercode": "d01",
			"rain": "0.0",
			"rain24h": "0",
			"WD": "东南风 ",
			"WS": "1级",
			"wse": "<12km/h",
			"njd": "21.7km",
			"qy": "1000",
			"aqi": "102",
			"aqi_pm25": "102",
			"aqi_txt": "轻度污染",
			"city": "101010100",
			"cityname": "北京",
			"date": "05月20日(星期三)",
			"date_detail": "20200520",
			"nameen": "beijing",
			"sd": "27%"
		},
		"dailies": [{
			"date": "20200519",
			"weather_info": "晴转阴",
			"wind_direction": "南风转西南风",
			"wind_level": "3-4级",
			"max_temp": "30",
			"min_temp": "16"
		}, {
			"date": "20200520",
			"weather_info": "多云",
			"wind_direction": "东北风转东南风",
			"wind_level": "3-4级转<3级",
			"max_temp": "29",
			"min_temp": "16",
			"sun_rise": "04:55",
			"sun_reset": "19:26",
			"life_style": [{
				"name": "紫外线",
				"grading": "中等",
				"description": "涂擦SPF大于15、PA+防晒护肤品。"
			}, {
				"name": "减肥",
				"grading": "三颗星",
				"description": "夏天悄然到，肉已无处藏。天气较舒适，快去运动吧。"
			}, {
				"name": "血糖",
				"grading": "易波动",
				"description": "血糖易波动，注意监测。"
			}, {
				"name": "穿衣",
				"grading": "热",
				"description": "适合穿T恤、短薄外套等夏季服装。"
			}, {
				"name": "洗车",
				"grading": "较适宜",
				"description": "无雨且风力较小，易保持清洁度。"
			}, {
				"name": "空气污染扩散",
				"grading": "中",
				"description": "易感人群应适当减少室外活动。"
			}],
			"hours3_data": [{
				"ja": "n01",
				"txt": "多云",
				"jb": "24°C",
				"jd": "东南风",
				"jc": "<3级",
				"jf": "2020052020"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "23°C",
				"jd": "东南风",
				"jc": "<3级",
				"jf": "2020052021"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "22°C",
				"jd": "东南风",
				"jc": "3-4级",
				"jf": "2020052022"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "21°C",
				"jd": "东南风",
				"jc": "<3级",
				"jf": "2020052023"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "19°C",
				"jd": "东南风",
				"jc": "<3级",
				"jf": "2020052100"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "17°C",
				"jd": "东南风",
				"jc": "3-4级",
				"jf": "2020052101"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "16°C",
				"jd": "东南风",
				"jc": "<3级",
				"jf": "2020052102"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "16°C",
				"jd": "东风",
				"jc": "<3级",
				"jf": "2020052103"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "17°C",
				"jd": "东风",
				"jc": "<3级",
				"jf": "2020052104"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "17°C",
				"jd": "东南风",
				"jc": "<3级",
				"jf": "2020052105"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "19°C",
				"jd": "东风",
				"jc": "<3级",
				"jf": "2020052106"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "21°C",
				"jd": "东风",
				"jc": "<3级",
				"jf": "2020052107"
			}]
		}, {
			"date": "20200521",
			"weather_info": "雷阵雨转多云",
			"wind_direction": "东南风转西南风",
			"wind_level": "<3级",
			"max_temp": "24",
			"min_temp": "15",
			"sun_rise": "04:54",
			"sun_reset": "19:27",
			"life_style": [{
				"name": "紫外线",
				"grading": "最弱",
				"description": "辐射弱，涂擦SPF8-12防晒护肤品。"
			}, {
				"name": "减肥",
				"grading": "一颗星",
				"description": "夏天肉难藏，雨天坚持室内运动吧。"
			}, {
				"name": "血糖",
				"grading": "易波动",
				"description": "气温多变，血糖易波动，请注意监测。"
			}, {
				"name": "穿衣",
				"grading": "舒适",
				"description": "建议穿长袖衬衫单裤等服装。"
			}, {
				"name": "洗车",
				"grading": "不宜",
				"description": "有雨，雨水和泥水会弄脏爱车。"
			}, {
				"name": "空气污染扩散",
				"grading": "良",
				"description": "气象条件有利于空气污染物扩散。"
			}],
			"hours3_data": [{
				"ja": "n01",
				"txt": "多云",
				"jb": "22°C",
				"jd": "东南风",
				"jc": "<3级",
				"jf": "2020052108"
			}, {
				"ja": "n04",
				"txt": "",
				"jb": "22°C",
				"jd": "东风",
				"jc": "<3级",
				"jf": "2020052109"
			}, {
				"ja": "n04",
				"txt": "",
				"jb": "22°C",
				"jd": "东风",
				"jc": "<3级",
				"jf": "2020052110"
			}, {
				"ja": "n04",
				"txt": "",
				"jb": "23°C",
				"jd": "东南风",
				"jc": "<3级",
				"jf": "2020052111"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "23°C",
				"jd": "东风",
				"jc": "<3级",
				"jf": "2020052112"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "23°C",
				"jd": "东风",
				"jc": "3-4级",
				"jf": "2020052113"
			}, {
				"ja": "n04",
				"txt": "",
				"jb": "23°C",
				"jd": "东南风",
				"jc": "<3级",
				"jf": "2020052114"
			}, {
				"ja": "n04",
				"txt": "",
				"jb": "23°C",
				"jd": "东风",
				"jc": "<3级",
				"jf": "2020052115"
			}, {
				"ja": "n04",
				"txt": "",
				"jb": "24°C",
				"jd": "东风",
				"jc": "<3级",
				"jf": "2020052116"
			}, {
				"ja": "n04",
				"txt": "",
				"jb": "24°C",
				"jd": "东南风",
				"jc": "<3级",
				"jf": "2020052117"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "23°C",
				"jd": "东风",
				"jc": "<3级",
				"jf": "2020052118"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "23°C",
				"jd": "东风",
				"jc": "<3级",
				"jf": "2020052119"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "23°C",
				"jd": "东南风",
				"jc": "<3级",
				"jf": "2020052120"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "21°C",
				"jd": "东南风",
				"jc": "<3级",
				"jf": "2020052121"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "19°C",
				"jd": "东南风",
				"jc": "<3级",
				"jf": "2020052122"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "18°C",
				"jd": "西南风",
				"jc": "<3级",
				"jf": "2020052123"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "17°C",
				"jd": "东南风",
				"jc": "<3级",
				"jf": "2020052200"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "17°C",
				"jd": "东南风",
				"jc": "<3级",
				"jf": "2020052201"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "17°C",
				"jd": "西南风",
				"jc": "<3级",
				"jf": "2020052202"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "16°C",
				"jd": "南风",
				"jc": "3-4级",
				"jf": "2020052203"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "16°C",
				"jd": "南风",
				"jc": "3-4级",
				"jf": "2020052204"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "15°C",
				"jd": "西南风",
				"jc": "<3级",
				"jf": "2020052205"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "17°C",
				"jd": "西风",
				"jc": "<3级",
				"jf": "2020052206"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "19°C",
				"jd": "西风",
				"jc": "3-4级",
				"jf": "2020052207"
			}]
		}, {
			"date": "20200522",
			"weather_info": "多云",
			"wind_direction": "西北风转东南风",
			"wind_level": "<3级",
			"max_temp": "31",
			"min_temp": "17",
			"sun_rise": "04:54",
			"sun_reset": "19:27",
			"life_style": [{
				"name": "紫外线",
				"grading": "很强",
				"description": "涂擦SPF20以上，PA++护肤品，避强光。"
			}, {
				"name": "减肥",
				"grading": "三颗星",
				"description": "夏天悄然到，肉已无处藏。天气较舒适，快去运动吧。"
			}, {
				"name": "血糖",
				"grading": "易波动",
				"description": "气温多变，血糖易波动，请注意监测。"
			}, {
				"name": "穿衣",
				"grading": "热",
				"description": "适合穿T恤、短薄外套等夏季服装。"
			}, {
				"name": "洗车",
				"grading": "较适宜",
				"description": "无雨且风力较小，易保持清洁度。"
			}, {
				"name": "空气污染扩散",
				"grading": "中",
				"description": "易感人群应适当减少室外活动。"
			}],
			"hours3_data": [{
				"ja": "n00",
				"txt": "晴",
				"jb": "21°C",
				"jd": "西南风",
				"jc": "<3级",
				"jf": "2020052208"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "25°C",
				"jd": "西北风",
				"jc": "<3级",
				"jf": "2020052209"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "28°C",
				"jd": "西北风",
				"jc": "<3级",
				"jf": "2020052210"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "30°C",
				"jd": "西北风",
				"jc": "<3级",
				"jf": "2020052211"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "30°C",
				"jd": "西北风",
				"jc": "<3级",
				"jf": "2020052212"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "30°C",
				"jd": "西北风",
				"jc": "<3级",
				"jf": "2020052213"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "30°C",
				"jd": "西北风",
				"jc": "<3级",
				"jf": "2020052214"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "30°C",
				"jd": "西北风",
				"jc": "<3级",
				"jf": "2020052215"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "30°C",
				"jd": "西北风",
				"jc": "<3级",
				"jf": "2020052216"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "30°C",
				"jd": "西北风",
				"jc": "<3级",
				"jf": "2020052217"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "29°C",
				"jd": "西南风",
				"jc": "<3级",
				"jf": "2020052218"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "27°C",
				"jd": "西风",
				"jc": "<3级",
				"jf": "2020052219"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "26°C",
				"jd": "西北风",
				"jc": "<3级",
				"jf": "2020052220"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "22°C",
				"jd": "西南风",
				"jc": "<3级",
				"jf": "2020052221"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "21°C",
				"jd": "东南风",
				"jc": "<3级",
				"jf": "2020052222"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "18°C",
				"jd": "东南风",
				"jc": "<3级",
				"jf": "2020052223"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "17°C",
				"jd": "东南风",
				"jc": "<3级",
				"jf": "2020052300"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "17°C",
				"jd": "东南风",
				"jc": "<3级",
				"jf": "2020052301"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "17°C",
				"jd": "东南风",
				"jc": "<3级",
				"jf": "2020052302"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "17°C",
				"jd": "东风",
				"jc": "<3级",
				"jf": "2020052303"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "17°C",
				"jd": "东风",
				"jc": "<3级",
				"jf": "2020052304"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "18°C",
				"jd": "东南风",
				"jc": "<3级",
				"jf": "2020052305"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "17°C",
				"jd": "东风",
				"jc": "<3级",
				"jf": "2020052306"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "20°C",
				"jd": "东风",
				"jc": "<3级",
				"jf": "2020052307"
			}]
		}, {
			"date": "20200523",
			"weather_info": "多云转阴",
			"wind_direction": "东北风转西北风",
			"wind_level": "<3级转3-4级",
			"max_temp": "25",
			"min_temp": "17",
			"sun_rise": "04:53",
			"sun_reset": "19:28",
			"life_style": [{
				"name": "紫外线",
				"grading": "很强",
				"description": "涂擦SPF20以上，PA++护肤品，避强光。"
			}, {
				"name": "减肥",
				"grading": "五颗星",
				"description": "夏天悄然到，肉已无处藏。天气较舒适，快去运动吧。"
			}, {
				"name": "血糖",
				"grading": "易波动",
				"description": "气温多变，血糖易波动，请注意监测。"
			}, {
				"name": "穿衣",
				"grading": "舒适",
				"description": "建议穿长袖衬衫单裤等服装。"
			}, {
				"name": "洗车",
				"grading": "较不宜",
				"description": "风力较大，洗车后会蒙上灰尘。"
			}, {
				"name": "空气污染扩散",
				"grading": "中",
				"description": "易感人群应适当减少室外活动。"
			}],
			"hours3_data": [{
				"ja": "n00",
				"txt": "晴",
				"jb": "21°C",
				"jd": "东南风",
				"jc": "<3级",
				"jf": "2020052308"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "21°C",
				"jd": "东北风",
				"jc": "<3级",
				"jf": "2020052309"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "22°C",
				"jd": "东北风",
				"jc": "<3级",
				"jf": "2020052310"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "22°C",
				"jd": "东北风",
				"jc": "<3级",
				"jf": "2020052311"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "23°C",
				"jd": "东北风",
				"jc": "<3级",
				"jf": "2020052312"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "24°C",
				"jd": "东北风",
				"jc": "<3级",
				"jf": "2020052313"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "24°C",
				"jd": "东北风",
				"jc": "<3级",
				"jf": "2020052314"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "24°C",
				"jd": "南风",
				"jc": "<3级",
				"jf": "2020052315"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "24°C",
				"jd": "南风",
				"jc": "<3级",
				"jf": "2020052316"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "24°C",
				"jd": "东北风",
				"jc": "<3级",
				"jf": "2020052317"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "23°C",
				"jd": "南风",
				"jc": "3-4级",
				"jf": "2020052318"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "22°C",
				"jd": "东北风",
				"jc": "<3级",
				"jf": "2020052319"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "21°C",
				"jd": "东北风",
				"jc": "<3级",
				"jf": "2020052320"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "19°C",
				"jd": "西南风",
				"jc": "<3级",
				"jf": "2020052323"
			}, {
				"ja": "n02",
				"txt": "阴",
				"jb": "19°C",
				"jd": "西北风",
				"jc": "3-4级",
				"jf": "2020052402"
			}, {
				"ja": "n02",
				"txt": "阴",
				"jb": "18°C",
				"jd": "西北风",
				"jc": "3-4级",
				"jf": "2020052405"
			}]
		}, {
			"date": "20200524",
			"weather_info": "多云",
			"wind_direction": "北风转东北风",
			"wind_level": "3-4级转<3级",
			"max_temp": "29",
			"min_temp": "17",
			"sun_rise": "04:52",
			"sun_reset": "19:29",
			"life_style": [{
				"name": "紫外线",
				"grading": "很强",
				"description": "涂擦SPF20以上，PA++护肤品，避强光。"
			}, {
				"name": "减肥",
				"grading": "一颗星",
				"description": "夏天悄然到，肉已无处藏。风虽有点大，室内可健身。"
			}, {
				"name": "血糖",
				"grading": "易波动",
				"description": "气温多变，血糖易波动，请注意监测。"
			}, {
				"name": "穿衣",
				"grading": "热",
				"description": "适合穿T恤、短薄外套等夏季服装。"
			}, {
				"name": "洗车",
				"grading": "较不宜",
				"description": "风力较大，洗车后会蒙上灰尘。"
			}, {
				"name": "空气污染扩散",
				"grading": "良",
				"description": "气象条件有利于空气污染物扩散。"
			}],
			"hours3_data": [{
				"ja": "n02",
				"txt": "阴",
				"jb": "21°C",
				"jd": "西北风",
				"jc": "3-4级",
				"jf": "2020052408"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "24°C",
				"jd": "西南风",
				"jc": "3-4级",
				"jf": "2020052411"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "27°C",
				"jd": "北风",
				"jc": "3-4级",
				"jf": "2020052414"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "25°C",
				"jd": "东南风",
				"jc": "3-4级",
				"jf": "2020052417"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "23°C",
				"jd": "北风",
				"jc": "<3级",
				"jf": "2020052420"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "21°C",
				"jd": "东北风",
				"jc": "<3级",
				"jf": "2020052423"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "19°C",
				"jd": "东北风",
				"jc": "<3级",
				"jf": "2020052502"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "20°C",
				"jd": "南风",
				"jc": "<3级",
				"jf": "2020052505"
			}]
		}, {
			"date": "20200525",
			"weather_info": "晴转多云",
			"wind_direction": "东南风转北风",
			"wind_level": "<3级",
			"max_temp": "28",
			"min_temp": "16",
			"sun_rise": "04:51",
			"sun_reset": "19:30",
			"life_style": [{
				"name": "紫外线",
				"grading": "很强",
				"description": "涂擦SPF20以上，PA++护肤品，避强光。"
			}, {
				"name": "减肥",
				"grading": "五颗星",
				"description": "夏天悄然到，肉已无处藏。天气较舒适，快去运动吧。"
			}, {
				"name": "血糖",
				"grading": "易波动",
				"description": "血糖易波动，注意监测。"
			}, {
				"name": "穿衣",
				"grading": "热",
				"description": "适合穿T恤、短薄外套等夏季服装。"
			}, {
				"name": "洗车",
				"grading": "适宜",
				"description": "天气较好，适合擦洗汽车。"
			}, {
				"name": "空气污染扩散",
				"grading": "中",
				"description": "易感人群应适当减少室外活动。"
			}],
			"hours3_data": [{
				"ja": "n01",
				"txt": "多云",
				"jb": "21°C",
				"jd": "东北风",
				"jc": "<3级",
				"jf": "2020052508"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "24°C",
				"jd": "西南风",
				"jc": "<3级",
				"jf": "2020052511"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "27°C",
				"jd": "东南风",
				"jc": "<3级",
				"jf": "2020052514"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "26°C",
				"jd": "西南风",
				"jc": "<3级",
				"jf": "2020052517"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "24°C",
				"jd": "东南风",
				"jc": "<3级",
				"jf": "2020052520"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "21°C",
				"jd": "西北风",
				"jc": "<3级",
				"jf": "2020052523"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "18°C",
				"jd": "北风",
				"jc": "<3级",
				"jf": "2020052602"
			}, {
				"ja": "n01",
				"txt": "多云",
				"jb": "19°C",
				"jd": "北风",
				"jc": "<3级",
				"jf": "2020052605"
			}]
		}, {
			"date": "20200526",
			"weather_info": "晴",
			"wind_direction": "西北风转东北风",
			"wind_level": "3-4级转<3级",
			"max_temp": "28",
			"min_temp": "15",
			"sun_rise": "04:51",
			"sun_reset": "19:31",
			"life_style": [{
				"name": "紫外线",
				"grading": "很强",
				"description": "涂擦SPF20以上，PA++护肤品，避强光。"
			}, {
				"name": "减肥",
				"grading": "一颗星",
				"description": "夏天悄然到，肉已无处藏。风虽有点大，室内可健身。"
			}, {
				"name": "血糖",
				"grading": "易波动",
				"description": "血糖易波动，注意监测。"
			}, {
				"name": "穿衣",
				"grading": "热",
				"description": "适合穿T恤、短薄外套等夏季服装。"
			}, {
				"name": "洗车",
				"grading": "较不宜",
				"description": "风力较大，洗车后会蒙上灰尘。"
			}, {
				"name": "空气污染扩散",
				"grading": "良",
				"description": "气象条件有利于空气污染物扩散。"
			}],
			"hours3_data": [{
				"ja": "n00",
				"txt": "晴",
				"jb": "20°C",
				"jd": "北风",
				"jc": "<3级",
				"jf": "2020052608"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "24°C",
				"jd": "西北风",
				"jc": "3-4级",
				"jf": "2020052611"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "27°C",
				"jd": "西北风",
				"jc": "3-4级",
				"jf": "2020052614"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "26°C",
				"jd": "西北风",
				"jc": "3-4级",
				"jf": "2020052617"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "25°C",
				"jd": "西北风",
				"jc": "<3级",
				"jf": "2020052620"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "20°C",
				"jd": "西南风",
				"jc": "<3级",
				"jf": "2020052623"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "19°C",
				"jd": "东北风",
				"jc": "<3级",
				"jf": "2020052702"
			}, {
				"ja": "n00",
				"txt": "晴",
				"jb": "19°C",
				"jd": "南风",
				"jc": "<3级",
				"jf": "2020052705"
			}]
		}]
	}
}
```

</details>

### 2. 获取城市编码

`/city/search?name=[cityname]`

`cityname`为城市名称，搜索获取对应城市的城市编码，例：[http://localhost:9001/city/search?name=北京](http://localhost:9001/city/search?name=%E5%8C%97%E4%BA%AC) 获取北京北京的城市码

<details>
  <summary>示例结果</summary>

```json
{
	"code": 200,
	"message": "找到结果",
	"citys": [{
		"parent": "",
		"name": "北京",
		"code": "101010100"
	}, {
		"parent": "北京",
		"name": "海淀",
		"code": "101010200"
	}, {
		"parent": "北京",
		"name": "朝阳",
		"code": "101010300"
	}, {
		"parent": "北京",
		"name": "顺义",
		"code": "101010400"
	}, {
		"parent": "北京",
		"name": "怀柔",
		"code": "101010500"
	}, {
		"parent": "北京",
		"name": "通州",
		"code": "101010600"
	}, {
		"parent": "北京",
		"name": "昌平",
		"code": "101010700"
	}, {
		"parent": "北京",
		"name": "延庆",
		"code": "101010800"
	}, {
		"parent": "北京",
		"name": "丰台",
		"code": "101010900"
	}, {
		"parent": "北京",
		"name": "石景山",
		"code": "101011000"
	}, {
		"parent": "北京",
		"name": "大兴",
		"code": "101011100"
	}, {
		"parent": "北京",
		"name": "房山",
		"code": "101011200"
	}, {
		"parent": "北京",
		"name": "密云",
		"code": "101011300"
	}, {
		"parent": "北京",
		"name": "门头沟",
		"code": "101011400"
	}, {
		"parent": "北京",
		"name": "平谷",
		"code": "101011500"
	}, {
		"parent": "北京",
		"name": "东城",
		"code": "101011600"
	}, {
		"parent": "北京",
		"name": "西城",
		"code": "101011700"
	}]
}
```

</details>

### 3. 天气图标

`/icon.png?wcode=[wcode]&size=[size]`

返回天气图标，`content-type`为`image/png`。

* `wcode` 天气编码，例`n00`或`d00`，其中`d`表示白天，`n`表示夜晚
* `size` 表示图标大小，可以取值为`20x23`的`small`和`small_b`、`40x40`的`medium`和`medium_b`、`70x79`的`large`和`large_b`、`35x35`的`normal`和`normal_b`，即小、中、大、和正常，四种尺寸，而每种尺寸里又有A和B两个可选配色。默认`size`可以不传，为`normal`。
