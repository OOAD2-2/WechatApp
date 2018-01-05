//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
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
              console.info("登录成功返回的openId：" + openIdRes.data.openid);
              getApp().globalData.openId = openIdRes.data.openid;
              // 判断openId是否获取成功
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
                  if(res.data.type==0){}
                  else if(res.data.type==1) {
                    wx.redirectTo({
                      url: '../Teacher/TeacherMainUI',
                    })
                  }
                  else {
                    wx.redirectTo({
                      url: '../Student/StudentMainUI?user='+user,
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
  globalData: {
    userInfo: null,
    openid:12345,
    url:"http://localhost:8080"
  }
})