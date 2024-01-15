import { getUserInfo, login } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';
export default {
  namespaced: true, // 开启命名空间
  state: {
    token: getToken(), // 从缓存中读取初始值
    userInfo: {}
  },
  mutations: {
    // 设置token
    setToken(state, token) {
      state.token = token;
      // 同步到缓存
      setToken(token);
    },
    // 删除token
    removeToken(state) {
      // 删除vueX的token
      state.token = null;
      removeToken();
    },
    // 设置用户基本信息
    setUserInfo(state, info) {
      state.userInfo = info;
    }
  },
  actions: {
    // context上下文,传入参数
    async login(context, data) {
      // todo: 调用登录接口
      const token = await login(data);
      // 返回一个token 123456
      context.commit('setToken', token);
    },
    // 获取用户基本资料
    async getUserInfo(context) {
      const result = await getUserInfo();
      context.commit('setUserInfo', result);
    },
    // 退出登录
    logout(context) {
      context.commit('removeToken'); // 删除token
      context.commit('setUserInfo', {}); // 设置用户信息为空
    }
  }
};
