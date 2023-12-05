import { Layout, Menu, Popconfirm } from 'antd';
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import './index.scss';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { clearUserInfo, fetchUserInfo } from '@/store/modules/user';
import { removeToken } from '@/utils';

const { Header, Sider } = Layout;

const items = [
    {
        label: '首页',
        key: '/',
        icon: <HomeOutlined />,
    },
    {
        label: '文章管理',
        key: '/article',
        icon: <DiffOutlined />,
    },
    {
        label: '创建文章',
        key: '/publish',
        icon: <EditOutlined />,
    },
];

const GeekLayout = () => {
    const navigate = useNavigate();
    // 点击切换目录事件
    const onMenuClick = (value) => {
        navigate(value.key);
    };
    // 高亮显示
    const location = useLocation();
    const selectedkey = location.pathname;
    // 触发获取用户信息的方法
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [dispatch]);
    // 获取用户名称
    const name = useSelector(store => store.user.userInfo).name;
    // 退出登录确认回调
    const onConfirm = () => {
        dispatch(clearUserInfo());
        removeToken();
        navigate('/');
    };
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <div className="user-info">
                    <span className="user-name">{name}</span>
                    <span className="user-logout">
                        <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
                            <LogoutOutlined /> 退出
                        </Popconfirm>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="dark"
                        selectedKeys={selectedkey}
                        items={items}
                        style={{ height: '100%', borderRight: 0 }}
                        onClick={onMenuClick}
                    ></Menu>
                </Sider>
                <Layout className="layout-content" style={{ padding: 20 }}>
                    <Outlet></Outlet>
                </Layout>
            </Layout>
        </Layout>
    );
};
export default GeekLayout;