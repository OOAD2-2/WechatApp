  // pages/index/FixedRollStartCallUI.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    step:1,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      classId: options.classId,
      seminarId: options.seminarId,
      className: options.className,
      seminarId:options.seminarId,
      fixed: options.fixed
    }),
      wx.request({
      url: getApp().globalData.url + '/seminar/' + options.seminarId + '/class/' + that.data.classId + '/attendance',
        header: {//请求头
          "Authorization": "Bearer " + getApp().globalData.jwt
        },
        data:{
          userId:wx.getStorageSync("user").id
        },
        method: "GET",
        success: function (res) {
          console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
          that.setData({
            name: res.data.name,
            numStudent: res.data.numStudent,
            numPresent: res.data.numPresent,
            status: "calling"
          })
        }
      })
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
  },
  start: function () {
    var that = this;
    //wx.getLocation({
    //  type: 'wgs84',
    //  success: function (res) {
    //    that.setData({
    //      latitude: res.latitude,
    //      longitude: res.longitude
    //    })
        wx.request({
          url: getApp().globalData.url + '/class/' + that.data.classId + '?seminarId=' + that.data.seminarId + '&calling=' + that.data.classId,
          header: {//请求头
            "Authorization": "Bearer " + getApp().globalData.jwt
          },
          method: "PUT",
        })
        that.setData({
          step: 2
        })
   //   }
   // })  
    
  },
  end: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/class/' + that.data.classId
      + '?seminarId=' + that.data.seminarId + '&calling=-1',
      header: {//请求头
        "Authorization": "Bearer " + getApp().globalData.jwt
      },
      method: "PUT",
    })
    that.setData({
      step: 3
    })
  },
  group: function () {
    var that = this;
    wx.navigateTo({
      url: 'FixedGroupInfo?seminarId=' + that.data.seminarId + '&classId=' + that.data.classId + '&fixed=' + that.data.fixed ,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  list: function (){
    var that =this;
    wx.navigateTo({
      url: 'FixedRollCallEndUI?classId=' + that.data.classId + '&step=' + that.data.step + '&className=' + that.data.className + '&numStudent=' + that.data.numStudent + '&numPresent=' + that.data.numPresent + '&seminarId=' + that.data.seminarId ,
      success: function (res) {
        // success
      },
    })
  }
})