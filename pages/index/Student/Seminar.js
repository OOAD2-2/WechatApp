  // pages/index/Seminar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  seminarId:"",
  seminar:[],
  date: "2017-10-15"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that=this;
  this.setData(
    {
      seminarId:options.seminarId,
    }
  ),
  wx.request({
    url: getApp().globalData.url + '/seminar/'+that.data.seminarId+"/my",
    header: {//请求头
      "Content-Type": "applciation/json"
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
  getRoll:function()
  {
    var that = this; 
    wx.navigateTo({
      //if(class = "bax3")
      url: 'StudentRollCallUI?seminarId='+that.data.seminarId,
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
  getGroup:function()
  {
    var that=this;
    wx.navigateTo({
      //if(class = "bax3")
      url: 'FGnoLeader?seminarId='+that.data.seminarId,
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
  Grade:function()
  {
    var that=this;
    wx.navigateTo({
      //if(class = "bax3")
      url: 'Grade?seminarId='+that.data.seminarId,
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