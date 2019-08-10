import request from "./request.js";

// Nodes
export async function getAllNodes() {
  const res = await request({
    url: "/api/v1/nodes",
    method: "GET",
  });
  return res.data;
}


export async function getNodeDetail(id) {
  const res = await request({
    url: `/api/v1/nodes/${id}`,
    method: "GET",
  });
  return res.data;
}

