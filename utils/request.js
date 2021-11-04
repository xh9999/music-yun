export function requestGet(url, data) {
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
            success: ({ statusCode, data }) => {
                if (statusCode === 200) {
                    reslove(data);
                } else {
                    reject("服务器响应出错");
                }
            },
            // 请求失败执行的回调函数
            fail: function(err) {
                reject(err)
            },
            // 接口调用结束的回调函数（调用成功、失败都会执行）
            complete: function(res) {},
        });
    });
}


export var SongDataURL = "http://121.5.237.135:3000/song/detail?ids=" //GET请求

export var SongURL = "http://121.5.237.135:3000/song/url?id="

export var LyricURL = "http://121.5.237.135:3000/lyric?id="

export var listURL = "http://121.5.237.135:3000/playlist/detail?id=19723756"