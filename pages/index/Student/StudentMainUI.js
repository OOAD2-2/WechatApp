// pages/index/StudentMainUI.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  Username:'',
  Usernumber:'',
  classes:[],
  userId:'',
  openId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  var that=this;
  wx.getStorage({
    key: 'user',
    success: function(res) {
      that.setData({
        userId:res.data.id,
        Username: res.data.name,
        Usernumber: res.data.number,
      }),
        wx.request({
          url: getApp().globalData.url + '/class',
          header: {//请求头
            "Authorization": "Bearer " + getApp().globalData.jwt
          },
          data:
          {
            userId: that.data.userId
          },
          method: "GET",
          success: function (res) {
            console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
            that.setData({
              classes: res.data
            })

          }
        })
    },
  })
  wx.getStorage({
    key: 'user',
    success: function (res) {
      that.setData({
        openId: res.data.openid
      }),
      console.log(getApp().globalData.openid),
        wx.request({
          url: getApp().globalData.url + '/signin?openid=' + that.data.openId,
          header: {//请求头
            "Authorization": "Bearer " + getApp().globalData.jwt
          },
          method: "GET",
          success: function (res) {
            console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
            that.setData({//如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数
              Username: res.data.name,
              Usernumber: res.data.number,
              studentId: res.data.id
            })
          }
        })
    },
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
  onClicked1: function (e) {
    var that=this;
    wx.setStorage(
      {
        key: "classId",
        data: that.data.classes[e.currentTarget.dataset.id].id
      }
    )
    wx.navigateTo({
      //if(class = "bax3")
      url: 'CourseUI?courseId=' + that.data.classes[e.currentTarget.dataset.id].id + "&courseName=" + that.data.classes[e.currentTarget.dataset.id].courseName+"&userId="+that.data.userId,
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

  /**
 * 监听点击
 */
  onClicked2: function () {
    wx.navigateTo({
      //if(class = "bax3")
      url: 'StudentInfo?userId=' + this.data.userId,
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