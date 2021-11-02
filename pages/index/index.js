// index.js
// 获取应用实例
const app = getApp()
const {
  requesturl,
  sliderUrl,
  sonList
} = require('../../utils/request')
//Page Object
Page({
  data: {
    slider: [],
    value: null,
    musiclist: null
  },
  //options(Object)
  onLoad: function (options) {
    this.getBanner();
    this.getSonList();
  },
  async getBanner() {
    const result = await requesturl(sliderUrl);
    this.setData({
      slider: result.banners
    });
  },
  // 获取榜单
  async getSonList() {
    const result = await requesturl(sonList);

    var array = result.list.slice(0, 6);
    array.splice(4, 1, result.list[6]);
    this.setData({
      musiclist: array
    });
  },
  // 点击每日推荐出现对应的内容
  click: function (event) {
    var type = event.currentTarget.dataset.type;
    wx.navigateTo({
      url: `/pages/list/list?type=${type}`,
    });
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});