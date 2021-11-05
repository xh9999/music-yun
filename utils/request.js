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
// 喜欢列表
var likeList="http://121.5.237.135:3000/likelist"
function requestGet(url, data) {
    return new Promise((reslove, reject) => {
        wx.request({
            //请求地址
            url: url,
            //请求方式
            method: "get",
            //请求参数
            data: data,
            //设置请求头  如果发送的是post请求，一定要添加请求的content-type
            header: {
                "content-type": "application/json",
            },
            //请求返回结果的数据类型
            dataType: "json",
            //请求回调
            success: ({
                statusCode,
                data
            }) => {
                if (statusCode === 200) {
                    reslove(data);
                } else {
                    reject("服务器响应出错");
                }
            },
            // 请求失败执行的回调函数
            fail: function (err) {
                reject(err)
            },
            // 接口调用结束的回调函数（调用成功、失败都会执行）
            complete: function (res) {},
        });
    });
}
var SongDataURL = "http://121.5.237.135:3000/song/detail?ids=" //GET请求

var SongURL = "http://121.5.237.135:3000/song/url?id="

var LyricURL = "http://121.5.237.135:3000/lyric?id="

var listURL = "http://121.5.237.135:3000/playlist/detail?id="
module.exports = {
    requesturl: requesturl,
    requestGet:requestGet,
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
    mvcomment: mvcomment,
    SongDataURL:SongDataURL,
    SongURL:SongURL,
    LyricURL:LyricURL,
    listURL:listURL,
    likeList:likeList
}