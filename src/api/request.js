import Taro from "@tarojs/taro";

import interceptors from "./interceptors";

interceptors.forEach(i => Taro.addInterceptor(i));

const BASE_URL = 'http://localhost:4000'

// const BASE_URL = 'https://fans.niubibeta.com'

export default function request(options, url = null) {
  let data = options.data || options.payload
  let contentType = "application/json";
  contentType = options.contentType || contentType;
  url = url || options.url;
  const request_options = {
    url: url.indexOf("http") !== -1 ? url : BASE_URL + url,
    data: data,
    method: options.method || 'GET',
    header: {
      "content-type": contentType,
      AuthToken: Taro.getStorageSync("auth_token")
    }
  };
  // console.log(request_options)
  return Taro.request(request_options);
}
