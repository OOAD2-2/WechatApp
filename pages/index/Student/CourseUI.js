// pages/index/CourseUI.js
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  courseId:"",
  seminar:[],
  date:"",
  userId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var that=this;
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      date: time
    });  
    that.setData(
      {
        courseId: option.courseId,
        courseName: option.courseName,
        userId: option.userId
      },
    ),
    wx.request({
      url: getApp().globalData.url + '/course/' + that.data.courseId+'/seminar',
      header: {//请求头
        "Authorization": "Bearer " + getApp().globalData.jwt
      },
      data:
      {
        userId:that.data.userId
      },
      method: "GET",
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({
          seminar:res.data
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
  getInfo:function()
  {
    var that=this;
    wx.navigateTo({
      //if(class = "bax3")
      url: 'CourseInfoUI?courseId=' + that.data.courseId,
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
  Seminar:function(e)
  {
    var that=this;
    wx.navigateTo({
      //if(class = "bax3")
      url: 'Seminar?seminarId='+that.data.seminar[e.currentTarget.dataset.id].id,
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
  }
})