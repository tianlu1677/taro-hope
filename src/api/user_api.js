import request from "./request.js";

// 获取当前用户信息
export async function getCurrentUser() {
  const res = await request({
    url: "/api/v1/users/me",
    method: "GET",
  });
  return res.data;
}

// 手机号登录
export async function phoneLogin(body = {}) {
  const res = await request({
    url: "/api/v1/logins/phone_login",
    method: "POST",
    data: body
  });
  return res.data;
}

// 获取session_key
export async function getSessionKey(body = {}) {
  const res = await request({
    url: "/api/v1/logins/session_key",
    method: "POST",
    data: body
  });
  return res.data;
}


// 获取登录信息
export async function loginSystem(body = {}) {
  const res = await request({
    url: "/api/v1/logins",
    method: "POST",
    data: body
  });
  return res.data;
}

//用户的详情页
export async function getUserDetail(id) {
  const res = await request({
    url: `/api/v1/users/${id}`,
    method: "GET"
  });
  return res.data;
}

// 更新用户的详细信息
export async function updateUserDetail() {
  const res = await request({
    url: `/api/v1/users/update_info`,
    method: "PATCH"
  });
  return res.data;
}

// 用户发布的心得数
export async function getUserTopics(id) {
  const res = await request({
    url: `/api/v1/users/${id}/topics`,
    method: "GET"
  });
  return res.data;
}


// 关注
export async function followUser(id) {
  const res = await request({
    url: `/api/v1/users/${id}/follow`,
    method: "POST"
  });
  return res.data;
}

// 取消关注
export async function unfollowUser(id) {
  const res = await request({
    url: `/api/v1/users/${id}/unfollow`,
    method: "POST"
  });
  return res.data;
}

export async function getCurrentUserTopicList(id, params) {
  const res = await request({
    url: `/api/v1/users/${id}/topics`,
    method: "GET",
    data: params
  });
  return res.data;
}

export async function getUserTopicList(id, params) {
  const res = await request({
    url: `/api/v1/users/${id}/topics?q[is_hide_eq]=true`,
    method: "GET",
    data: params
  });
  return res.data;
}
