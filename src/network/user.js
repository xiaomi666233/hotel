import { request } from "./request";
// 订房
export function order(data) {
    return request({
        url: '/room/order',
        method: "post",
        data: data
    })
}
// 查询空房
export function room() {
    return request({
        url: '/room/room',
        method: "get",
    })
}
// 查询订房信息
export function roomOrder(pageNum, pageSize) {
    return request({
        url: `/roomOrder/roomOrder?pageNum=${pageNum}&pageSize=${pageSize}`,
        method: "get",
    })
}
// 确定入住
export function roomOrderC(id) {
    return request({
        url: `/roomOrder/roomOrder/${id}`,
        method: "put",
    })
}
// 取消入住
export function roomOrderD(id) {
    return request({
        url: `/roomOrder/roomOrder/${id}`,
        method: "delete",
    })
}
// 查找全部房间
export function roomGet() {
    return request({
        url: `/room/room`,
        method: "get",
    })
}
// 查找指定房间
export function roomGetOne(id) {
    return request({
        url: `/room/room/${id}`,
        method: "put",
    })
}
// 修改房间价格
export function roomMP(data) {
    return request({
        url: `/room/modifyRoomPrice`,
        method: "post",
        data: data
    })
}
// 续住
export function roomR(data) {
    return request({
        url: `/room/roomRenewal`,
        method: "post",
        data: data
    })
}

// 超时
export function roomCheck() {
    return request({
        url: `/roomOrder/overtimeRoomOrder`,
        method: "get"
    })
}