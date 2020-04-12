package util

import (
	"io"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"
	"time"

	"websoft.club/weather/conf"
)

// Get Http Get请求，接受URL, params url.Values 参数, headers 请求头
func Get(path string, params url.Values, headers map[string]string) ([]byte, error) {
	path += "?" + params.Encode()
	return fetch("GET", path, nil, headers, conf.Timeout)
}

// Post Http Post请求，接受URL, params url.Values 参数, headers 请求头
func Post(path string, params url.Values, headers map[string]string) ([]byte, error) {
	return fetch("POST", path, strings.NewReader(params.Encode()), headers, conf.Timeout)
}

/*
  fetch 统一的底层的HTTP请求方法，本项目的所用向外请求都经过这个方法
  method 请求的方法GET POST等等
  params 请求参数
  headers 请求头设置为map[string]string类型
*/
func fetch(method, path string, params io.Reader, headers map[string]string, timeOut int) (body []byte, err error) {
	if timeOut == 0 {
		timeOut = conf.Timeout
	}
	client := http.Client{
		Timeout: time.Duration(timeOut) * time.Second,
	}
	// 判断是否使用
	if conf.UseProxy {
		proxyURL, _ := url.Parse(conf.HTTPProxy)
		client.Transport = &http.Transport{Proxy: http.ProxyURL(proxyURL)}
	}
	req, err := http.NewRequest(method, path, params)
	if err != nil {
		return
	}
	for header, value := range headers {
		req.Header.Set(header, value)
	}
	resp, err := client.Do(req)
	if err != nil {
		return
	}
	defer resp.Body.Close()
	body, err = ioutil.ReadAll(resp.Body)
	if err != nil {
		return
	}
	return body, nil
}
