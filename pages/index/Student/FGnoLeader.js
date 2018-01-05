// pages/index/Student/FGnoLeader.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  leader:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that=this;
  wx.getStorage({
    key: 'studentId',
    success: function (res) {
      that.setData(
        {
          studentId: res.data
        }
      )
    },})
  that.setData(
    {
      seminarId:options.seminarId
    }
  ),
  wx.request({
    url: getApp().globalData.url + '/seminar/' + that.data.seminarId + "/group/my",
    header: {//请求头
      "Content-Type": "applciation/json"
    },
    method: "GET",
    success: function (res) {
      console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
      that.setData({
        group: res.data
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
    this.setData(
      {
        studentId:8888
      }
    )
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  assign:function()
  {
    var that=this;
    wx.request({
      url: getApp().globalData.url + '/group/' + that.data.group.id + "/assign",
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      data:{
        id:that.data.studentId
      },
      method: "PUT",
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({
          leader:1
        })
      }
    })
  },
   resign: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/group/' + that.data.group.id + "/resign",
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      data: {
        id: that.data.studentId
      },
      method: "PUT",
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({
          leader:0
        })
      }
    })
  },
   chooseTopic: function () {
     var that = this;
     wx.navigateTo({
       //if(class = "bax3")
       url: 'ChooseTopic?seminarId=' + that.data.seminarId+'&groupId='+that.data.group.id,
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
})