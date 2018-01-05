// pages/index/FixedGroupInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cancleList:0,
    temp:-1,
    fixed:0,
    isFold: false,
    showModal: false,
    lateadd: [
      {
        "id": 5324,
        "name": "李1"
      },
      {
        "id": 5678,
        "name": "王2"
      }
    ],
    latestu: [{
      "id": 5324,
      "name": "李3"
    },
    {
      "id": 5678,
      "name": "王4"
    }],
    team: [
      {
        "id": 28,
        "name": "1A1",
        "topics": [
          {
            "id": 257,
            "name": "领域模型与模块"
          }
        ]
      },
      {
        "id": 29,
        "name": "1A2",
        "topics": [
          {
            "id": 257,
            "name": "领域模型与模块"
          }
        ]
      }
    ],
    LIST: {
      "id": 28,
      "name": "1A1",
      "leader": {
        "id": 8888,
        "name": "张三"
      },
      "members": [
        {
          "id": 5324,
          "name": "李四"
        },
        {
          "id": 5678,
          "name": "王五"
        }
      ],
      "topics": [
        {
          "id": 257,
          "name": "领域模型与模块"
        }
      ],
      "report": ""}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    console.log(options.data);
    that.setData({
      seminarId: options.seminarId,
      classId: options.classId,
      fixed: options.fixed
    })
    wx.request({
      url: getApp().globalData.url + '/seminar/' + that.data.seminarId +'/group?classId='+that.data.classId,
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      data:{userId:wx.getStorageSync("user").id},
      method: "GET",
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({
        team:res.data
        })
      }
    }),
    wx.request({
      url: getApp().globalData.url + '/seminar/' + that.data.seminarId + '/class/' + that.data.classId+'/attendance/late',
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      data:{userId:wx.getStorageSync("user").id},
      method: "GET",
      success: function (late) {
        console.log(late.data);//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({//如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数
          latestu: late.data
        })
      }
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

  member: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    if (that.data.temp != id)
      that.setData({ temp: e.currentTarget.dataset.id })
    else that.setData({ temp: -1 })
    wx.request({
      url: getApp().globalData.url + '/group/' + e.currentTarget.dataset.id,
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({
          LIST: res.data
        })
      }
    })
  },
  add: function(e){
    var that=this;
    var name=e.currentTarget.dataset.name;
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var team = that.data.team;
    var arr={name,id};
    var lateadd = that.data.lateadd;
    var latestu = that.data.latestu;
    lateadd.push(arr);
    wx.request({
      url: getApp().globalData.url + '/group/' + team[index].id + '/add?id='+ id,
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "PUT",
      success: function (res) {
      }
    })
    var cancleList= that.data.cancleList + 1;
    latestu.splice(index,1);
    that.setData({
      lateadd: lateadd,
      latestu: latestu,
      cancleList: cancleList
    })
  },
  dele: function (e) {
    var that = this;
    var name = e.currentTarget.dataset.name;
    var id = e.currentTarget.dataset.id;
    var index = e.target.dataset.index;
    var arr = { name, id };
    var lateadd = that.data.lateadd;
    var latestu = that.data.latestu;
    lateadd.splice(index, 1);
    wx.request({
      url: getApp().globalData.url + '/group/' + team[index].id + '/remove?id=' + id,
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "PUT",
      success: function (res) {
      }
    })
    latestu.push(arr);
    that.setData({
      lateadd: lateadd,
      latestu: latestu
    })
  },

  /**
     * 弹窗
     */
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function (e) {
    var that = this;
    var lateadd = that.data.lateadd;
    var latestu = that.data.latestu;
    var cancleList = that.data.cancleList;
    console.log(cancleList);
    for (var i = 0; i < cancleList; i++){
      latestu.push(lateadd.pop());
    }
    that.setData({
      lateadd: lateadd,
      latestu: latestu,
      cancleList: 0
    })
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    var that = this;
    that.setData({
      cancleList: 0
    })
    this.hideModal();
  }
  
})