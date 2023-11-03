// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        msg: "这是一个初始化数据",
        userInfo: {} // 用户的基本信息
    },

    handleParent() {
        console.log("handleParent");
    },
    handleChild() {
        console.log("handleChild");
    },
    toLogs() {
        wx.navigateTo({
            url: '../logs/logs',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log('onLoad()', "监听页面加载");

        // 修改msg的状态数据，语法:this.setData
        // console.log(this.data.msg); // this代表当前页面的实例对象
        // setTimeout(()=>{
        //     this.setData({
        //         msg:"修改之后的数据"
        //     })
        //     console.log(this.data.msg);
        // })

        // 授权以后获取用户信息
        wx.getUserInfo({
            success: (res) => {
                console.log(res);
                this.setData({
                    userInfo:res.userInfo
                })
            },
            fail: (err) => {
                console.log(err);
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        console.log('onReady()', "监听页面初次渲染完成");
    },

    // 获取用户信息的回调
    handleGetUserInfo(res) {
        console.log(res);
        if (res.detail.userInfo) { // 允许
            // 修改userInfo的状态数据
            this.setData({
                userInfo: res.detail.userInfo
            })
        }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        console.log('onShow()', "监听页面显示 执行多次");
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
        console.log('onHide() 监听页面隐藏');
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        console.log("监听页面卸载");
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})