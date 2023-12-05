import classNames from 'classnames';
import Count from '../Count';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, decreCount, increCount } from '../../store/modules/takeaway';
import { useState } from 'react';

const Cart = () => {
    const { cartList } = useSelector(store => store.foods);

    // 计算总价
    const totalPrice = cartList.reduce((total, item) => total = total + item.price * item.count, 0);

    const dispatch = useDispatch();

    // 控制购物车显示隐藏
    const [visible, setVisible] = useState(false);

    // 点击显示购物车与遮罩层
    const showCart = () => {
        if (cartList.length === 0) {
            return;
        } else {
            setVisible(true);
        }
    };

    // 购物车减少至无商品时不显示
    const onDecreCount = (item) => {
        dispatch(decreCount({ id: item.id }));
        if (cartList.length === 1 && cartList[0].count === 1) {
            setVisible(false);
        }
    };

    // 清除购物车
    const clearCartList = () => {
        dispatch(clearCart());
        setVisible(false);
    };

    return (
        <div className="cartContainer">
            {/* 遮罩层 添加visible类名可以显示出来 */}
            <div
                className={classNames('cartOverlay', visible && 'visible')}
                onClick={() => setVisible(false)}
            />
            <div className="cart">
                {/* fill 添加fill类名可以切换购物车状态*/}
                {/* 购物车数量 */}
                <div className={classNames('icon', cartList.length > 0 && "fill")}>
                    {cartList.length > 0 && <div className="cartCornerMark">{cartList.length}</div>}
                </div>
                {/* 购物车价格 */}
                <div className="main" onClick={showCart}>
                    <div className="price">
                        <span className="payableAmount">
                            <span className="payableAmountUnit">¥</span>
                            {totalPrice.toFixed(2)}
                        </span>
                    </div>
                    <span className="text">预估另需配送费 ¥5</span>
                </div>
                {/* 结算 or 起送 */}
                {totalPrice > 20 ? (
                    <div className="goToPreview">去结算</div>
                ) : (
                    <div className="minFee">¥20起送</div>
                )}
            </div>
            {/* 添加visible类名 div会显示出来 */}
            <div className={classNames('cartPanel', visible && 'visible')}>
                <div className="header">
                    <span className="text">购物车</span>
                    <span className="clearCart" onClick={clearCartList}>
                        清空购物车
                    </span>
                </div>

                {/* 购物车列表 */}
                <div className="scrollArea">
                    {cartList.map(item => {
                        return (
                            <div className="cartItem" key={item.id}>
                                <img className="shopPic" src={item.picture} alt="" />
                                <div className="main">
                                    <div className="skuInfo">
                                        <div className="name">{item.name}</div>
                                    </div>
                                    <div className="payableAmount">
                                        <span className="yuan">¥</span>
                                        <span className="price">{item.price}</span>
                                    </div>
                                </div>
                                <div className="skuBtnWrapper btnGroup">
                                    <Count
                                        onPlus={() => dispatch(increCount({ id: item.id }))}
                                        onMinus={() => onDecreCount(item)}
                                        count={item.count}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Cart;
