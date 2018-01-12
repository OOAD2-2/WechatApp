// pages/index/TeacherInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:'../../images/user.png',
    "id": '',
    "type": "",
    "name": "",
    "number": "",
    "phone": "",
    "email": "",
    "gender": "",
    "school": {
      "id": '',
      "name": ""
    },
    "title": "",
    "avatar": "/avatar/3486.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/me?id=' + options.id,
      header: {//请求头
        "Authorization": "Bearer " + getApp().globalData.jwt
      },
      method: "GET",
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({
          "name": res.data.name,
          "number": res.data.number,
          "phone": res.data.phone,
          "school": res.data.school,
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
  topHead: function () {
    console.log("更换头像");
    /*wx.request({
      url: getApp().globalData.url +'/upload/avatar' ,
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "POST",
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({//如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数
          src:res.data.src
        })
      }
    })*/
  },
  Unbundled:function(){
    console.log("解绑");
    wx.request({
      url: getApp().globalData.url + '/me?typeId=-1',
      header: {//请求头
        "Authorization": "Bearer " + getApp().globalData.jwt
      },
      method: "PUT",
      success: function (res) {
        wx.navigateBack({
        })
        wx.reLaunch({
          url: '../Common/ChooseCharacter',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    })
   
  }
})