// pages/index/StudentInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  userId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var that = this;
    this.setData({
      userId: option.userId
    }
    );
    wx.request({
      url: getApp().globalData.url+'/me',
      header: {
        "Authorization": "Bearer " + getApp().globalData.jwt
      },
     data:{
       id:that.data.userId
     } ,
      method: "GET",
      success: function (res) {
        console.log(res.data);
        that.setData({
          Avatar: res.data.avatar,
          Name: res.data.name,
          School:res.data.school.name,
          Number:res.data.number,
          Phone:res.data.phone
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
  clickAvator:function()
  {
    var that = this;
    var tempFilePaths;
    wx.chooseImage({
      count: 1, 
      sizeType: 'original', 
      sourceType: ['album', 'camera'], 
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        tempFilePaths = res.tempFilePaths
        wx.request({
          url: getApp().globalData.url + '/upload/avatar',
          header: {
            "Authorization": "Bearer " + getApp().globalData.jwt
           // "content-type": 　"application/x-www-form-urlencoded"
          },
          data: {
            FilePaths: tempFilePaths
          },
          method: "POST",
          success: function (res) {
            console.log(res.data);
            that.setData({
              Avatar: tempFilePaths
            })

          }
        }),
        //PUT /me
          wx.request({
            url: getApp().globalData.url + '/me',
            header: {
              "Authorization": "Bearer " + getApp().globalData.jwt
            },
            data:{
              FilePaths: tempFilePaths
            },
            method: "PUT",
            success: function (res) {
              console.log(res.data);
            }
          })

      }
    })
  },
  Unbundled: function () {
    console.log("解绑");
    wx.request({
      url: getApp().globalData.url + '/me?typeId=-1&openid=' + getApp().globalData.openid,
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