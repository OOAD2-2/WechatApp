// pages/index/FixedRollCallEndUI.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.data);
    that.setData({
      seminarId: options.seminarId,
      step: options.step,
      classId: options.classId,
      className: options.className,
      numStudent: options.numStudent,
      numPresent: options.numPresent,
      })
    wx.request({
      url: getApp().globalData.url +'/seminar/'+that.data.seminarId+ '/class/' + that.data.classId +'/attendance/present',
      //?showPresent=true&showLate=true&showAbsent=true
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",
      data:{userId:wx.getStorageSync("user").id},
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({
          present:res.data
        }) 
      }
    }),
      wx.request({
        url: getApp().globalData.url + '/seminar/' + that.data.seminarId + '/class/' + that.data.classId + '/attendance/late',
        header: {//请求头
          "Content-Type": "applciation/json"
        },
        data:{userId:wx.getStorageSync("user").id},
        method: "GET",
        success: function (late) {
          console.log(late.data);//res.data相当于ajax里面的data,为后台返回的数据
          that.setData({//如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数
            latestu: late.data
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
  Confirm: function () {
   
  }
})