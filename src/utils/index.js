export function siteConfig() {
  // let env = "staging";
  // let env = 'dev'
  let env = 'production'
  if (env === "dev") {
    return {
      identity: 'qiuliao',
      API_PORT: "http://localhost:4000"
    };
  }
  if (env === "staging") {
    return {
      identity: 'qiuliao',
      API_PORT: "https://fans.niubibeta.com"
    };
  }
  if (env === "pro") {
    return {
      identity: 'qiuliao',
      API_PORT: "https://fans.meirixinxue.com"
    };
  }
}
