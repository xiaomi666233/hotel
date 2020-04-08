// 异步请求业务写在这里，api接口也是在这里调用
// import {
//   aUser,
//   fUser
// } from '@/api/user'

// // 注册
// export const Register = ({
//   commit
// }, data) => {
//   aUser(data).then(res => {
//     if (res.data.status === 200) {
//       wx.showToast({
//         title: '注册成功',
//         icon: 'success',
//         duration: 2000
//       })
//       wx.switchTab({
//         url: '/pages/user/main'
//       })
//       commit('LOGIN', true)
//       commit('SET_USERNAME', data.userName)
//     }
//   })
