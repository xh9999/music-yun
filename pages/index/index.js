import Notify from '../../compentents/vant/notify/notify';
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
  focus(){
    wx.navigateTo({
      url: '/pages/search/search',
    });
  },
  // 获取登录状态
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
    wx.request({
      //请求地址
      url: 'http://121.5.237.135:3000/logout',
      //请求方式
      method: "get",
      //请求返回结果的数据类型
      dataType: "json",
      //请求回调
      success(res) {
      },
      // 请求失败执行的回调函数
      fail: function (res) {
        console.log(res);
      },
      // 接口调用结束的回调函数（调用成功、失败都会执行）
      complete: function (res) {},
    });
  },
  // 登录
  golog() {
    wx.navigateTo({
      url: '/pages/login/login',
    });
    console.log(this.data.iconImg);

  },
  // banner部分
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
    if (type == "new" || type == "songer") {
      // 如果登录直接前往list页面，否则需要登录
      if (wx.getStorageSync("cookieKey")) {
        wx.navigateTo({
          url: `/pages/list/list?type=${type}`,
        });
      } else {
        Notify({
          type: 'primary',
          message: '请先登录',
          duration: 1000
        });
      }
    } else {
      wx.navigateTo({
        url: `/pages/list/list?type=${type}`,
      });
    }
  },
  //热门榜单事件
  gettop(event){
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}&tag=two`,
    });
  },
  onShow: function () {
    this.getStauts();
  },
  onHide: function () {

  },
});