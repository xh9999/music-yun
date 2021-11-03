const {
  requesturl,
  newSong,
  mvUrl,
  radioUrl,
  hotUrl
} = require('../../utils/request');
const app = getApp();
import Toast from "../../compentents/toast/toast"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: "",
    content: null,
    limit: 15
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
    // 每次请求数据之前需要提示加载中
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
      selector: '#van-toast',
      //这表示这个提示一直都在
      duration: 0,
    });
    // 推荐歌单
    if (this.data.type == 'new') {
      var url = newSong;
      const result = await requesturl(url, {
        limit: this.data.limit
      });
      // 获取到数据后清除轻提示
      Toast.clear();
      this.setData({
        content: result.result
      });
      console.log(this.data.content);
    } else if (this.data.type == 'radio') {
      var url = radioUrl;
      const result = await requesturl(url, {
        limit: this.data.limit
      });
      // 获取到数据后清除轻提示
      Toast.clear();
      this.setData({
        content: result.programs
      });
    } else if (this.data.type == 'mv') {
      var url = mvUrl;
      const result = await requesturl(url, {
        limit: this.data.limit
      });
      // 获取到数据后清除轻提示
      Toast.clear();
      this.setData({
        content: result.data
      });
    } else {
      var url = hotUrl;
      const result = await requesturl(url, {
        limit: this.data.limit
      });
      // 获取到数据后清除轻提示
      Toast.clear();
      console.log(result);
      this.setData({
        content: result.artists
      });
    }
  },
  handleList(event) {
    var tid = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${tid}&index=1`,
    });
  },
  // 点击跳转到detail页面
  handle(event) {
    var sid = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${sid}&index=4`,
    });
  },
  // 获取mv的地址
  click(event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/mvplayer/mvplayer?id=${id}`,
    });
  },
  onReachBottom: function () {
    // 当到底的时候继续加载
    this.setData({
      limit: this.data.limit + 10,
    });
    this.getRecommend();
  },
})