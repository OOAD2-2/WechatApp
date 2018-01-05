// pages/index/Common/BindingUI.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  Number:"",
  name:"",
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
      that.setData(
        {
          Number: res.data
        }
      )
    },
  })
  wx.getStorage({
    key: 'name',
    success: function (res) {
      that.setData(
        {
          name: res.data
        }
      )
    },
  }),
  wx.setStorage({
    key: 'number',
    data:" ",
  })
  wx.setStorage({
    key: 'name',
    data:" ",
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

  bind:function(){
    var that=this;
    wx.request({
      url: getApp().globalData.url + '/signin?state=' +'MiniProgram',
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      data:
      {
        "openId": getApp().globalData.openId,
        "typeId" : that.data.typeId,
        "number": that.data.Number,
        "name": that.data.name,
        School: {
          "id": that.data.School.id,
          "name": that.data.School.name,
        }
      },
      method: "GET",
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
          if (that.data.typeId==0){
          wx.reLaunch({
            url: '../Student/StudentMainUI',
          })
        }
        else {
          wx.reLaunch({
            url: '../Teacher/TeacherMainUI',
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
    wx.navigateTo({
      url: 'ChooseSchool?step=1&typeId=' + typeId,
    })
  }
})