const app = getApp();
const {
  requesturl,
  musicUrl,
  musicDetail
} = require('../../utils/request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    url: null,
    musicImg: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = app.globalData.id;
    this.setData({
      id: id
    });
    this.getUrl();
    this.getDetail();
  },

  // 获取音乐的url
  async getUrl() {
    const result = await requesturl(musicUrl, {
      id: this.data.id
    });
    console.log(result);
    this.setData({
      url: result.data[0].url,
    })
    console.log(this.data.url);
  },
  // 获取音乐的详情
  async getDetail() {
    const result = await requesturl(musicDetail, {
      ids: this.data.id
    });
    console.log(result);
    this.setData({
      musicImg: result.songs[0].al.picUrl
    });
    console.log(this.data.musicImg);
  },
  onReady: function (e) {
    this.audioCtx = wx.createAudioContext('myAudio');
    this.audioPlay();

  },
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var id = app.globalData.id;
    this.setData({
      id: id
    });
    this.getUrl();
    this.getDetail();
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

  },
  
})