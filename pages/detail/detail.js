const {
  requesturl,
  personal
} = require('../../utils/request');
const app = getApp();
import Toast from "../../components/vant/toast/toast";
Page({
  data: {
    id: null,
    content: null,
    imgUrl: null,
    tag: null,
    uid: null,
    limit: 15
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      tag: options.tag
    });
    // 对应的榜单id
    app.globalData.topid = options.id;
    app.globalData.everyday = null;
    app.globalData.radio = null;
    app.globalData.searchSong = null;
    app.globalData.searchmusics = null;
    this.getList();
  },

  // 获取对应榜单数据
  async getList() {
    // 每次请求数据之前需要提示加载中
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
      selector: '#van-toast',
      //这表示这个提示一直都在
      duration: 0,
    });
    var result = await requesturl(personal, {
      id: this.data.id
    });
    // 获取到数据后清除轻提示
    Toast.clear();
    this.setData({
      content: result.playlist.tracks,
      imgUrl: result.playlist.coverImgUrl,
    });
  },
  player(event) {
    var id = event.currentTarget.dataset.id;
    app.globalData.id = id;
    // 跳转到跳转tabBar页面不能传递参数
    wx.switchTab({
      url: `/pages/player/player`,
    })
  },
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.globalData.topid = this.data.id;
    app.globalData.everyday = null;
    app.globalData.radio = null;
    app.globalData.searchSong = null;
    app.globalData.searchmusics = null;
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
})