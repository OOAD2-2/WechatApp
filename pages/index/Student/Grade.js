// pages/index/Student/Grade.js
Page({


  /**
   * 页面的初始数据
   */
  data: {
  stars:[1,2,3,4,5],
  empty_star:"../../images/heart_empty.png",
  full_satr:"../../images/heart_chosen.png",
  point:[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  group:[{name:1},{name:2},{name:3}],
  groupId:"",
  step:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that=this;
  
  that.setData(
    {
      seminarId:options.seminarId
    }
  ),
    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.setData(
          {
            studentId: res.data.id
          },
          wx.getStorage({
            key: 'classId',
            success: function (res) {
              that.setData(
                {
                  classId: res.data
                }
              ),
                wx.request({
                url: getApp().globalData.url + '/seminar/' + that.data.seminarId + "/group?classId=" + that.data.classId + "&userId=" + that.data.studentId +"&gradeable=true",
                  header: {//请求头
                    "Authorization": "Bearer " + getApp().globalData.jwt
                  },
                  method: "GET",
                  success: function (res) {
                    console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
                    that.setData({
                      group: res.data
                    })
                  }
                })
            },
          })
        )
      },
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

  setGrade:function(e)
  {
    var that=this;
    var Grade = e.currentTarget.dataset.grade;
    var Group = e.currentTarget.dataset.group;
    var point= that.data.point;
    point[Group]=Grade;
    console.log(Group + "组得" + Grade + "分")
    this.setData({
      point: point
    })
    
  },

  sub: function () {
    var that = this;
    that.setData(
      {
        step:2
      }
    )
    for (var index in that.data.group) {
      wx.request({
        url: getApp().globalData.url + '/group/' + that.data.group[index].id + '/grade/presentation/'+that.data.studentId+"?topicId="+that.data.group[index].topicId+"&grade="+that.data.point[index],
        header: {//请求头
          "Authorization": "Bearer " + getApp().globalData.jwt
        },
        method: "PUT",
        success: function (res) {
          console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        }
      })
    } 
  }
})