import NavBar from './components/NavBar';
import Menu from './components/Menu';
import Cart from './components/Cart';
import FoodsCategory from './components/FoodsCategory';

import './App.scss';
import { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { fetchFoodsList } from './store/modules/takeaway';
import store from './store';


const App = () => {
    // 触发action执行
    // 1. useDispatch -> dispatch 2. actionCreater导入进来 3. useEffect
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchFoodsList());
    }, [dispatch]);

    // 获取foodsList渲染数据列表
    const { foodsList, activeIndex } = useSelector(store => store.foods);

    return (
        <div className="home">
            {/* 导航 */}
            <NavBar />

            {/* 内容 */}
            <div className="content-wrap">
                <div className="content">
                    <Provider store={store}>
                        <Menu />
                    </Provider>

                    <div className="list-content">
                        <div className="goods-list">
                            {/* 外卖商品列表 */}
                            {foodsList.map((item, index) => {
                                return (
                                    activeIndex === index && <FoodsCategory
                                        key={item.tag}
                                        // 列表标题
                                        name={item.name}
                                        // 列表商品
                                        foods={item.foods}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* 购物车 */}
            <Cart />
        </div>
    );
};

export default App;
