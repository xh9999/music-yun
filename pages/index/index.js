// index.js
// 获取应用实例
const app = getApp()
const {
  requesturl,
  sliderUrl
} = require('../../utils/request')
//Page Object
Page({
  data: {
    slider: [],
    value:null
  },
  //options(Object)
  onLoad: function (options) {
    this.getBanner();
  },
  async getBanner() {
    const result = await requesturl(sliderUrl);
    // 将
    this.setData({
      slider: result.banners
    });
  },
  click:function(){
    console.log(123);
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