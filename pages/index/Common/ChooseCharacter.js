// pages/index/Common/CreateSchoolUI.js
Page({
  data: { },
  /**   * 生命周期函数--监听页面加载   */
  onLoad: function (options) { 
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: getApp().globalData.url + '/auth/weChat?code=' + res.code + "&type=0",
            method: 'POST',
            "Content-Type": "application/x-www-form-urlencoded",
            success: function (au) {
              getApp().globalData.jwt = au.data.jwt;
              getApp().globalData.openid = au.data.openid;
              wx.request({
                url: getApp().globalData.url + '/me',
                method: 'get',
                header: {
                  "Authorization": "Bearer " + getApp().globalData.jwt
                },
                success: function (res) {
                  console.log(res.data);
                  var user = res.data;
                  if (res.data.phone == null) {
                    console.log("phone: " + res.data.phone);
                    console.log("留下来");
                  }
                  else if (res.data.type == "teacher") {
                    wx.setStorage({
                      key: 'user',
                      data: res.data,
                    })
                    wx.redirectTo({
                      url: '../Teacher/TeacherMainUI',
                    })
                  }
                  else {
                    wx.setStorage({
                      key: 'user',
                      data: res.data,
                    })
                    wx.redirectTo({
                      url: '../Student/StudentMainUI',
                    })
                  }
                }
              })
            }
          })
        }
      }
    })


  },
   /* wx.login({
      success: function (res) {
        if (res.code) {
          //获取openId
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: 'wxba25ff360af27cad',
              secret: '8fae9e5f3ecc06fd6e4bfaa22813fccc',
              grant_type: 'authorization_code',
              js_code: res.code
            },
            method: 'GET',
            header: { 'content-type': 'application/json' },
            success: function (openIdRes) {
              console.info("选角色返回的openId：" + openIdRes.data.openid);
             // getApp().globalData.openid = openIdRes.data.openid;
              console.info("openId：" + getApp().globalData.openid);
              wx.request({
                url: getApp().globalData.url + '/signin?openid=' + getApp().globalData.openid,
                header: {//请求头
                  "Content-Type": "applciation/json"
                },
                method: "GET",
                success: function (res) {
                  console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
                  wx.setStorage({
                    key: 'user',
                    data: res.data,
                  })
                  var user = res.data;
                  if (res.data.type == 0) {
                    wx.redirectTo({
                      url: '../Student/StudentMainUI',
                    })
                  }
                  else if (res.data.type == 1) {
                    wx.redirectTo({
                      url: '../Teacher/TeacherMainUI',
                    })
                  }
                  else {
                    console.log("留下来");
                  }
                }
              })
            }
          })
        }
      }
    })

    
  },*/
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
  }, 
  student: function () {
    wx.navigateTo({
      url: 'BindingUI?typeId=0',
    })}
})