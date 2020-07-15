package util

import (
	"net"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"websoft.club/weather/ipdb"
)

// ClientIP 尽最大努力实现获取客户端 IP 的算法。
// 解析 X-Real-IP 和 X-Forwarded-For 以便于反向代理（nginx 或 haproxy）可以正常工作。
func ClientIP(r *http.Request) string {
	xForwardedFor := r.Header.Get("X-Forwarded-For")
	ip := strings.TrimSpace(strings.Split(xForwardedFor, ",")[0])
	if ip != "" {
		return ip
	}

	ip = strings.TrimSpace(r.Header.Get("X-Real-Ip"))
	if ip != "" {
		return ip
	}

	if ip, _, err := net.SplitHostPort(strings.TrimSpace(r.RemoteAddr)); err == nil {
		return ip
	}

	return ""
}

// GetCityByIP 根据IP得到城市名称, 返回为map[string]string：
// country_name	国家名称
// region_name	区域名称，中国为省份
// city_name	城市名称，中国为市级
// owner_domain	拥有者域名
// isp_domain	运营商名称
func GetCityByIP(ipadrr string) (map[string]string, error) {
	dir, _ := os.Getwd()
	dbpath := filepath.Join(dir, "ipdb/db/qqwry.ipdb")
	db, err := ipdb.NewCity(dbpath)
	if err != nil {
		return nil, err
	}
	db.Reload(dbpath) // 更新 ipdb 文件后可调用 Reload 方法重新加载内容
	return db.FindMap(ipadrr, "CN")
}
