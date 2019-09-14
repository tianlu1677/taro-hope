import request from "./request.js";

// 获取当前用户信息
export async function createSuggestions(data = {}) {
  const res = await request({
    url: "/api/v1/suggestions/found",
    method: "POST",
    data: data
  });
  return res.data;
}
