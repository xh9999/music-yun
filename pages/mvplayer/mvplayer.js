const {
  mv,
  requesturl,
  simimv
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    url:null,
    content:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.setData({
      id: id
    });
    this.getMv();
  },
  handle(event) {
    // 相似音乐中的id
    var uid=event.currentTarget.dataset.id;
    this.setData({
      id:uid
    });
    // 点击相似mv播放后重新渲染页面的mv
    this.getMv();
  },
  async getMv(){
    const result=await requesturl(mv,{id:this.data.id});
    const res=await requesturl(simimv,{mvid:this.data.id});
    this.setData({
      url:result.data.url,
      content:res.mvs
    });
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