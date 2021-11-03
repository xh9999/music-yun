function http({
    url,
    success
}){
    wx.request({
        url,
        method: 'GET',
        header: {'content-type':'application/json'},
        dataType:'json',
        responseType:'text',
        success: (res)=>{
            success(res)
        },
    });
};
function getMeHttp({
    url,
    success
}){
    wx.request({
        url,
        method: 'GET',
        header: {'content-type':'application/json'},
        dataType:'json',
        responseType:'text',
        success: (res)=>{
            success(res)
        },
    });
};
module.exports={http,getMeHttp}