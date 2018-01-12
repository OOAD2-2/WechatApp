// pages/index/Student/ChooseTopic.js
Page({
  /**   * 页面的初始数据   */
  data: {
    topic: [
      { name: 123, groupLeft: 3, groupLimit: 4},
      { name: 456, groupLeft: 1, groupLimit: 3},
      { name: 436, groupLeft: 0, groupLimit: 1}
      ],
  temp:-1
  },
  /**   * 生命周期函数--监听页面加载   */
  onLoad: function (options) {
    var that=this;
    that.setData(
      {
        seminarId:options.seminarId,
        groupId:options.groupId
      }
    ),
    wx.request({
      url: getApp().globalData.url + '/seminar/' + that.data.seminarId+"/topic",
      header: {//请求头
        "Authorization": "Bearer " + getApp().globalData.jwt
      },
      method: "GET",
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({
          topic:res.data
        })
      }
    })
  },

  /**   * 生命周期函数--监听页面初次渲染完成   */
  onReady: function () {    },
  /**   * 生命周期函数--监听页面显示   */
  onShow: function () {    },
  /**   * 生命周期函数--监听页面隐藏   */
  onHide: function () {    },
  /**   * 生命周期函数--监听页面卸载   */
  onUnload: function () {  },
  /**   * 页面相关事件处理函数--监听用户下拉动作   */
  onPullDownRefresh: function () {    },
  /**   * 页面上拉触底事件的处理函数   */
  onReachBottom: function () {    },
  /**   * 用户点击右上角分享   */
  onShareAppMessage: function () {  },
  getDes:function(e)
  {
    var that=this;
    var id = e.currentTarget.dataset.id;
    if (that.data.temp != id )
    that.setData({temp : e.currentTarget.dataset.id })
    else that.setData({temp : -1})
  },
  choose:function(e)
  {
    var that=this;
    wx.showModal({
      title: '提示',
      content: '确定选择此话题吗（一旦选定不能修改）',
      success: function (res) {
        console.log(that.data.topic[e.currentTarget.dataset.id].id)
        if (res.confirm) {
          wx.request({
            url: getApp().globalData.url + '/group/' + that.data.groupId + "/topic?&topicId=" + that.data.topic[e.currentTarget.dataset.id].id,
            header: {//请求头
             // "Content-Type": "application/x-www-form-urlencoded"
              "Authorization": "Bearer " + getApp().globalData.jwt
            },
            method: "POST",
            success: function (res) {
              console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
              that.setData({
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })  
  }
})