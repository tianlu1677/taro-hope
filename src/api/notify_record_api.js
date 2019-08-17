import request from "./request.js";
// 上传formid
export async function createFormId(body = { formids: []}) {
  const res = await request({
    url: `/api/v1/notify_records`,
    method: "POST",
    data: body
  });
  return res.data;
}
