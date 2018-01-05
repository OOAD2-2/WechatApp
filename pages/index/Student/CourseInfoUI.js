// pages/index/CourseInfoUI.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseId:"",
    teacher:"",
    email:"",
    description:"",
    name:""
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var that=this;
    that.setData(
    {
      courseId: option.courseId
    },
    )
    wx.request({
      url: getApp().globalData.url + '/course/'+that.data.courseId,
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({
          teacher: res.data.teacherName,
          email: res.data.teacherEmail,
          description: res.data.description,
          name:res.data.name
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
  
  }
})