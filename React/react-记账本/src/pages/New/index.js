import { Button, DatePicker, Input, NavBar, Toast } from 'antd-mobile';
import Icon from '@/components/Icon';
import './index.scss';
import classNames from 'classnames';
import { billListData } from '@/contants';
import { redirect, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBillList } from '@/store/modules/billStore';
import dayjs from 'dayjs';

const New = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // 选取状态
    const [billType, setBillType] = useState('pay'); // pay-支出 income-收入
    // 获取金额
    const [money, setMoney] = useState(0);
    // 获取用途
    const [useFor, setUseFor] = useState('');
    // 获取日期
    const [date, setDate] = useState(new Date());
    // 是否显示时间选择器
    const [visible, setVisible] = useState(false);
    // 确认时间事件
    const dateConfirm = (value) => {
        setDate(value);
        setVisible(false);
    };
    // 保存账单
    const saveBill = () => {
        // 收集表单数据
        const data = {
            type: billType,
            money: billType === 'pay' ? -money : +money,
            date: date,
            useFor: useFor
        };
        dispatch(addBillList(data));
        // 轻提示
        Toast.show({
            content: '保存成功',
            afterClose: () => {
                navigate('/')
            },
        });
    };
    return (
        <div className="keepAccounts">
            <NavBar className="nav" onBack={() => navigate(-1)}>
                记一笔
            </NavBar>

            <div className="header">
                <div className="kaType">
                    <Button
                        shape="rounded"
                        className={classNames(billType === 'pay' ? 'selected' : '')}
                        onClick={() => setBillType('pay')}
                    >
                        支出
                    </Button>
                    <Button
                        className={classNames(billType === 'income' ? 'selected' : '')}
                        shape="rounded"
                        onClick={() => setBillType('income')}
                    >
                        收入
                    </Button>
                </div>

                <div className="kaFormWrapper">
                    <div className="kaForm">
                        <div className="date">
                            <Icon type="calendar" className="icon" />
                            <span className="text" onClick={() => setVisible(true)}>{dayjs(date).format('YYYY-MM-DD')}</span>
                            <DatePicker
                                className="kaDate"
                                title="记账日期"
                                max={new Date()}
                                visible={visible}
                                onCancel={() => setVisible(false)}
                                onConfirm={value => dateConfirm(value)}
                            />
                        </div>
                        <div className="kaInput">
                            <Input
                                className="input"
                                placeholder="0.00"
                                type="number"
                                value={money}
                                onChange={value => setMoney(value)}
                            />
                            <span className="iconYuan">¥</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="kaTypeList">
                {billListData[billType].map(item => {
                    return (
                        <div className="kaType" key={item.type}>
                            <div className="title">{item.name}</div>
                            <div className="list">
                                {item.list.map(item => {
                                    return (
                                        <div
                                            className={classNames(
                                                'item',
                                                useFor === item.type ? 'selected' : ''
                                            )}
                                            key={item.type}
                                            onClick={() => setUseFor(item.type)}
                                        >
                                            <div className="icon">
                                                <Icon type={item.type} />
                                            </div>
                                            <div className="text">{item.name}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="btns">
                <Button className="btn save" onClick={saveBill}>
                    保 存
                </Button>
            </div>
        </div>
    );
};

export default New;