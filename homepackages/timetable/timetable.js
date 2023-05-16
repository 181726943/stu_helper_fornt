// homepackages/timetable/timetable.js
const app = getApp();
const now = new Date();
const curmon = now.getMonth() + 1;  //当前月份
const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,   //导航栏下方固定栏
    term: "",
    year: "",
    weekIndex: 1, // 周数索引
    currentWeek: 1,  //当前周索引
    dateArray: [15, 16, 17, 18, 19, 20, 21], // 存放本周日期
    month: curmon, //存放当前月
    title: ['一', '二', '三', '四', '五', '六', '日'],  // 课程表头部星期
    nowDay: 1, //今天周几
    courseList: [],  // 课程列表
    bacimg: "https://tnuiimage.tnkjapp.com/swiper/banner-animate2.png",  //背景图
    startDayList: ['2023-02-20', '2023-09-04', '2024-02-26'],  // 每个学期开学日期
    startDate: '2023-02-20',  // 当前学期开学日期,默认第一个日期
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
   * 获取今天星期几
   * getDay()方法获取到的是数字
   * 0：星期日 1~6：星期一~星期六
   * 设置thisDay
   */
  getToday(){
    const now = new Date();
    let today = now.getDay();  // 今天星期几
    if (today == 0){
      this.setData({
        nowDay: today + 7,
      })
    } else {
      this.setData({
        nowDay: today,
      })
    }
  },

  /**
   * 获得完整日期
   * @param {*} date 日期对象
   */
  getFullDate(date){
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    // 补0
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    return year +  '-' + month + '-' + day;
  },

  /**
   * 获取周数索引,也即当前周数
   */
  getWeekIndex(){
    const date = new Date();  //获取日期对象
    let year = date.getFullYear();  //当前年份
    let month = date.getMonth() + 1;  //当前月份
    let startdate = '';  //本学期开始日期
    let curdate = this.getFullDate(date);  //当前日期
    if(year == 2023 && month < 9){
      startdate = this.data.startDayList[0];  //2022-2023第二学期
    }
    else if (year == 2023 && month >= 9){
      startdate = this.data.startDayList[1];  //2023-2024第一学期
    }
    else {
      startdate = this.data.startDayList[2];  //2023-2024第二学期
    }
    let begindate = new Date(startdate);
    let nowdate = new Date(curdate);
    let diffTime = nowdate.getTime() - begindate.getTime();
    let diffDay = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    let weekindex = Math.floor(diffDay / 7) + 1;  //当前周数
    this.setData({
      startDate: startdate,
      weekIndex: weekindex,
      currentWeek: weekindex,
    });
  },

  /**
   * 获取每周日期
   * 
   */
  getDateArray(){
    let selectweek = this.data.weekIndex;  //选中周的索引
    let diffdays = (selectweek-1) * 7;  //选中周第一天与开学第一天相差天数
    let startdate = this.data.startDate + diffdays;  //选中周的第一天
    let datearray = [];  // 周日期数组
    for (let i = 0; i < 7; i++){
      datearray.push(startdate);
      // 日期计算从这里开始#############################################################
    }
  },

  /**
   * 动态样式
   */
  marginHeight() {
    let style = "height: calc(100vh - 70rpx - env(safe-area-inset-bottom) / 2 - 60px - 0rpx);";
    return style;
  },

  /**
   * 点击显示课程详情
   * @param {*} e 
   */
  showDetail(e){
    let couid = e.target.dataset.id;
    let course = this.data.courseList[couid];
    this.setData({
      couInfo: course,
      dayweek: week[course.weekday],
      detailmodal: true,
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
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getToday();
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