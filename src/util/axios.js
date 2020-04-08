import axios from 'axios';

var instance = axios.create( // 常见请求实例配置项
  {
    baseURL: '此处写服务器ip' // 基础URL
  });

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

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
// 最后暴露实例
export default instance;
