import Taro from "@tarojs/taro-h5";

import interceptors from "./interceptors";

interceptors.forEach(i => Taro.addInterceptor(i));

// const BASE_URL = 'http://localhost:5000'
// const BASE_URL = 'https://xinxue.niubibeta.com';
const BASE_URL = 'https://meirixinxue.com'

export default function request(options, url = null) {
  let data = {};
  if (options.method === "GET") {
    data = { ...options.data, ...options.params };
  } else {
    data = options.data;
  }

  let contentType = "application/json";
  contentType = options.contentType || contentType;
  url = url || options.url;
  const request_options = {
    url: url.indexOf("http") !== -1 ? url : BASE_URL + url,
    data: data,
    method: options.method,
    header: {
      "content-type": contentType,
      Token: Taro.getStorageSync("token")
    }
  };
  // console.log(request_options)
  return Taro.request(request_options);
}