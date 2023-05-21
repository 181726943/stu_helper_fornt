// pages/home/home.js
const config = require('../../config.js');
const dayjs = require('dayjs');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    term: '',
    year: '',
    staticUrl: config.staticUrl,
    weekday: "",
    dayIndex: 0,  //星期几的索引值
    weekIndex: 0,  //周数索引
    courseList: [],
    startDayList: config.startDayList,
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
    let today = new Date();
    let currentday = today.getDay();
    let week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];  //表示今天星期几
    let dayindex = currentday == 0 ? 7 : currentday + 1;
    this.setData({
      weekday: week[currentday],
      dayIndex: dayindex,
    })
  },
  
  /**
   * 获取周数索引,也即当前周数
   * 同时获取学年学期
   */
  getWeekIndex(){
    let term = 0;
    let year = dayjs().year();  //当前年份
    let month = dayjs().month() + 1;  //当前月份
    let startdate = '';  //本学期开始日期
    let curdate = dayjs().format('YYYY-MM-DD');  //当前日期

    if(year == 2023 && month < 9){
      startdate = this.data.startDayList[0];  //2022-2023第二学期
      term = 2;
    }
    else if (year == 2023 && month >= 9){
      startdate = this.data.startDayList[1];  //2023-2024第一学期
      year += 1;
      term = 1;
    }
    else {
      startdate = this.data.startDayList[2];  //2023-2024第二学期
      year += 1;
      term = 2;
    }

    let begindate = dayjs(startdate);
    let nowdate = dayjs(curdate);
    let diffDay = nowdate.diff(begindate, 'day');
    let weekindex = Math.floor(diffDay / 7) + 1;  //当前周数
    weekindex = weekindex > 0 && weekindex < 20 ? weekindex : 19;  //限定周数范围

    this.setData({
      term: term,
      year: year,
      weekIndex: weekindex,
    });
  },

  /**
   * 获取今日课程
   * @param {*} 
   */
  getCourse(){
    wx.request({
      url: config.baseUrl + 'timetable/today/',
      method: "GET",
      header: {
        "Authorization": wx.getStorageSync('userkey'),
      },
      data: {
        year: this.data.year,
        term: this.data.term,
        weekday: this.data.dayIndex,
        week: this.data.weekIndex,
        // year: 2019,
        // term: 1,
        // weekday: 1,
        // week: 5,
      },
      success: res => {
        if (res.statusCode == 200){
          this.setData({
            courseList: res.data,
          });
        }
      }
    });
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getday();
    this.getWeekIndex();
    this.getCourse();
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