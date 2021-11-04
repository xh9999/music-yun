function requesturl(url, data) {
    if (wx.getStorageSync("cookieKey")) {
        return new Promise((resolve, reject) => {
            wx.request({
                url: url,
                data: data,
                header: {
                    'content-type': 'application/json', // 默认值
                    'Cookie': wx.getStorageSync("cookieKey")
                },
                method: 'get',
                success: function (res) {
                    resolve(res.data);
                },
                fail: function (err) {
                    reject(err);
                }
            })
        });
    } else {
        return new Promise((resolve, reject) => {
            wx.request({
                url: url,
                data: data,
                header: {
                    'content-type': 'application/json', // 默认值
                },
                method: 'get',
                success: function (res) {
                    resolve(res.data);
                },
                fail: function (err) {
                    reject(err);
                }
            })
        });
    }
};
var sliderUrl = "http://121.5.237.135:3000/banner?type=2"; //get请求轮播图
// 专辑
var albumUrl = "http://121.5.237.135:3000/album/newest"; //get请求
// 获取歌单榜
var sonList = "http://121.5.237.135:3000/toplist/detail"; //get请求
// 获取推荐歌曲
var newSong = "http://121.5.237.135:3000/recommend/songs"; //get请求
// 获取mv
var mvUrl = "http://121.5.237.135:3000/top/mv"; //get请求
// 获取推荐电台
var radioUrl = "http://121.5.237.135:3000/program/recommend"; //get请求
// 获取每日推荐歌单
var hotUrl = "http://121.5.237.135:3000/recommend/resource"; //get请求
// 获取mv的url
var mv = "http://121.5.237.135:3000/mv/url";
// 获取相似mv
var simimv = "http://121.5.237.135:3000/simi/mv";
// 获取榜单的内容
var personal = "http://121.5.237.135:3000/playlist/detail";
// 获取音乐的url
var musicUrl = "http://121.5.237.135:3000/song/url";
// 获取歌曲详情
var musicDetail = "http://121.5.237.135:3000/song/detail"; //传入歌曲的id
// mv评论
var mvcomment = "http://121.5.237.135:3000/comment/mv";
module.exports = {
    requesturl: requesturl,
    sliderUrl: sliderUrl,
    sonList: sonList,
    newSong: newSong,
    mvUrl: mvUrl,
    radioUrl: radioUrl,
    hotUrl: hotUrl,
    mv: mv,
    simimv: simimv,
    personal: personal,
    musicUrl: musicUrl,
    musicDetail: musicDetail,
    mvcomment: mvcomment
}