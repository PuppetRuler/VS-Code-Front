import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const foodStore = createSlice({
    name: 'food',
    initialState: {
        // 食品列表
        foodsList: [],
        // 激活序号
        activeIndex: 0,
        // 购物车列表
        cartList: []
    },
    reducers: {
        // 更改商品列表
        setFoodsList(state, action) {
            state.foodsList = action.payload;
        },
        // 更改激活状态
        changeActiveIndex(state, action) {
            state.activeIndex = action.payload;
        },
        // 添加购物车
        addCart(state, action) {
            const item = state.cartList.find(item => item.id === action.payload.id);
            if (item) {
                item.count++;
            } else {
                state.cartList.push({ ...action.payload, count: 1 });
            }
        },
        // 购物车增加商品数量
        increCount(state, action) {
            const item = state.cartList.find(item => item.id === action.payload.id);
            item.count++;
        },
        // 购物车减少商品数量
        decreCount(state, action) {
            const item = state.cartList.find(item => item.id === action.payload.id);
            item.count--;
            if (item.count === 0) {
                state.cartList = state.cartList.filter(item=>item.count!==0)
            }
        },
        // 清空购物车
        clearCart(state) {
            state.cartList = [];
        }
    }
});

// 异步请求
const { setFoodsList, changeActiveIndex, addCart, increCount, decreCount, clearCart } = foodStore.actions;
const fetchFoodsList = () => {
    return async (dispatch) => {
        // 编写异步逻辑
        const res = await axios.get('http://localhost:3004/takeaway');
        // 调用dispatch函数提交action
        dispatch(setFoodsList(res.data));
    };
};

// 导出
export { fetchFoodsList, changeActiveIndex, addCart, increCount, decreCount, clearCart };

const reducer = foodStore.reducer;
export default reducer;