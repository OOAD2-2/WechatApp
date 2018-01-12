// pages/index/StudentRollCallUI.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  seminarId:"",
  status:"",
  classId:"",
  studentId:"",
  longitude:"",
  latitude:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that=this;
  wx.getStorage({
    key: 'user',
    success: function (res) {
      that.setData(
        {
          studentId: res.data.id
        }
      )
    },
  }),
    wx.getStorage({
      key: 'classId',
      success: function (res) {
        that.setData(
          {
            classId: res.data
          }
        ),
          wx.request({
            url: getApp().globalData.url + '/seminar/' + that.data.seminarId + '/class/' + that.data.classId + '/attendance/' + that.data.studentId,
            header: {//请求头
              "Authorization": "Bearer " + getApp().globalData.jwt
            },
            method: "GET",
            success: function (res) {
              that.setData(
                {
                  status: res.data.status
                }
              ),
                console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
            }
          })
      },
    }),
  this.setData(
    {
    seminarId:options.seminarId
    }
  ),
  wx.request({
    url: getApp().globalData.url + '/seminar/' + that.data.seminarId+'/detail',
    header: {//请求头
      "Authorization": "Bearer " + getApp().globalData.jwt
    },
    method: "GET",
    success: function (res) {
      console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
      that.setData({
        seminar: res.data
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
  Roll:function()
  {
    var that=this;
    wx.getLocation({
      success: function (res) {
        console.log(res)
        that.setData({
            longitude: res.longitude,
            latitude: res.latitude
        }),
        wx.request({
          url: getApp().globalData.url + '/seminar/' + that.data.seminarId + '/class/' + that.data.classId + '/attendance/' + that.data.studentId + '?latitude='+that.data.latitude+
          '&longitude='+that.data.longitude+"&elevation=18.42",
          header: {//请求头
            "Authorization": "Bearer " + getApp().globalData.jwt
          },
          method: "PUT",
          success: function (res) {
            that.setData(
              {
                status: res.data.status
              }
            ),
              console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
          }
        })
      }
    })
  }
})