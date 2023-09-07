//求和相关的配置
export default {
    namespaced:true,
    actions: {
        jiaOdd(context, value) {
            // console.log('action里的jia被调用了',context,value);
            if (context.state.sum % 2) {
                context.commit('JIA', value);
            }
        },
        jiaWait(context, value) {
            // console.log('action里的jia被调用了',context,value);
            setTimeout(() => {
                context.commit('JIA', value);
            }, 500);
        },
    },
    mutations: {
        JIA(state, value) {
            // console.log('mutation里的JIA被调用了');
            state.sum += value;
        },
        JIAN(state, value) {
            // console.log('mutation里的JIAN被调用了');
            state.sum -= value;
        },
    },
    state: {
        sum: 0,  //当前的和
        school: '尚硅谷',
        subject: '前端',
    },
    getters: {
        bigSum(state) {
            return state.sum * 10;
        }
    },
};