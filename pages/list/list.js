const {
  requesturl,
  newSong,
  mvUrl,
  radioUrl,
  hotUrl
} = require('../../utils/request');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: "",
    content: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // new radio mv  songer
    var type = options.type;
    this.setData({
      type: type
    });
    this.getRecommend();
  },
  // 每日推荐对应的内容
  async getRecommend() {
    if (this.data.type == 'new') {
      var url = newSong;
      const result = await requesturl(url);
      this.setData({
        content: result.result
      });
    } else if (this.data.type == 'radio') {
      var url = radioUrl;
      const result = await requesturl(url);
      this.setData({
        content: result.programs
      });
      // blurCoverUrl
      console.log(this.data.content);
    } else if (this.data.type == 'mv') {
      var url = mvUrl;
      const result = await requesturl(url);
      this.setData({
        content: result.data
      });
      console.log(result);
      console.log(this.data.content);
    } else {
      var url = hotUrl;
      const result = await requesturl(url);
      console.log(result);
      this.setData({
        content: result.artists
      });
      console.log(this.data.content);
    }
  },
  // 点击跳转到detail页面
  handle(event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    });
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