// pages/login/login.js
Page({
  data: {

  },
  onLoad: function (options) {

  },
  // 手机号码登录
  handle(e) {
    var value = e.detail.value;
    var phone = value.phone.toString();
    var password = value.password.toString();
    var that=this
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
        wx.setStorageSync('cookieKey', cookieStr);
        wx.setStorageSync('img', res.data.profile.avatarUrl);
        wx.setStorageSync('name', res.data.profile.nickname);
        // 跳转到首页
        that.click();
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
  getmv() {
    wx.request({
      url: "http://121.5.237.135:3000/recommend/songs",
      method: "get",
      header: {
        'Cookie': wx.getStorageSync("cookieKey")
      },
      success: (res) => {
        console.log(res);
      },
    });
  },
})