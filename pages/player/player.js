const app = getApp();
import { requestGet, SongDataURL, SongURL, LyricURL } from "../../utils/request"

Page({
    data: {
        isPlay: '',
        innerAudioContext: {},
        song: [],
        url: [],
        songid: [],
        showLyric: [], //所有歌词
        currentLyric: "", //当前歌词对象
        lyricTime: 0, //歌词对应的时间
        marginTop: 0, //滚动距离
        currentIndex: 0, //当前第几行
        lyricTop: 0,
        currentDot: 0,
        dotsArray: new Array(2),
        duration: 0,
        percent: 0,
        flag: false
    },
    onLoad: function(option) {
        const audioid = option.id;
        this.play(audioid);
        this.getSongData();
        this.getSongURL();
        this.getLyricURL();
    },
    play: function(audioid) {
        const audioId = audioid;
        app.globalData.songId = audioId;
        const innerAudioContext = wx.createInnerAudioContext();
        this.setData({
            innerAudioContext: innerAudioContext,
            isPlay: true,
        })
    },
    async getSongData() {
        const result = await requestGet(SongDataURL)
        this.setData({
            song: result.songs[0]
        })
    },
    async getSongURL() {
        const result = await requestGet(SongURL)
        this.setData({
            url: result.data[0]
        })
        this.createBgAudio(result.data[0])
        app.globalData.songName = result.data[0].name;
    },

    async getLyricURL() {
        const result = await requestGet(LyricURL)
        const showLyric = this.formatLyric(result.lrc.lyric);
    },
    changeDot: function(e) {
        this.setData({
            currentDot: e.detail.current
        })
    },
    createBgAudio(res) {
        const bgAudioManage = wx.getBackgroundAudioManager(); //获取全局唯一的背景音频管理器。并把它给实例bgAudioManage
        app.globalData.bgAudioManage = bgAudioManage; //把实例bgAudioManage(背景音频管理器) 给 全局
        bgAudioManage.title = 'title'; //把title 音频标题 给实例
        bgAudioManage.src = res.url; // res.url 在createBgAudio 为 mp3音频  url为空，播放出错
        bgAudioManage.onPlay(res => { // 监听背景音频播放事件
            this.setData({
                isPlay: true,
            })
        });

        bgAudioManage.onEnded(() => { //监听背景音乐自然结束事件，结束后自动播放下一首。自然结束，调用go_lastSong()函数，即歌曲结束自动播放下一首歌
            this.go_lastSong();
        })

        // 监听播放拿取播放进度
        bgAudioManage.onTimeUpdate(() => {
            const lyricTime = Math.ceil(bgAudioManage.currentTime);
            const currentTime = bgAudioManage.currentTime //当前播放时长
            const duration = bgAudioManage.duration //总时长
            const percent = (currentTime / duration) * 100 //播放进度条
            this.setData({
                currentTime: this._formatTime(currentTime),
                duration: this._formatTime(duration),
                percent: percent,
                lyricTime: lyricTime
            })

            // 如果当前行数大于1，就开始滚动
            if (this.data.currentIndex > 1) {
                this.setData({
                    marginTop: (this.data.currentIndex - 1) * 32
                })
            }
            if (this.data.currentLyric == this.data.showLyric[this.data.currentIndex].text) {
                const query = wx.createSelectorQuery();
                query.select(".middle-r .text").boundingClientRect((rect) => {
                    this.setData({
                        lyricTop: rect.top
                    })
                }).exec();
            }
            if (this.data.lyricTop == (80 - this.data.currentIndex * 32)) {
                this.setData({
                    flag: true
                })
            }
            this.getCurrentLyric()
        })
    },

    // 播放和暂停
    togglePlaying() {
        const bgAudioManage = app.globalData.bgAudioManage;
        const { isPlay } = this.data;
        if (isPlay) {
            bgAudioManage.pause();
        } else {
            bgAudioManage.play();
        }
        this.setData({
            isPlay: !isPlay
        })
    },
    // 处理时间 秒变为分秒
    _formatTime: function(interval) {
        interval = interval | 0
        const minute = interval / 60 | 0
        const second = this._pad(interval % 60)
        return `${minute}:${second}`
    },
    /*秒前边加0*/
    _pad(num, n = 2) {
        let len = num.toString().length
        while (len < n) {
            num = '0' + num
            len++
        }
        return num
    },
    // 处理歌词
    formatLyric(text) {
        let resultLyric = [];
        let arr = text.split("\n"); //通过换行符“\n”进行切割
        let row = arr.length; //获取歌词行数
        for (let i = 0; i < row; i++) {
            let temp_row = arr[i]; //现在每一行格式大概就是这样"[00:04.302][02:10.00]hello world";
            let temp_arr = temp_row.split("]"); //我们可以通过“]”对时间和文本进行分离
            let text = temp_arr.pop(); //把歌词文本从数组中剔除出来，获取到歌词文本了！
            //再对剩下的歌词时间进行处理
            temp_arr.forEach(element => {
                let obj = {};
                let time_arr = element.substr(1, element.length - 1).split(":"); //先把多余的“[”去掉，再分离出分、秒
                let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]); //把时间转换成与currentTime相同的类型，方便待会实现滚动效果
                obj.time = s;
                obj.text = text;
                resultLyric.push(obj); //每一行歌词对象存到组件的showLyric歌词属性里
            });
        }
        resultLyric.sort(this.sortRule) //由于不同时间的相同歌词我们给排到一起了，所以这里要以时间顺序重新排列一下
        this.setData({
            showLyric: resultLyric
        })
    },
    sortRule(a, b) { //设置一下排序规则
        return a.time - b.time;
    },
    //控制歌词播放
    getCurrentLyric() {
        let j;
        for (j = 0; j < this.data.showLyric.length - 1; j++) {
            if (this.data.lyricTime == this.data.showLyric[j].time) {
                this.setData({
                    currentLyric: this.data.showLyric[j].text,
                    currentIndex: j
                })
            }
        }
    },
    // 
    go_lastSong: function() {
        let that = this;
        const lastSongId = app.globalData.waitForPlaying;
        const songId = lastSongId[Math.floor(Math.random() * that.data.lastSongId.length)]; //随机选取lastSongId数组的一个元素
        that.data.songid = songId;
        this.play(songId) //传进play()方法中
        app.globalData.songId = songId;

    }
})