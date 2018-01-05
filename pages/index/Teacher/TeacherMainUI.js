Page({
  /**
   * 页面的初始数据
   */
    data: {
    classes:[{}],
    name:"",
    number:"",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    var id = wx.getStorageSync("user").id;
    console.log(id);
    that.setData({
      id: id
    }),
      wx.request({
        url: getApp().globalData.url + '/me?id='+ that.data.id,
        header: {//请求头
          "Content-Type": "applciation/json"
        },
        method: "GET",
        success: function (res) {
          console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
          that.setData({
            name:res.data.name,
            number:res.data.number
          })
        }
      })
      wx.request({
        url: getApp().globalData.url + '/course?userId=' + that.data.id,
        header: {//请求头
          "Content-Type": "applciation/json"
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
    var that = this;
    var classId = e.currentTarget.dataset.id;
    var userId = that.data.id;
    console.log(classId, userId)
    wx.navigateTo({
      url: 'Classmanage?courseId=' + classId + '&userId=' + userId + '&courseName=' + e.currentTarget.dataset.name,
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
  onClicked2: function () {
    var that = this;
    wx.navigateTo({
      url: 'TeacherInfo?id=' + that.data.id,
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