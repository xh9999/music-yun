// pages/me/me.js
const app = getApp();
import Notify from '../../components/vant/notify/notify';
const {
  requesturl,
  likeList,
  musicDetail
} = require('../../utils/request');
var ress = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: [],
    content: []
  },
  onLoad: function (options) {
    if (!wx.getStorageSync("content")) {
      wx.setStorageSync('content', app.globalData.array);
    }
    var result = wx.getStorageSync("content");
    if (wx.getStorageSync("img")) {
      this.setData({
        backgroundImg: wx.getStorageSync("img"),
        name: wx.getStorageSync("name"),
        useId: wx.getStorageSync("useId"),
        content: result
      });
    }
  },
  player(event) {
    var id = event.currentTarget.dataset.id;
    app.globalData.id = id;
    app.globalData.like = "like";
    // 跳转到跳转tabBar页面不能传递参数
    wx.switchTab({
      url: `/pages/player/player`,
    })
  },
  async getLike() {
    const result = await requesturl(likeList, {
      uid: this.data.useId
    });
    var songsList = [];
    var obj = {};
    var array = result.ids;
    var that = this
    // this.getLikeSong(1313591404);
    array.forEach((item) => {
      that.getLikeSong(item).then((songs) => {
        obj.names = songs.songs[0].name;
        obj.id = songs.songs[0].id;
        obj.arname = songs.songs[0].ar[0].name;
        obj.img = songs.songs[0].al.picUrl;
        songsList.push(obj);
        obj = {};
      });
    });
    return songsList
  },
  async getLikeSong(id) {
    const result = await requesturl(musicDetail, {
      ids: id
    });
    return result
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onChange(event) {
    if (wx.getStorageSync("content")) {
      this.setData({
        activeNames: event.detail,
      });
    } else {
      Notify({
        type: 'primary',
        message: '请先登录',
        duration: 1000,
      });
    }
  },
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!wx.getStorageSync("content")) {
      wx.setStorageSync('content', app.globalData.array);
    }
    var result = wx.getStorageSync("content");
    if (wx.getStorageSync("img")) {
      this.setData({
        backgroundImg: wx.getStorageSync("img"),
        name: wx.getStorageSync("name"),
        useId: wx.getStorageSync("useId"),
        content: result
      });
    }else {
      this.setData({
        backgroundImg: null,
        name: null,
        content: null
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      activeNames:[]
    })
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