const app =  getApp();
import {requestGet,singerURL} from "../../utils/request" 
Page({
  data: {
    concerList:[],
    tabs:[
      {
        id:"0",
        name:"华语",
        area:"area=7",
        open:false
      },
      {
       id:"1",
       name:"欧美",
       area:"area=96",
       open:false
      },
      {
        id:"2",
        name:"日本",
        area:"area=8",
        open:false 
       },
       {
        id:"3",
        name:"韩国",
        area:"area=16",
        open:false
       },
       {
        id:"4",
        name:"其他",
        area:"area=0",
        open:false
       }
    ],
    sex:[
      {
        id:"5",
        name:"男",
        type:"type=1",
        open:false
       },
       {
        id:"6",
        name:"女",
        type:"type=2",
        open:false
       }, 
       {
        id:"7",
        name:"乐队",
        type:"type=3",
        open:false
       }
    ],
    area:'',
    type:''
  },
  onLoad: function () {
    this.getSingerData()
  },

  async getSingerData(area){
     const result = await requestGet(singerURL + area)
     this.setData({
      concerList:result.artists
     })
  },
  tabsSelect(e){
    const areaId = e.currentTarget.dataset;
    this.setData({
      area:areaId.area
    })
    this.getSingerData(this.data.area)
  },
  sexSelect(e){
    const typeId = e.currentTarget.dataset;
    this.setData({
      type:typeId.type
    })
    this.getSingerData(this.data.type)
  },
})