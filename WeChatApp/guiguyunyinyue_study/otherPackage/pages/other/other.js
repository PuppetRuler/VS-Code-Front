import request from "../../../utils/request"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        person: {
            name: 'lora',
            age: '18'
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    // 获取用户openId的唯一标识
    handleGetOpenId() {
        // 1.获取登录凭证
        wx.login({
            success: async (res) => {
                let code = res.code
                // 2.将登录凭证发送到服务器
                let result = await request('/getOpenId',{code})
                console.log("code:",result);
            }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
});