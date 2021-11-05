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
    if (str.length > 16) {
        str = str.slice(0, 16) + "..."
    }
    return str;
};
function addTime(time) {
    if (time < 10) {
        time = "0"+time
    }
    return time;
};
function arrQc(arr, name) {
    var hash = {};
    return arr.reduce(function (item, next) {
      hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
      return item;
    }, []);
  }

module.exports = {
    getSongsTimeMiao,
    getSongsTimeFen,
    handleStr,
    addTime,
    arrQc
}