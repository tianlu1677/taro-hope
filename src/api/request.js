import Taro from "@tarojs/taro";

import siteConfig from '@/utils/index'

import interceptors from "./interceptors";

interceptors.forEach(i => Taro.addInterceptor(i));

const BASE_URL = siteConfig.api_port()
const identity = siteConfig.identity()

export default function request(options, url = null) {
  let data = options.data || options.payload

  let contentType = "application/json";
  contentType = options.contentType || contentType;
  url = url || options.url;
  data = {...data, identity: identity}
  const request_options = {
    url: BASE_URL + url,
    data: data,
    method: options.method || 'GET',
    header: {
      "content-type": contentType,
      "AuthToken": Taro.getStorageSync("auth_token")
    }
  };
  // console.log(request_options)
  return Taro.request(request_options);
}
