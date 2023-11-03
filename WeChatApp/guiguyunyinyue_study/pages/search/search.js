import request from '../../utils/request';
// let isSend = false // 函数节流使用
let timer  //函数节流(my method)
Page({

    /**
     * 页面的初始数据
     */
    data: {
        placeholderContext:'', // placeholder的内容
        hotList:[], // 热搜榜数据
        searchContent:'', // 用户输入的表单项数据
        searchList:[], // 关键字模糊匹配的数据
        historyList:[], // 搜索历史记录
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取初始化数据
        this.getInitData()

        // 获取历史记录
        this.getSearchHistory()
    },

    // 获取初始化数据
    async getInitData(){
        let placeholderData = await request('/search/default')
        let hotListData = await request('/search/hot/detail')
        this.setData({
            placeholderContext:placeholderData.data.showKeyword,
            hotList:hotListData.data
        })
    },

    // 获取本地历史记录的函数
    getSearchHistory(){
        let historyList = wx.getStorageSync('historyList')
        if(historyList){
            this.setData({
                historyList
            })
        }
    },

    handleInputChange(event){
        // 更新searchContent的状态数据
        this.setData({
            searchContent:event.detail.value.trim()
        })

        // 函数节流(防抖)
        // if(isSend) {
        //     return
        // }

        // this.getSearchList()
        
        // isSend = true
        // setTimeout(() => {
        //     isSend = false
        // }, 300);

        // 函数防抖(我觉得比视频里的好👌)
        clearTimeout(timer)

        timer = setTimeout(() => {
            this.getSearchList()
        }, 300);

    },

    // 获取搜索数据的功能函数
    async getSearchList(){
        if(!this.data.searchContent) {
            this.setData({
                searchList:[]
            })
            return
        }

        let {searchContent,historyList} = this.data
        // 发请求获取关键字模糊匹配的数据
        let searchListData = await request('/search',{keywords: searchContent,limit:10})
        this.setData({
            searchList:searchListData.result.songs
        })

        // 将搜索的关键字添加到历史搜索列表中
        if(historyList.indexOf(searchContent) !== -1) {
            historyList.splice(historyList.indexOf(searchContent),1)
        }
        historyList.unshift(searchContent)
        this.setData({
            historyList
        })

        wx.setStorageSync('historyList',historyList)
    },

    // 清空搜索内容
    clearSearchContent(){
        this.setData({
            searchContent:'',
            searchList:[]
        })
    },

    // 清空搜索历史记录
    clearSearchHistory(){
        wx.showModal({
            title:'是否确认删除？',
            success: (res) => {
                if(res.confirm){
                    // 清空data中的historyList
                    this.setData({
                        historyList:[]
                    })
                    // 移除本地的历史记录缓存
                    wx.removeStorageSync('historyList')
                }
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