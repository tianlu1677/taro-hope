import request from "./request.js";

// 获取当前用户信息
export async function secureCheck(content = '') {
  const res = await request({
    url: "/api/v1/secure_check",
    method: "POST",
    data: {content: content}
  });
  return res.data;
}
