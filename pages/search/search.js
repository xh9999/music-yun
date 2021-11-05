import Toast from '../../compentents/vant/toast/toast';
import {
  getSongsTimeFen,
  getSongsTimeMiao,
  handleStr,
  addTime,
  arrQc
} from "../../utils/search/utils";
const app = getApp();
const {
  http
} = require("../../utils/search/http");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musics: [],
    offset: 0,
    keyword: null,
    ev: {},
    aid: "", //音乐id
    prevId: "",
    bid: "" //视频id
  },

  onSubimt(event) {
    const toast = Toast.loading({
      duration: 0,
      forbidClick: true,
      message: '加载中',
      selector: '#van-toast',
    });
    if (event.detail != this.data.keyword) {
      this.data.musics = [];
      this.data.offset = 0;
    } else if (event.detail = this.data.keyword) {
      this.setData({
        offset: ++this.data.offset
      });
    }
    var ev = event;
    var keyword = event.detail;
    var url = `http://121.5.237.135:3000/search?keywords=${keyword}&limit=20&offset=${this.data.offset*20}`;
    http({
      url,
      success: res => {
        var musics = [];
        var songs = res.data.result.songs;
        songs.forEach(item => {
          var {
            name,
            id,
            artists,
            duration,
            timeFen,
            timeMiao,
            mvid
          } = item;
          musics.push({
            name: handleStr(name),
            id,
            mvid,
            author: handleStr(artists[0]),
            duration,
            timeFen: getSongsTimeFen(duration),
            timeMiao: addTime(getSongsTimeMiao(duration)),
            isPlay: false
          });
        });
        var arr = [...this.data.musics, ...musics];
        var musicArr = arrQc(arr, "id")
        this.setData({
          musics: musicArr,
          keyword,
          ev
        });
      },
      fail: res => {
        console.log("err")
      },
    });
    Toast.clear();
  },
  onReachBottom: function () {
    this.onSubimt(this.data.ev);
  },
  onPlay(e) {
    var {
      aid
    } = e.currentTarget.dataset;
    var musics = this.data.musics;
    var prevId = this.data.prevId;
    if (aid != prevId) {
      musics.forEach(item => {
        if (item.id == aid) {
          item.isPlay = true;
        } else {
          item.isPlay = false;
        }
      });
      this.setData({
        musics,
        prevId: aid
      })
    } else {
      musics.forEach(item => {
        if (item.id == aid) {
          item.isPlay = !item.isPlay;
        }
      });
      this.setData({
        musics
      })
    };
    this.setData({
      aid
    });
    // 跳转播放页面
    app.globalData.id = this.data.aid;
    wx.switchTab({
      url: '/pages/player/player',
    });
  },
  onCancel(e) {
    console.log("取消搜索")
    var musics = [];
    var offset = 0;
    this.setData({
      musics,
      offset
    })
  },
  onGetMvid(e) {
    var {
      bid
    } = e.currentTarget.dataset;
    this.setData({
      bid
    });
    wx.navigateTo({
      url: `/pages/mvplayer/mvplayer?id=${this.data.bid}`,
    });
  },
  onLoad: function (options) {

  }
})