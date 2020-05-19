package model

// District 地区，主要指县或区
type District struct {
	HK string `json:"hk"` // 繁体字城市名称
	ZH string `json:"zh"` // 简体字城市名称
	EN string `json:"en"` // 英文城市名称
	ID string `json:"id"` // 城市编码
}

// City 城市，主要指市
type City struct {
	HK       string     `json:"hk"`       // 繁体字城市名称
	ZH       string     `json:"zh"`       // 简体字城市名称
	EN       string     `json:"en"`       // 英文城市名称
	Children []District `json:"children"` // 市下面的地区行政单位
}

// Provice 省份，主要指省份或直辖市
type Provice struct {
	HK       string `json:"hk"`       // 繁体字城市名称
	ZH       string `json:"zh"`       // 简体字城市名称
	EN       string `json:"en"`       // 英文城市名称
	Children []City `json:"children"` //  省份下面的地区行政单位
}
