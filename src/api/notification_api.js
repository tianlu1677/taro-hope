import request from "./request.js";

export async function getNotificationList(params = {}) {
  const res = await request({
    url: `/api/v1/notifications`,
    method: "GET",
    data: params
  });
  return res.data;
}

export async function readNotification(params = {}) {
  const res = await request({
    url: `/api/v1/notifications`,
    method: "POST",
    data: params
  });
  return res.data;
}

export async function deleteNotification(params = {}) {
  const res = await request({
    url: `/api/v1/notifications`,
    method: "POST",
    data: params
  });
  return res.data;
}
