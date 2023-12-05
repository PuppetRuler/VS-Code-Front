// 和用户相关的状态管理
import { createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken, getToken } from "@/utils";
import { getUserProfileApi, loginApi } from "@/apis/user";

const userStore = createSlice({
    name: 'user',
    // 数据状态
    initialState: {
        token: getToken() || '',
        userInfo: {},
    },
    // 修改同步方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
            // localstorage存一份
            _setToken(action.payload);
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload;
        },
        clearUserInfo(state) {
            state.token = '';
            state.userInfo = {};
        }
    }
});

// 异步请求
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        // 1. 发送异步请求
        const res = await loginApi(loginForm)
        // 2. 提交同步action给token
        dispatch(setToken(res.data.token));
    };
};
// 获取用户信息异步方法
const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await getUserProfileApi()
        dispatch(setUserInfo(res.data));
    };
};

// 解构出actionCreator
const { setToken, setUserInfo,clearUserInfo } = userStore.actions;

//获取reducer函数
const userReducer = userStore.reducer;

// 导出
export { setToken, setUserInfo,clearUserInfo, fetchLogin, fetchUserInfo };
export default userReducer;