import PubSub from 'pubsub-js';
import moment from 'moment';
import request from '../../../utils/request';
// 获取全局唯一的 App 实例
const appInstance = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPlay: false, // 音乐是否播放
        song: {}, // 歌曲详情对象
        musicId: '', // 音乐id
        musicLink: '', // 音乐链接
        currentTime:'00:00', // 当前时间
        durationTime: '00:00', // 总时长
        currentTimeWidth:0, // 实时进度条的宽度
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // options:用于接收路由传参的query参数
        // 原生小程序中路由传参，对于参数的长度有限制，如果参数过长会自动截掉
        // console.log(options.song);

        let musicId = options.musicId;
        this.setData({
            musicId
        });
        // 获取歌曲的详情
        this.getMusicInfo(musicId);

        /* 
            问题：如果用户操作系统的控制音乐播放/暂停的按钮，页面不知道，导致页面显示是否播放的状态和真实的音乐播放状态不一致
            解决方案:
                1.通过控制音频的实例 backgroundAudioManager 去监视音乐播放/暂停
        */
        // 判断当前页面音乐是否在播放
        if (appInstance.globalData.isMusicPlay && appInstance.globalData.musicId === musicId) {
            // 修改当前页面音乐播放状态为true
            this.setData({
                isPlay: true
            });
        }
        // 创建控制音乐播放的实例
        this.backgroundAudioManager = wx.getBackgroundAudioManager();
        // 监视音乐的播放/暂停/停止
        this.backgroundAudioManager.onPlay(() => {
            this.changePlayState(true);
            appInstance.globalData.musicId = musicId;
        });
        this.backgroundAudioManager.onPause(() => {
            this.changePlayState(false);
        });
        this.backgroundAudioManager.onStop(() => {
            this.changePlayState(false);
        });

        // 监听音乐播放自然结束
        this.backgroundAudioManager.onStop(() => {
            // 自动切换至下一首音乐，并且自动播放
            PubSub.publish('switchType','next')
            // 将实时进度条长度还原成0
            this.setData({
                currentTimeWidth:0,
                currentTime:'00:00'
            })
        });

        // 监听页面实时播放的进度
        this.backgroundAudioManager.onTimeUpdate(() => {
            // 总时长: backgroundAudioManager.duration
            // 现时长: backgroundAudioManager.currentTime
            // 格式化播放的实时时间
            let currentTime = moment(this.backgroundAudioManager.currentTime * 1000).format('mm:ss')
            let currentTimeWidth = this.backgroundAudioManager.currentTime/this.backgroundAudioManager.duration * 450
            this.setData({
                currentTime,
                currentTimeWidth
            })
        })
    },

    // 修改播放状态的功能函数
    changePlayState(isPlay) {
        // 修改播放状态
        this.setData({
            isPlay
        });

        // 修改全局音乐的播放状态
        appInstance.globalData.isMusicPlay = isPlay;
    },

    // 获取音乐详情的功能函数
    async getMusicInfo(musicId) {
        let musicData = await request('/song/detail', { ids: musicId });

        let durationTime = moment(musicData.songs[0].dt).format('mm:ss')  // 单位:ms
        this.setData({
            song: musicData.songs[0],
            durationTime
        });

        // 动态修改窗口的标题
        wx.setNavigationBarTitle({
            title: this.data.song.name
        });
    },

    // 点击暂停/播放的回调
    handleMusicPlay() {
        let isPlay = !this.data.isPlay;
        // this.setData({
        //     isPlay
        // });

        let { musicId,musicLink } = this.data;
        this.controlMusic(isPlay, musicId, musicLink);
    },

    // 控制音乐播放/暂停的功能函数
    async controlMusic(isPlay, musicId, musicLink) {
        if (isPlay) { // 音乐播放
            if (!musicLink) {
                console.log('111');
                // 获取音乐播放链接
                let musicLinkData = await request('/song/url', { id: musicId });
                musicLink = musicLinkData.data[0].url;

                this.setData({
                    musicLink
                })
            }

            this.backgroundAudioManager.src = musicLink;
            this.backgroundAudioManager.title = this.data.song.name;
        } else { // 音乐暂停
            this.backgroundAudioManager.pause();
        }
    },

    // 点击切歌的回调
    handleSwitch(event) {
        // 获取切歌的类型
        let type = event.currentTarget.id;

        // 关闭正在播放的音乐
        this.backgroundAudioManager.stop();
        // 订阅来自 recommendSong 页面发布的musicId消息
        PubSub.subscribe('musicId', (msg, musicId) => {
            console.log(musicId);

            // 获取音乐详情
            this.getMusicInfo(musicId);
            // 音乐自动播放
            this.controlMusic(true, musicId);
            // 取消订阅
            PubSub.unsubscribe('musicId');
        });
        // 发布消息数据给 recommendSong 页面
        PubSub.publish('switchType', type);
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