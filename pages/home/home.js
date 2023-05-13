// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekday: "",
    // swiperList: [
    //   {id:0, type: "image", url: "http://localhost:8000/static/img/basic_new.jpg"},
    // ],
    navlist: [
      {
        icon: "calendar-fill",
        name: "timetable",
        color: "cyan",
        title: "课程表"
      },
      {
        icon: "edit-write",
        name: "examinfo",
        color: "blue",
        title: "考试安排"
      },
      {
        icon: "search-list",
        name: "scores",
        color: "purple",
        title: "成绩查询"
      },
      {
        icon: "book",
        name: "books",
        color: "mauve",
        title: "借阅查询"
      },
      {
        icon: "home-capsule",
        name: "classroom",
        color: "pink",
        title: "空教室查询"
      },
      {
        icon: "chemistry",
        name: "courses",
        color: "brown",
        title: "选课信息"
      },
      {
        icon: "calendar",
        name: "schoolcal",
        color: "red",
        title: "校历"
      },
      {
        icon: "tel-circle",
        name: "camphone",
        color: "orange",
        title: "校园通讯"
      },
      {
        icon: "location",
        name: "cammap",
        color: "olive",
        title: "校园地图"
      },
      {
        icon: "bus",
        name: "schoolbuss",
        color: "green",
        title: "校车时刻"
      }
    ],
  },

  // 获取今天星期几的函数
  getday(){
    var today = new Date();
    var currentday = today.getDay();
    var week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];  //表示今天星期几
    this.setData({
      weekday: week[currentday],
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 此处options用来接收上一个页面传递过来的参数
    this.getday();
  },
  
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})