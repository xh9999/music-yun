function requesturl(url, data) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            data: data,
            header: {
                'content-type': 'application/json' // 默认值
            },
            method: 'get',
            success: function (res) {
                resolve(res.data);
            },
            fail: function (err) {
                reject(err);
            }
        })
    })
};
var sliderUrl = "http://121.5.237.135:3000/banner?type=2"; //get请求轮播图
// 专辑
var albumUrl="http://121.5.237.135:3000/album/newest";//get请求
module.exports = {
    requesturl: requesturl,
    sliderUrl: sliderUrl
}