// pages/list/list.js
let datas=require('./list-data.js');//引入数据
console.log("-----引入数据------")
console.log(datas,typeof datas);
Page({

  /**
   * 页面的初始数据
   */
  data: {
      listDatas:{}
  },
  zgh_list_catchtop_gotoTargetPage: function (event) {
    console.log("--------zgh_list_catchtop_gotoTargetPage---------");
    console.log(event);
    var postid = event.target.dataset.index;
    wx: wx.navigateTo({
      url: '/pages/details/details?postId=' + postid,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    
  },
    zgh_list_catchtap_gotoDetails: function (event) {
        console.log("-----页面跳转事件-------");
        console.log(event)
      var postid = event.currentTarget.dataset.postid;
    
        wx: wx.navigateTo({
          url: '/pages/details/details?postId=' + postid,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
        })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        listDatas:datas.list_data

        });
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
    console.log("list页面隐藏")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("list页面卸载")
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