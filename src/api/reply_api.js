import request from "./request.js";
// 获取当前用户信息
export async function createReply(topic_id, body = {}) {
  const res = await request({
    url: `/api/v1/topics/${topic_id}/replies`,
    method: "POST",
    data: body
  });
  return res.data;
}


export async function deleteReply(reply_id) {
  const res = await request({
    url: `/api/v1/replies/${reply_id}`,
    method: "DELETE",
  });
  return res.data;
}

// 获取当前用户信息
export async function createSecondReply(topic_id, body = {}) {
  const res = await request({
    url: `/api/v1/replies`,
    method: "POST",
    data: body
  });
  return res.data;
}

