let getSongsTimeMiao = function (time) {
    let a = parseInt(time / 60000);
    let b = parseInt(((time / 60000) - a) * 60);
    let miao = b;
    return miao;
};
let getSongsTimeFen = function (time) {
    let a = parseInt(time / 60000);
    let fen = a;
    return fen;
};

function handleStr(str) {
    if (str.length > 20) {
        str = str.slice(0, 20) + "..."
    }
    return str;
};
function addTime(time) {
    if (time < 10) {
        time = "0"+time
    }
    return time;
}

module.exports = {
    getSongsTimeMiao,
    getSongsTimeFen,
    handleStr,
    addTime
}