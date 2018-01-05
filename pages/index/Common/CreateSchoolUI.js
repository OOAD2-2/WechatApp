// pages/index/Common/CreateSchoolUI.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  name:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that=this;
  that.setData(
    {
      province:options.province,
      city:options.city
    }
  )
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
  nameInput:function(e)
  {
    this.setData(
      {
        name:e.detail.value
      }
    )
  },
  confirm:function()
{
  var that=this;
    wx.request({
      url: getApp().globalData.url + '/school',
      header: {//请求头
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:
      {
        city: that.data.city,
        province:that.data.province,
        name: that.data.name
      },
      method: "POST",
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
       
      }
    })
    wx.redirectTo({
      url: 'BindingUI?typeId=1&schoolName=' + that.data.name,
    })
}
})