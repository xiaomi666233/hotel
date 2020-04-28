import { request } from "./request";
// 订房
export function order(data) {
  return request({
    url: "/room/order",
    method: "post",
    data: data
  });
}
// 查询空房
export function room() {
  return request({
    url: "/room/room",
    method: "get"
  });
}
// 查询订房信息
export function roomOrder(pageNum, pageSize) {
  return request({
    url: `/roomOrder/roomOrder?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: "get"
  });
}
// 查询订房信息
export function roomOrderNoParams() {
  return request({
    url: `/roomOrder/roomOrder`,
    method: "get"
  });
}
// 确定入住
export function roomOrderC(id) {
  return request({
    url: `/roomOrder/roomOrder/${id}`,
    method: "put"
  });
}
// 取消入住
export function roomOrderD(id) {
  return request({
    url: `/roomOrder/roomOrder/${id}`,
    method: "delete"
  });
}
// 查找全部房间
export function roomGet() {
  return request({
    url: `/room/room`,
    method: "get"
  });
}
// 查找指定房间
export function roomGetOne(id) {
  return request({
    url: `/room/room/${id}`,
    method: "put"
  });
}
// 修改房间价格
export function roomMP(data) {
  return request({
    url: `/room/modifyRoomPrice`,
    method: "post",
    data: data
  });
}
// 续住
export function roomR(data) {
  return request({
    url: `/room/roomRenewal`,
    method: "post",
    data: data
  });
}

// 退房
export function roomtuifang(roomUuid) {
  return request({
    url: `/room/checkOut/${roomUuid}`,
    method: "put"
  });
}

// 超时
export function roomCheck(pageNum, pageSize) {
  return request({
    url: `/roomOrder/overtimeRoomOrder?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: "get"
  });
}

// 根据预约时间查空房
export function timeGetkf(data) {
  return request({
    url: `/room/spareRoom?yysj=${data}`,
    method: "get"
  });
}

// 根据房号查询
export function fhGetRoom(fh, pageNum, pageSize) {
  return request({
    url: `/roomOrder/roomOrderByFh?fh=${fh}&pageNum=${pageNum}&pageSize=${pageSize}`,
    method: "get"
  });
}

// 获取菜单列表
export function getcdlb(pageNum, pageSize) {
  return request({
    url: `/menu/menu?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: "get"
  });
}

// 查询指定菜品信息
export function getcpxx(uuid) {
  return request({
    url: `/menu/menu?menuUuid=${uuid}`,
    method: "put"
  });
}

// 新增菜品信息
export function addcpxx(data) {
  return request({
    url: `/menu/addMenu`,
    method: "post",
    data: data
  });
}

// 修改菜品信息
export function mdfcpxx(data) {
  return request({
    url: `/menu/modifyMenu`,
    method: "post",
    data: data
  });
}

// 删除菜品信息
export function deletecpxx(uuid) {
  return request({
    url: `/menu/menu/${uuid}`,
    method: "delete"
  });
}

// 搜索菜品信息
export function searchcpxx(cpmc, pageNum, pageSize) {
  return request({
    url: `/menu/menuByCpmc?cpmc=${cpmc}&pageNum=${pageNum}&pageSize=${pageSize}`,
    method: "get"
  });
}

// 订购菜品
export function dgcp(fh, gmsl, uuid) {
  return request({
    url: `/menuOrder/menuOrder?fh=${fh}&gmsl=${gmsl}&menuUuid=${uuid}`,
    method: "post"
  });
}

// 查询菜品订单列表
export function searchcpddlbNoParam() {
  return request({
    url: `/menuOrder/menuOrder`,
    method: "get"
  });
}

// 查询菜品订单列表
export function searchcpddlb(fh, pageNum, pageSize) {
  return request({
    url: `/menuOrder/menuOrder?fh=${fh}&pageNum=${pageNum}&pageSize=${pageSize}`,
    method: "get"
  });
}

// 删除订单列表
export function deletecpddlb(uuid) {
  return request({
    url: `/menuOrder/menuOrder/${uuid}`,
    method: "delete"
  });
}
