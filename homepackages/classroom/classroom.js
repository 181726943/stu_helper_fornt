// homepackages/classroom/classroom.js
const app = getApp();
const config = require('../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,   //导航栏下方固定栏
    gradelist: [],
    ytArray: [],
    ytIndex: [0,0],
    weekArray: [
      {weekname: '第一周', value: 1}, {weekname: '第二周', value: 2}, {weekname: '第三周', value: 3},
      {weekname: '第四周', value: 4}, {weekname: '第五周', value: 5}, {weekname: '第六周', value: 6},
      {weekname: '第七周', value: 7}, {weekname: '第八周', value: 8}, {weekname: '第九周', value: 9},
      {weekname: '第十周', value: 10}, {weekname: '第十一周', value: 11}, {weekname: '第十二周', value: 12},
      {weekname: '第十三周', value: 13}, {weekname: '第十四周', value: 14}, {weekname: '第十五周', value: 15},
      {weekname: '第十六周', value: 16}, {weekname: '第十七周', value: 17}, {weekname: '第十八周', value: 18},
    ],
    weekIndex: 0,
    dayArray: [
      '星期日', '星期一', '星期二', '星期三',
      '星期四', '星期五', '星期六'
    ],
    dayIndex: 0,
    classArray: [
      [1, 2, 3, 4, 5, 6, 7,
        8, 9, 10, 11, 12, 13, 14],
      [1, 2, 3, 4, 5, 6, 7,
        8, 9, 10, 11, 12, 13, 14]
    ],
    classIndex: [0, 0],
    buildArray: [
      {buildname: '7B', value: '7B'}, {buildname: '一教', value: '1'},
      {buildname: '二教', value: '2'}, {buildname: '三教', value: '3'},
      {buildname: '四教', value: '4'}, {buildname: '五教', value: '5'},
      {buildname: '六教', value: '6'}, {buildname: '七教', value: '7'},
      {buildname: '八教', value: '8'}, {buildname: '九教', value: '9'}
    ],
    buildIndex: null,
    year: '',
    term: '',
    roomList: [],
  },

  /**
   * 获得多列选择器中学年选择列表
   * @param {*} e 
   */
  getyearlist(){
    // 根据全局变量获得用户年级，用年级来生成选择列表
    let year = Object.assign({}, app.globalData.userinfo).grade;
    let temp = [];
    let tempyear = ['全部'];
    let tempterm = ['全部', '1', '2'];
    for (let i = 0; i < 4; i++){
      let newyear = year + "~" + (year + 1);
      tempyear.push(newyear);
      year += 1;
    }
    temp.push(tempyear);
    temp.push(tempterm);
    this.setData({
      ytArray: temp,
    })
  },

  /** 
   * 学年学期索引值变化处理器
   * @param {*} e 
   */
  ytChange(e){
    let tempyear = '';
    let tempterm = '';
    let index = e.detail.value;
    tempyear = index[0] === 0 ? '' : this.data.ytArray[0][index[0]].match(/\d+/)[0];
    tempterm = index[1] === 0 ? '' : parseInt(this.data.ytArray[1][index[1]]);
    this.setData({
      ytIndex: e.detail.value,
      year: tempyear,
      term: tempterm,
    });
  },

  /**
   * 周数变化处理器
   * @param {*} e 
   */
  weekChange(e){
    this.setData(({
      weekIndex: e.detail.value,
    }));
  },

  /**
   * 周次变化处理器
   * @param {*} e 
   */
  dayChange(e){
    this.setData({
      dayIndex: e.detail.value,
    });
  },

  /**
   * 课节索引值变化处理器
   * 起止时间变化处理函数
   * @param {*} e 
   */
  classValue(e){
    this.setData({
      classIndex: e.detail.value,
    });
  },

  /**
   * 课节列变化处理器
   * 根据第一列当前选择的节数
   * 动态修改第二列显示的节数
   * @param {*} e 
   */
  classColumn(e){
    let column = e.detail.column;
    let value = e.detail.value;
    let classArray = this.data.classArray;
    let classIndex = this.data.classIndex;
    classIndex[column] = value;
    // 选中第一列，更新第二列的值
    if(column == 0){
      let minValue = classArray[0][classIndex[0]];
      classArray[1] = [];
      for(let i = minValue; i <= 14; i++){
        classArray[1].push(i);
      }
      classIndex[1] = 0;
    }
    this.setData({
      classArray: classArray,
      classIndex: classIndex,
    })
  },

  /**
   * 教学楼索引值变化处理器
   * @param {*} e 
   */
  buildChange(e){
    this.setData({
      buildIndex: e.detail.value,
    })
  },

  /**
   * 查询按钮处理事件
   * @param {*}  
   */
  toSearch(){
    let year = this.data.year;
    let term = this.data.term;
    let begin = this.data.classArray[0][this.data.classIndex[0]];
    let end = this.data.classArray[1][this.data.classIndex[1]];
    let weekday = this.data.dayIndex;
    let weeks = this.data.weekArray[this.data.weekIndex].value;
    let build = this.data.buildArray[this.data.buildIndex].value;
    
    // 查询请求
    wx.request({
      url: config.baseUrl + 'classroom/roomsearch/',
      method: "GET",
      data:{
        year: year,
        term: term,
        begin: begin,
        end: end,
        weekday: weekday,
        weeks: weeks,
        build: build,
      },
      header: {
        // "Authorization": wx.getStorageSync('userkey'),
        "Authorization": 'Token 1dd176b8accf9f56aca4e209f3b40b2d99e03ecb'
      },
      success: res => {
        console.log(res);
        if(res.statusCode == 200){
          this.setData({
            roomList: res.data,
          });
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getyearlist();
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