import { NavBar, DatePicker } from 'antd-mobile';
import './index.scss';
import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import DailyBill from './components/DailyBill';

const Month = () => {
    // 控制弹框的打开和关闭
    const [dateVisible, setDateVisible] = useState(false);

    // 按月做数据的分组
    const billList = useSelector(store => store.bill.billList);
    const monthGroup = useMemo(() => {
        // return计算后返回的值
        return _.groupBy(billList, item => dayjs(item.date).format('YYYY-MM'));
    }, [billList]);

    // 控制时间显示
    const [currentDate, setCurrentDate] = useState(() => {
        return dayjs(new Date()).format('YYYY-MM');
    });

    // 当前月
    const [currentMonthList, setCurrentMonthList] = useState([]);

    // 基于数组做计算
    const currentMonthResult = useMemo(()=>{
        // 支出/收入/结余
        const pay = currentMonthList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
        const income = currentMonthList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
        return {
            pay,
            income,
            total:pay+income
        }
    },[currentMonthList])

    // 当月每日数据
    const dayGroup = useMemo(() => {
        const dateGroup = _.groupBy(currentMonthList, item => dayjs(item.date).format('YYYY-MM-DD'));
        const keys = Object.keys(dateGroup)
        // return计算后返回的值
        return {
            dateGroup,
            keys
        }
    }, [currentMonthList])

    // 初始化的时候把当前月的统计数据显示出来
    useEffect(()=>{
        const nowDate = dayjs().format('YYYY-MM')
        if(monthGroup[nowDate]){
            setCurrentMonthList(monthGroup[nowDate])
        }
    },[monthGroup])

    // 确认回调
    const onConfirm = (date) => {
        setDateVisible(false);
        const formatDate = dayjs(date).format('YYYY-MM');
        setCurrentDate(formatDate);
        // 当前月的数据计算数组
        setCurrentMonthList(monthGroup[formatDate] || [])
    };

    return (
        <div className="monthlyBill">
            <NavBar className="nav" backArrow={false}>
                月度收支
            </NavBar>
            <div className="content">
                <div className="header">
                    {/* 时间切换区域 */}
                    <div className="date" onClick={() => setDateVisible(true)}>
                        <span className="text">
                            {currentDate + ''}月账单
                        </span>
                        <span className={classNames('arrow', dateVisible && 'expand')}></span>
                    </div>
                    {/* 统计区域 */}
                    <div className='twoLineOverview'>
                        <div className="item">
                            <span className="money">{currentMonthResult.pay}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{currentMonthResult.income}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{currentMonthResult.total}</span>
                            <span className="type">结余</span>
                        </div>
                    </div>
                    {/* 时间选择器 */}
                    <DatePicker
                        className="kaDate"
                        onCancel={() => setDateVisible(false)}
                        onConfirm={onConfirm}
                        onClose={() => setDateVisible(false)}
                        title="记账日期"
                        precision="month"
                        visible={dateVisible}
                        max={new Date()}
                    />
                </div>

                {/* 单日列表统计 */}
                {dayGroup.keys.map(key=>{
                return <DailyBill key={key} date={key} dayList={dayGroup.dateGroup[key]}/>
                })}
            </div>
        </div >
    );
};

export default Month;