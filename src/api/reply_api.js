import request from "./request.js";

export async function deleteReply(reply_id) {
  const res = await request({
    url: `/api/v1/replies/${reply_id}`,
    method: "DELETE",
  });
  return res.data;
}

