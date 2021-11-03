import {
  commonProps
} from "../../components/vant/field/props";
import Toast from '../../components/vant/toast/toast';
import {
  getSongsTimeFen,
  getSongsTimeMiao,
  handleStr,
  addTime
} from "../../utils/search/utils";
const app = getApp();
const {
  http,
  getMeHttp
} = require("../../utils/search/http");

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    musics: [],
    offset: 0,
    keyword: "",
    ev: {},
    aid:""
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    };
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onSubimt(event) {
    const toast = Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: '加载中',
      selector: '#van-toast',
    });
    if(event.detail!=this.data.keyword){
      this.data.musics=[];
    }
    var ev = event;
    var keyword = event.detail;
    var url = `http://121.5.237.135:3000/search?keywords=${keyword}&offset=${this.data.offset}`;
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
            timeMiao
          } = item;
          musics.push({
            name: handleStr(name),
            id,
            author: handleStr(artists[0]),
            duration,
            timeFen: getSongsTimeFen(duration),
            timeMiao: addTime(getSongsTimeMiao(duration)),
          });
        });
        this.setData({
          musics: [...this.data.musics, ...musics],
          keyword,
          ev
        });
      }
    });
    Toast.clear();
  },
  onReachBottom: function () {
    this.setData({
      offset: ++this.data.offset,
    });
    this.onSubimt(this.data.ev);
  },
  onPlay(e){
    var {aid} = e.currentTarget.dataset;
    // var url = `http://121.5.237.135:3000/song/url?id=${aid}`
    this.setData({aid});
    console.log(this.data.aid)
    // http({
    //   url,
    //   success: res => {
    //     var playUrl = res.data.data[0].url;
    //     this.setData({
    //       playUrl
    //     });
    //   }
    // });
  }
})