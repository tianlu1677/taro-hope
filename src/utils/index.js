import Taro from "@tarojs/taro/types/index"
//
// function siteConfig() {
//   // let env = "staging";
//   // let env = 'dev'
//   let env = 'production'
//   if (env === "dev") {
//     return {
//       identity: 'qiuliao',
//       API_PORT: "http://localhost:4000"
//     };
//   }
//   if (env === "staging") {
//     return {
//       identity: 'qiuliao',
//       API_PORT: "https://fans.niubibeta.com",
//       api_port: "https://fans.niubibeta.com",
//     };
//   }
//   if (env === "pro") {
//     return {
//       identity: 'qiuliao',
//       API_PORT: "https://fans.meirixinxue.com"
//     };
//   }
// }

export default class siteConfig {
  static identity() {
    return 'qiuliao'
  }

  static api_port() {
    // return "https://fans.niubibeta.com"
    // return "https://fans.meirixinxue.com"
    return 'https://fans.niubibeta.com'

  }
}
