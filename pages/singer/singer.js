const app = getApp();
Page({
  data: {
    id: '',
    songList: []
  },
  onLoad: function (options) {
    this.id = options.singerid
    wx.request({
      url: 'http://121.5.237.135:3000/artist/top/song?id=' + this.id,
      method: "get",
      data: {},
      header: {},
      dataType: "json",
      success: (res) => {
        this.setData({
          songList: res.data.songs
        });
        app.globalData.topid=null;
        app.globalData.everyday=null;
        app.globalData.radio=null;
        app.globalData.searchSong=res.data.songs
      },
      fail: function (res) {},
      complete: function (res) {},
    })
  },
  songid(e) {
    const songId = e.currentTarget.dataset;
    app.globalData.id = songId.id;
    wx.switchTab({
      url: `/pages/player/player`,
    })
  }
})