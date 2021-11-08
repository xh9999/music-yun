const {
  requesturl,
  newSong,
  mvUrl,
  radioUrl,
  hotUrl
} = require('../../utils/request');
const app = getApp();
import Toast from "../../components/vant/toast/toast";
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
    // 每日推荐
    if (this.data.type == 'new') {
      var url = newSong;
      const result = await requesturl(url);
      // 将每日推荐的所有内容传递到播放列表中
      app.globalData.everyday = result.recommend;
      app.globalData.topid = null;
      app.globalData.radio = null;
      app.globalData.searchSong = null;
      app.globalData.searchmusics = null;
      app.globalData.like=null;
      // 获取到数据后清除轻提示
      Toast.clear();
      this.setData({
        content: result.recommend
      });
      // 推荐电台
    } else if (this.data.type == 'radio') {
      var url = radioUrl;
      const result = await requesturl(url, {
        limit: this.data.limit
      });
      const result1 = await requesturl(url, {
        limit: 25
      });
      app.globalData.everyday = null;
      app.globalData.topid = null;
      app.globalData.searchSong = null;
      app.globalData.searchmusics = null;
      app.globalData.radio = result1;
      app.globalData.like=null;
      // 获取到数据后清除轻提示
      Toast.clear();
      this.setData({
        content: result.programs
      });
      // 推荐mv
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
      // 推荐歌单
    } else {
      var url = hotUrl;
      const result = await requesturl(url, {
        limit: this.data.limit
      });
      // 获取到数据后清除轻提示
      Toast.clear();
      this.setData({
        content: result.recommend
      });
    }
  },
  handleList(event) {
    var tid = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${tid}&index=1`,
    });
  },
  // 点击跳转到播放页面
  player(event) {
    var id = event.currentTarget.dataset.id;
    app.globalData.id = id;
    // 跳转到跳转tabBar页面不能传递参数
    wx.switchTab({
      url: `/pages/player/player`,
    })
  },
  // 点击跳转到detail页面
  handle(event) {
    var sid = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${sid}&tag=one`,
    });
  },
  // 获取mv的地址
  click(event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/mvplayer/mvplayer?id=${id}`,
    });
  },
  // 点击播放对应的mv
  clickmv(event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/mvplayer/mvplayer?id=${id}`,
    });
  },
  onShow: function () {
    this.getRecommend();
  },
  onReachBottom: function () {
    // 当到底的时候继续加载
    this.setData({
      limit: this.data.limit + 10,
    });
    this.getRecommend();
  },
})