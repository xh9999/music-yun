// pages/me/me.js
const app = getApp();
const {
  requesturl,
  likeList,
  musicDetail
} = require('../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad: function (options) {
    if (wx.getStorageSync("img")) {
      this.setData({
        backgroundImg: wx.getStorageSync("img"),
        name: wx.getStorageSync("name"),
        useId: wx.getStorageSync("useId")
      });
      this.getLike();
    }
  },
  async getLike() {
    const result = await requesturl(likeList, {
      uid: this.data.useId
    });
    console.log(result);
    var songsList = [];
    var obj = {};
    var array = result.ids;
    console.log(array);
    var that = this
    // this.getLikeSong(1313591404);
    array.forEach((item) => {
      that.getLikeSong(item).then((songs) => {
        obj.names = songs.songs[0].name,
          obj.id = songs.songs[0].id,
          obj.arname = songs.songs[0].ar.name,
          obj.img = songs.songs[0].al.picUrl,
          songsList.push(obj);
        obj = {};
      });
    });
    this.setData({
      songsList:songsList
    });
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
})