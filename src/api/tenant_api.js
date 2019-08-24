import SiteConfig from '@/utils'
import request from "./request.js";

// 项目的一些设置
export async function getTenant() {
  const res = await request({
    url: "/api/v1/tenants/" + SiteConfig.identity(),
    method: "GET",
  });
  return res.data;
}
