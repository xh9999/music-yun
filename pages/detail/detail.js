const {
  requesturl,
  personal
} = require('../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // index为1表示推荐歌单为4表示热门歌手
    this.setData({
      id: options.id,
      index: options.index
    });
    this.getList();
  },

  // 获取对应榜单数据
  async getList() {
    if (this.data.index == 1) {
      const result = await requesturl(personal, {
        id: this.data.id
      });
      console.log(result);
    }
  },
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