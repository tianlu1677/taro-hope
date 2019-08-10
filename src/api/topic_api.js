import request from "./request.js";

//
export async function getTopicDetail(id) {
  const res = await request({
    url: "/api/v1/topics/" + id,
    method: "GET",
  });
  return res.data;
}

export async function getTopicReplies(id) {
  const res = await request({
    url: `/api/v1/topics/${id}/replies`,
    method: "GET",
  });
  return res.data;
}

export async function createTopicReplies(id) {
  const res = await request({
    url: `/api/v1/topics/${id}/replies`,
    method: "POST",
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

