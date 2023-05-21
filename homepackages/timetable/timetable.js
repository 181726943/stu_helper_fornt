// homepackages/timetable/timetable.js
const dayjs = require('dayjs');
const config = require('../../config.js');
const app = getApp();
const curmon = dayjs().month() + 1;  //当前月份
const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,   //导航栏下方固定栏
    term: "",
    year: "",
    weekModal: false,  //控制展示周数选择
    weekIndex: 1, // 周数索引
    currentWeek: 1,  //当前周索引
    dateArray: [15, 16, 17, 18, 19, 20, 21], // 存放本周日期
    month: curmon, //存放月份，默认当前月
    title: ['一', '二', '三', '四', '五', '六', '日'],  // 课程表头部星期
    nowDay: 1, //今天周几
    nowDate: 1,  //今天日期
    bacimg: "https://tnuiimage.tnkjapp.com/swiper/banner-animate2.png",  //背景图
    startDayList: config.startDayList,  // 每个学期开学日期
    startDate: '2023-02-20',  // 当前学期开学日期,默认第一个日期
    // 课程列表
    courseList: [
      {
        "cname": "高等数学ⅠA",
        "addr": "7B-304",
        "teacher": "汤家凤",
        "sumweek": 7,
        "weeks": [5, 6, 7, 8, 9, 10, 11],
        "start_week": 5,
        "end_week": 11,
        "weekday": 3,
        "start_class": 8,
        "end_class": 10,
        "c_duration": 2,
        "bg": "red"
      },
      {
        "cname": "程序设计基础",
        "addr": "7B-201",
        "teacher": "肖秀荣",
        "sumweek": 14,
        "weeks":  [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        "start_week": 5,
        "end_week": 18,
        "weekday": 2,
        "start_class": 4,
        "end_class": 5,
        "c_duration": 1,
        "bg": "orange"
      },
      {
        "cname": "大学英语C1",
        "addr": "7B-203",
        "teacher": "咸鱼",
        "sumweek": 14,
        "weeks":  [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        "start_week": 5,
        "end_week": 18,
        "weekday": 2,
        "start_class": 1,
        "end_class": 3,
        "c_duration": 2,
        "bg": "yellow"
      },
      {
        "cname": "计算机科学导论",
        "addr": "7B-302",
        "teacher": "肖秀荣",
        "sumweek": 9,
        "weeks":  [6, 7, 8, 9, 10, 11, 12, 13, 14],
        "start_week": 6,
        "end_week": 14,
        "weekday": 1,
        "start_class": 8,
        "end_class": 10,
        "c_duration": 2,
        "bg": "olive"
      },
      {
        "cname": "军训与军事理论",
        "addr": "网络-0",
        "teacher": "汤家凤",
        "sumweek": 17,
        "weeks": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        "start_week": 1,
        "end_week": 17,
        "weekday": 7,
        "start_class": 0,
        "end_class": 0,
        "c_duration": 0,
        "bg": "green"
      },
      {
        "cname": "思想道德修养与法律基础",
        "addr": "7B-301",
        "teacher": "汤家凤",
        "sumweek": 14,
        "weeks": [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        "start_week": 5,
        "end_week": 18,
        "weekday": 1,
        "start_class": 3,
        "end_class": 5,
        "c_duration": 2,
        "bg": "cyan"
      },
      {
        "cname": "体育A",
        "addr": "操场-1",
        "teacher": "章鱼",
        "sumweek": 13,
        "weeks": [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        "start_week": 6,
        "end_week": 18,
        "weekday": 4,
        "start_class": 8,
        "end_class": 9,
        "c_duration": 1,
        "bg": "blue"
      }

    ],  
    // 左侧上课时间
    ctime: [{
      's': '08:00',
      'e': '08:45'
    }, {
      's': '08:55',
      'e': '09:40'
    }, {
      's': '10:00',
      'e': '10:45'
    }, {
      's': '10:55',
      'e': '11:40'
    }, {
      's': '12:10',
      'e': '12:55'
    }, {
      's': '13:05',
      'e': '13:50'
    }, {
      's': '14:00',
      'e': '14:45'
    }, {
      's': '14:55',
      'e': '15:40'
    }, {
      's': '15:50',
      'e': '16:35'
    }, {
      's': '16:55',
      'e': '17:40'
    }, {
      's': '17:50',
      'e': '18:35'
    }, {
      's': '19:20',
      'e': '20:05',
    }, {
      's': '20:15',
      'e': '21:00'
    }, {
      's': '21:10',
      'e': '21:55'
    }],
    
  },

  /**
   * 动态样式
   */
  marginHeight() {
    let style = "height: calc(100vh - 70rpx - env(safe-area-inset-bottom) / 2 - 60px - 0rpx);";
    return style;
  },

  /**
   * 获取今天星期几/日期
   * getDay()方法获取到的是数字
   * 0：星期日 1~6：星期一~星期六
   * 设置thisDay
   */
  getToday(){
    let nowday = dayjs().day();  // 今天星期几
    let nowdate = dayjs().date();  //今天日期
    if (nowday == 0){
      this.setData({
        nowDay: nowday + 7,
        nowDate: nowdate,
      })
    } else {
      this.setData({
        nowDay: nowday,
        nowDate: nowdate,
      })
    }
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
      startDate: startdate,
      weekIndex: weekindex,
      currentWeek: weekindex,
    });
  },

  /**
   * 获取选中周的每天的日期，及当月最新月份
   * @param {*} selectWeek 选中周的索引
   */
  getDateArray(selectWeek){
    let diffdays = (selectWeek-1) * 7;  //选中周第一天与开学第一天相差天数
    let startdate = dayjs(this.data.startDate);  //学期的第一天
    let firstdate = startdate.add(diffdays, 'day');  // 选中周的第一天
    let datearray = [];  // 周日期数组
    for (let i = 0; i < 7; i++){
      datearray.push(firstdate.date());  //将日期存入本周日期数组
      firstdate = firstdate.add(1, 'day');  // 获取选中周每天日期对象
    }
    let resmon = firstdate.month() + 1;  //选中周的最新月份
    return {
      datearray: datearray,
      mon: resmon
    };
  },


  /**
   * 点击头部标题选择周数
   * @param {*} e 
   */
  showSelect(e){
    this.setData({
      weekModal: !this.data.weekModal,
    })
  },

  /**
   * 此函数作用只是为了消除警告
   * 别无他用
   */
  holdModal(){
    return ;
  },

  /**
   * 隐藏选择器
   * @param {*} e 
   */
  hideSelect(e){
    this.setData({
      weekModal: false,
    })
  },

  /**
   * 监听选择的哪一周
   * 点击选择周，并更新相应变量
   * @param {*} e 
   */
  getWeek(e){
    let weekId = e.target.dataset.id + 1;
    let result = this.getDateArray(weekId);
    this.setData({
      weekIndex: weekId,
      dateArray: result.datearray,
      month: result.mon,
    })
    this.hideSelect();
  },


  /**
   * 点击显示课程详情
   * @param {*} e 
   */
  showDetail(e){
    let couid = e.currentTarget.dataset.id;
    let course = this.data.courseList[couid];
    this.setData({
      couInfo: course,
      dayweek: week[course.weekday],
      detailmodal: !(this.data.detailmodal),
    });
  },

  /**
   * 隐藏课程详情
   * @param {*} e 
   */
  hideDetail(e){
    this.setData({
      detailmodal: false,
    });
  },
  

  /**
   * 获取本学期所有课程
   * 
   */
  getCourses(){
    wx.request({
      url: config.baseUrl + 'timetable/my_course/',
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('userkey'),
      },
      data: {
        year: this.data.year,
        term: this.data.term,
      },
      success: res => {
        if(res.statusCode == 200){
          this.setData({
            courseList: res.date,
          });
        }
        else{
          wx.showToast({
            title: '网络错误',
            icon: 'error'
          })
        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getToday();
    this.getWeekIndex();
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
});