import request from "./request.js";

// 用户登录
export async function loginSystem(params = { code: "" }) {
  const res = await request({
    url: "/api/sessions/get_session_key",
    method: "POST",
    data: params
  });
  return res.data;
}

// 获取当前用户信息
export async function getCurrentAccount() {
  const res = await request({
    url: "/api/v1/mine/accounts/info",
    method: "GET",
  });
  return res.data;
}


// 获取微信中的用户信息
export async function updateAccountInfo(data = { session_key: "", encrypted_data: "", iv: "", raw_data: "" }) {
  const res = await request({
    url: "/api/sessions/update_account",
    method: "POST",
    data: data
  });
  return res.data;
}


//用户的详情页
export async function getAccount(id) {
  const res = await request({
    url: `/api/v1/accounts/${id}`,
    method: "GET"
  });
  return res.data;
}