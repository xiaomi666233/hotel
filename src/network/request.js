import axios from "axios";

export function request(config) {
  // const instance = axios.create({
  //   baseURL: 'http://localhost:8088',
  //   timeout: 5000
  // })
  //
  // // 添加请求拦截器
  // instance.interceptors.request.use(
  //   (config) => {
  //     // 在发送请求之前做些什么
  //     return config;
  //   },
  //   (error) => {
  //     // 对请求错误做些什么
  //     return Promise.reject(error);
  //   }
  // );
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://localhost:8088',
    timeout: 5000
  })
// 2.拦截器
// 2.1请求拦截
  instance.interceptors.request.use(config => {
    let accessToken = window.localStorage.getItem('accessToken')
    //请求头携带token
    config.headers.accesstoken = accessToken;
    return config
  }), err => {
    // console.log(err);
    return Promise.reject(err);
  }

// 添加响应拦截器
  instance.interceptors.response.use(
    (response) => {
      // 对响应数据做点什么
      return response;
    },
    (error) => {
      return error.response
    }
  );

  return instance(config)
}
