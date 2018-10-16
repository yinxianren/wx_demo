// pages/details/details.js
let datas=require('../list/list-data.js');
let globalData=getApp();

Page({
 /* --------------------------------------------------------------------------------------------------------------------- */
  /**
   * 页面的初始数据
   */
  data: {
    postId:null,
    data:{},
    isCollection:false,
    isPlayMusic:false

  },
 /* --------------------------------------------------------------------------------------------------------------------- */
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("--------detail.onLoad---------")
    console.log(datas);
    let postId = options.postId;
      this.setData({
        postId: postId,
        data: datas.list_data[postId]

      })

    /*  根据本地缓存数据来确定收藏夹是否收藏 */
  let strorageData= wx.getStorageSync("isCollection");
    console.log("------获取本地缓存数据----------");
    console.log( strorageData);

    if (!strorageData) {//strorageData他是一个空对象，或是undefined
      wx.setStorageSync("isCollection", {})
   }

  /* 根据本地缓存设置缓存图标  */
    if (strorageData[this.data.postId]){
        this.setData({
          isCollection: true
        })
    } else {//false and undefined  situation

    }
   //判断音乐是否播放状态
    if (globalData.data.isPlay && globalData.data.pageIndex === postId){
     this.setData({
       isPlayMusic: true
     })
   }


   /* 监听音乐播放/暂停 */
    wx.onBackgroundAudioPlay(()=>{
      this.setData({
        isPlayMusic: true
      })
      globalData.data.isPlay=true;
      globalData.data.pageIndex = postId;
    });
    wx.onBackgroundAudioPause(()=>{
      this.setData({
        isPlayMusic: false
      })
      globalData.data.isPlay = false;
    });

  },
  /* --------------------------------------------------------------------------------------------------------------------- */
  zgh_details_catchtap_handleCollection:function(event){
    console.log("-----zgh_details_catchtap_handleCollection-------");
    console.log("this对象"+this);
    console.log("event对象"+event);
    let isCollection = !this.data.isCollection;
    //更新状态
    this.setData({
      isCollection
    });
    //显示消息提示框
    let title = isCollection?"收藏成功":"取消收藏";
    wx.showToast({
      title,
      icon:"success"
    });

    wx.getStorage({
      key: "isCollection",
      success: (datas) => {
        console.log(datas, typeof datas);
          /*将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容。数据存储生命周期跟小程序本身一致，即除用户主动删除或超过一定时间被自动清理，否则数据都一直可用。数据存储上限为 10MB。*/
    /*let obj={};  会覆盖之前的数组，不可行*/
        let obj = datas.data;
        obj[this.data.postId] = isCollection;
        wx.setStorage({
          key: "isCollection",
          data: obj,
          success: () => {
            console.log("数据存储在本地缓存中le");
          }
        });

                
      }
    });

 
   
  },
  /* --------------------------------------------------------------------------------------------------------------------- */
  zgh_detailse_catchtap_isPlayMusic:function(event){
    console.log("---------------zgh_detailse_catchtap_isPlayMusic---------------------");
    let isPlay = !this.data.isPlayMusic;
    if(isPlay){//播放音乐
      console.log("-----------wx.playBackgroundAudio------------------");
      console.log(this);
      let {dataUrl,title} = this.data.data.music;
      wx.playBackgroundAudio({
        dataUrl,//播放的路径
        title//音乐播放的歌曲名
      })
    }else{//暂停音乐播放
      wx.pauseBackgroundAudio({
        success:function(event){
          console.log("----------wx.pauseBackgroundAudio---------------");
          console.log(event);
        }
      });
    }
    this.setData({//切换音乐图标
      isPlayMusic: isPlay
    });


  }



})