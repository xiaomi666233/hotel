import {request} from "./request";

// export function login(account, password) {
//   return request({
//     url: 'login',
//     method:"post",
//     data:{
//       account,
//       password
//     }
//   })
// }

export function login(account, password) {
  return request({
    url: 'login',
    method:"post",
    data:{
      account,
      password
    }
  })
}

/**
 * 获取用户拥有的权限，用于判断是否显示按钮
 */
export function getUserPermission() {
  return request({
    url: 'perms',
    method:"get"
  })
}

export function logout() {
  return request({
    url: 'user/logout',
    method:"get"
  })
}
