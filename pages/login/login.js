import Notify from '../../components/vant/notify/notify';
const app = getApp();
const {
  requesturl,
  likeList,
  musicDetail
} = require('../../utils/request');
Page({
  data: {

  },
  onLoad: function (options) {},
  // 手机号码登录
  handle(e) {
    var value = e.detail.value;
    var phone = value.phone.toString();
    var password = value.password.toString();
    var that = this
    wx.request({
      //请求地址
      url: 'http://121.5.237.135:3000/login/cellphone',
      //请求方式
      method: "post",
      //请求参数
      data: {
        "phone": phone,
        "password": password
      },
      //设置请求头
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      //请求返回结果的数据类型
      dataType: "json",
      //请求回调
      success(res) {
        var cookieStr = "";
        var cookieArr = new Array();
        res.cookies.forEach((item, index, array) => {
          cookieArr.push(item.split(";")[0]);
        });
        cookieStr = cookieArr.join(";");
        // 当状态码为200说明登录成功
        if (res.data.code == 200) {
          wx.removeStorageSync("cookieKey");
          wx.removeStorageSync("img");
          wx.removeStorageSync("name");
          wx.removeStorageSync("useId");
          wx.removeStorageSync("likelist");
          wx.setStorageSync('cookieKey', cookieStr);
          wx.setStorageSync('img', res.data.profile.avatarUrl);
          wx.setStorageSync('name', res.data.profile.nickname);
          wx.setStorageSync('useId', res.data.profile.userId);
          that.getLike().then((result) => {
            app.globalData.array = result
          });
          // 跳转到首页
          Notify({
            type: 'success',
            message: "登录成功",
            duration: 1000,
            onClose: function () {
              that.click();
            }
          });
        } else {
          var message = res.data.message
          Notify({
            type: 'warning',
            message: message
          });
        }
      },
      // 请求失败执行的回调函数
      fail: function (res) {
        console.log(res);
      },
      // 接口调用结束的回调函数（调用成功、失败都会执行）
      complete: function (res) {},
    });
  },
  click() {
    // 跳转到首页
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  async getLike() {
    const result = await requesturl(likeList, {
      uid: wx.getStorageSync("useId")
    });
    var obj = {};
    var array = result.ids;
    var that = this;
    var songsList=[];
    console.log(123);
    array.forEach((item) => {
      that.getLikeSong(item).then((songs) => {
        obj.names = songs.songs[0].name;
        obj.id = songs.songs[0].id;
        obj.arname = songs.songs[0].ar[0].name;
        obj.img = songs.songs[0].al.picUrl;
        songsList[songsList.length] = obj;
        obj = {};
      });
    });
    console.log(456);
    console.log(songsList);
    return songsList
  },
  async getLikeSong(id) {
    const result = await requesturl(musicDetail, {
      ids: id
    });

    return result
  },
})