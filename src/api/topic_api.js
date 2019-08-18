import request from "./request.js";

export async function getTopicList(body = {}) {
  const res = await request({
    url: "/api/v1/topics",
    method: "GET",
    data: body
  });
  return res.data;
}

export async function createTopic(body = {}) {
  const res = await request({
    url: "/api/v1/topics",
    method: "POST",
    data: body
  });
  return res.data;
}

export async function getTopicDetail(id) {
  const res = await request({
    url: "/api/v1/topics/" + id,
    method: "GET",
  });
  return res.data;
}

export async function updateTopicDetail(id, body) {
  const res = await request({
    url: "/api/v1/topics/" + id,
    method: 'POST',
    data: body
  });
  return res.data;
}


export async function getTopicReplies(id) {
  const res = await request({
    url: `/api/v1/topics/${id}/replies?category=user`,
    method: "GET",
  });
  return res.data;
}

export async function createTopicReplies(id, body = {}) {
  const res = await request({
    url: `/api/v1/topics/${id}/replies`,
    method: "POST",
    data: body
  });
  return res.data;
}


export async function followTopic(id) {
  const res = await request({
    url: `/api/v1/topics/${id}/follow`,
    method: "POST",
  });
  return res.data;
}

export async function unfollowTopic(id) {
  const res = await request({
    url: `/api/v1/topics/${id}/unfollow`,
    method: "POST",
  });
  return res.data;
}


export async function favoriteTopic(id) {
  const res = await request({
    url: `/api/v1/topics/${id}/favorite`,
    method: "POST",
  });
  return res.data;
}

export async function unfavoriteTopic(id) {
  const res = await request({
    url: `/api/v1/topics/${id}/unfavorite`,
    method: "POST",
  });
  return res.data;
}

