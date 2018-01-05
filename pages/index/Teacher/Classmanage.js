  // pages/index/Classmanage.js
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
    that.setData({
      courseId: options.courseId,
      userId: options.userId,
      courseName: options.courseName
    })
    wx.request({
      url: getApp().globalData.url + '/course/' + that.data.courseId + '/seminar/current',
      /*data: {
        userId:that.data.userId
      },*/
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({
          seminars:res.data,
          "id": res.data.id,
          "name": res.data.name,
          "courseName": that.data.courseName,
          "groupingMethod": res.data.groupingMethod,
          "startTime": res.data.startTime,
          "endTime": res.data.endTime,
          "classes": res.data.classes,
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

  /**
* 监听点击
*/
  ToClass: function (e) {
    var that=this;
    wx.navigateTo({
      url: 'FixedRollStartCallUI?classId=' + e.currentTarget.dataset.id + '&className=' + e.currentTarget.dataset.name + '&courseId=' + that.data.courseId + '&fixed=' + that.data.groupingMethod + '&seminarId=' + that.data.id,

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