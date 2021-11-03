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
    musiclist: null,
    iconImg: null,
    stauts: null,
    name: null
  },
  //options(Object)
  onLoad: function (options) {
    this.getBanner();
    this.getSonList();
    this.getStauts();
  },
  getStauts() {
    var stauts = wx.getStorageSync("cookieKey");
    var iconImg = wx.getStorageSync("img");
    var name = wx.getStorageSync("name");
    this.setData({
      stauts: stauts,
      iconImg: iconImg,
      name: name
    });
  },
  // 退出登录
  outlog() {
    wx.removeStorageSync("cookieKey");
    wx.removeStorageSync("img");
    wx.removeStorageSync("name");
    this.getStauts();
  },
  // 登录
  golog() {
    wx.navigateTo({
      url: '/pages/login/login',
    })

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
  onShow: function () {
    this.getStauts();
  },
  onHide: function () {

  },
});