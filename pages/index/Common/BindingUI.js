// pages/index/Common/BindingUI.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  Number:"",
  name:"",
  phone:"",
  password:"",
  School:{"id":"","name":""},
  typeId:""
  },
  /**   * 生命周期函数--监听页面加载   */
  onLoad: function (options) {
  console.log(options);
  var that=this;
  that.setData(
    {
      typeId: options.typeId,
      School: {
        "id": options.schoolId,
        "name": options.schoolName
      }
    }
  )
  wx.getStorage({
    key: 'number',
    success: function (res) {
      that.setData({ Number: res.data })
    },
  })
  wx.getStorage({
    key: 'name',
    success: function (res) {
      that.setData({ name: res.data })
    },
  })
  wx.getStorage({
    key: 'phone',
    success: function (res) {
      that.setData({ phone: res.data })
    },
  })
  wx.getStorage({
    key: 'password',
    success: function (res) {
      that.setData({ password: res.data })
    },
  })

  },
  /**   * 生命周期函数--监听页面初次渲染完成   */
  onReady: function () {  },
  /**   * 生命周期函数--监听页面显示   */
  onShow: function () {  },
  /**   * 生命周期函数--监听页面隐藏   */
  onHide: function () {  },
 /**   * 生命周期函数--监听页面卸载   */
  onUnload: function () {  },
  /**   * 页面相关事件处理函数--监听用户下拉动作   */
  onPullDownRefresh: function () {  },
  /**   * 页面上拉触底事件的处理函数   */
  onReachBottom: function () {  },
  /**   * 用户点击右上角分享   */
  onShareAppMessage: function () {  },

  nameInput:function(e)
  {
    this.setData(
      {
        name:e.detail.value
      }
    )
  },
  numberInput: function (e) {
    this.setData(
      {
        Number:e.detail.value
      }
    )
  },
  phoneInput: function (e) {
    this.setData(
      {
        phone: e.detail.value
      }
    )
  },
  passwordInput: function (e) {
    this.setData(
      {
        password: e.detail.value
      }
    )
  },

  bind:function(){
    var that=this;
    wx.request({
      url: getApp().globalData.url + 
      '/me?typeId=' + that.data.typeId + 
      '&name=' + that.data.name + 
      '&number=' + that.data.Number + 
      '&schoolId=' + that.data.School.id + 
      '&phone=' + that.data.phone + 
      '&password=' + that.data.password,
      header: {//请求头
        "Authorization": "Bearer " + getApp().globalData.jwt
      },
      method: "PUT",
      success: function (res) {
        console.log(res.data);
        if (that.data.typeId == 1) 
        wx.redirectTo({
          url: '../Teacher/TeacherMainUI',
        })
        else {
          wx.redirectTo({
            url: '../Student/StudentMainUI',
          })
        }
      }
    })
  },

  ChooseSchool:function()
  {
    var that=this;
    var typeId = that.data.typeId;
    wx.setStorage({
      key: 'number',
      data: that.data.Number,
    })
    wx.setStorage({
      key: 'name',
      data: that.data.name,
    })
    wx.setStorage({
      key: 'phone',
      data: that.data.phone,
    })
    wx.setStorage({
      key: 'password',
      data: that.data.password,
    })
    wx.navigateTo({
      url: 'ChooseSchool?step=1&typeId=' + typeId,
    })
  }
})