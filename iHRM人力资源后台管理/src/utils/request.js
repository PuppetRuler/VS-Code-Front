import axios from 'axios';
import store from '@/store';
import { Message } from 'element-ui';
import router from '@/router';

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基础地址
  timeout: 10000
}); // 创建一个新的axios实例

// 请求拦截器
request.interceptors.request.use(config => {
  // 注入token
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截器
request.interceptors.response.use((response) => {
  // axios默认包裹了data
  const { data, success, message } = response.data;
  if (success) {
    return data; // 返回用户需要的数据
  } else {
    Message({ type: 'error', message });
    return Promise.reject(new Error(message));
  }
}, async (error) => {
  // token校验失败
  if (error.response.status === 401) {
    Message({ type: 'warn', message: 'token校验失败' });
    // 退出登录
    await store.dispatch('user/logout');
    // 主动跳到登录页
    router.replace('/login');
    return Promise.reject(error);
  }
  // 错误提示
  Message({ type: 'error', message: error.message });
  return Promise.reject(error);
});

export default request;
