import classNames from 'classnames';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeActiveIndex } from '../../store/modules/takeaway';

const Menu = () => {

    // 获取foodsList数据
    const { foodsList,activeIndex } = useSelector(store => store.foods);

    const dispatch = useDispatch();

    const menus = foodsList.map(item => ({ tag: item.tag, name: item.name }));
    return (
        <nav className="list-menu">
            {/* 添加active类名会变成激活状态 */}
            {menus.map((item, index) => {
                return (
                    <div
                        key={item.tag}
                        onClick={()=>dispatch(changeActiveIndex(index))}
                        className={classNames(
                            'list-menu-item',
                            activeIndex === index && 'active'
                        )}
                    >
                        {item.name}
                    </div>
                );
            })}
        </nav>
    );
};

export default Menu;
