// pages/index/Common/CreateSchoolUI.js
Page({
  data: { },
  /**   * 生命周期函数--监听页面加载   */
  onLoad: function (options) { 
    
   },
  /*** 生命周期函数--监听页面初次渲染完成  */
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
  onShareAppMessage: function ()   {  },
  
  teacher:function()
  {
    wx.navigateTo({
      url: 'BindingUI?typeId=1',
    })
    /*var that=this;
    wx.request({
      url: getApp().globalData.url + '/me',
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      data:
      {
        type:1
      },
      method: "PUT",
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
      wx.navigateTo({
        url: 'BindingUI?typeId=1',
      })
      }
    })*/
  }, 
  student: function () {
    wx.navigateTo({
      url: 'BindingUI?typeId=0',
    })}
    /*var that = this;
    wx.request({
      url: getApp().globalData.url + '/me',
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      data:
      {
        type: 0
      },
      method: "PUT",
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        wx.navigateTo({
          url: 'BindingUI?typeId=0',
        })
      }
    })
  }*/
})