// pages/index/ChooseSchool.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step:1,
    province:[    ],
    city: [    ],
    school: [    ],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      typeId:options.typeId,
      step: options.step,
      province: options.province,
      city: options.city
    })
    var step = that.data.step;
    wx.request({
      url: getApp().globalData.url + '/school/province',
      header: {//请求头
        "Authorization": "Bearer " + getApp().globalData.jwt
      },
      method: "GET",
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({
          province: res.data
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
  step1: function (event) {
    this.setData({
      step: 1
    })
  },
  step2: function (event) {
    this.setData({
      step: 2
    })
  },
  choosepro: function (event) {
    var that = this;
    var name = event.currentTarget.dataset.name;
    console.log(name);
    wx.request({
      url: getApp().globalData.url + '/school/city?province=' + name,
      header: {//请求头
        "Authorization": "Bearer " + getApp().globalData.jwt
      },
      method: "GET",
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({
          pro:name,
          city: res.data,
          step: 2
        })
      }
    })
  },
  choosecity: function (event) {
    var city = event.currentTarget.dataset.city;
    var that=this;
    console.log(city);
    this.setData({
      City: city,
      step: 3
    })
    wx.request({
      url: getApp().globalData.url + '/school?' + city,
      header: {//请求头
        "Authorization": "Bearer " + getApp().globalData.jwt
      },
      data:
      {
        city:that.data.City
      },
      method: "GET",
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({
          school: res.data
        })
      }
    })
  },
  chooseschool: function (e) {
    var that = this;
    wx.redirectTo({
      url: 'BindingUI?typeId='+that.data.typeId + '&schoolName=' + e.currentTarget.dataset.name + '&schoolId=' + e.currentTarget.dataset.id,
    })
  },
  createSchool:function(e)
  {
    var that=this;
    wx.redirectTo({
      url: 'CreateSchoolUI?province=' + that.data.pro + "&city=" + that.data.City,
    })
  }
})