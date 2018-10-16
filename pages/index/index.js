// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     userName:"舌尖上的跳蚤",
     intoProjectbackgroundColor:"#3385FF",
     userInfo:{},
     tabDisplay:{}
  },
  handleBindgetuserinfo:function(res){
    console.log("------handleBindgetuserinfo---------");
    console.log(res);
    if(!res.detail.rawDate){//如果用户授权成功，重新加载用户信息
      this.requestUserInfo();
    }


  },
  /**
   * 手指进入状态改变背景颜色
   */
  changeBackgroundOnTouchstart:function(){
    this.setData({
      intoProjectbackgroundColor: '#0064FA'
    });

    wx.switchTab({
      url: '/pages/list/list'
    })


  },
  changeBackgroundOnTouchchend:function(){
    this.setData({
      intoProjectbackgroundColor: '#3385FF'
    });
   
  },
  /** 自定方法，获取用户信息 */
  requestUserInfo(){
    //--------wx.getUserInfo start-------------
    wx.getUserInfo({
      /*成功请求*/
      success: (res) => {
        console.log("------userInfo----------");
        console.log(res);
        var userInfo = res.userInfo;
        var nickName = userInfo.nickName;
        var avatarUrl = userInfo.avatarUrl;
        var gender = userInfo.gender; //性别 0：未知、1：男、2：女
        var province = userInfo.province;
        var city = userInfo.city;
        var country = userInfo.country;

        this.setData({
          userInfo: { nickName, avatarUrl, gender, province, city, country }
        });

      },
      /* 失败请求 */
      fail: (res) => {
        console.log("--------request fail-------");
        console.log(res)
      }


    })
    //------------- wx.openSetting---------------------------

    wx.getSetting({
      /* 请求成功 */
      success: (res) => {
        console.log("--------getSetting.success-------");
        console.log(res);
        //判断用户是否授权
        if (res.authSetting['scope.userInfo']) {
          console.log("auth success");
          var authButtom = true;
          this.setData({
            tabDisplay: { authButtom }
          });
        } else {
          console.log("auth fail");
          var authButtom = false;
          this.setData({
            tabDisplay: { authButtom }
          });
        }


      }
    })
//-----------------------------------------------   
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestUserInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})