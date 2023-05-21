// homepackages/courses/courses.js
const app = getApp();
const config = require('../../config.js');
const dayjs = require('dayjs');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,   //导航栏下方固定栏
    courselist: [],
    selectArray: [],
    selectIndex: [],
    // year: Object.assign({}, app.globalData.userinfo).grade,
    year: "",
    term: ""
  },


  /**
   * 获取当前学年学期
   */
  getYearTerm(){
    let year = dayjs().year();
    let month = dayjs().month() + 1;
    let term = 0;
    if (month < 9){
      year -= 1;
      term = 2;
    }
    else{
      term = 1;
    }
    this.setData({
      year: year,
      term: term,
    })
  },


  /**
   * 获得多列选择器中学年选择列表
  */
  getyearlist(){
    // 根据全局变量获得用户年级，用年级来生成选择列表
    let year = Object.assign({}, app.globalData.userinfo).grade;
    let temp = [];
    let tempyear = [];
    let tempterm = ['1', '2'];
    for (let i = 0; i < 4; i++){
      let newyear = year + "~" + (year + 1);
      tempyear.push(newyear);
      year += 1;
    }
    temp.push(tempyear);
    temp.push(tempterm);
    this.setData({
      selectArray: temp,
    })
  },

  /** 
   * 多列选择器处理函数
   */
  valueChange(e){
    let tempyear = '';
    let tempterm = '';
    let index = e.detail.value;
    tempyear = this.data.selectArray[0][index[0]].match(/\d+/)[0];
    tempterm = parseInt(this.data.selectArray[1][index[1]]);
    this.setData({
      selectIndex: e.detail.value,
      year: tempyear,
      term: tempterm,
    });
    // console.log(this.data.year);
    // console.log(this.data.term);
  },

  /**
   * 查询操作
  */
  tosearch(){
    wx.request({
      url: config.baseUrl + 'select/courseselect',
      method: 'GET',
      data: {
        school_year: this.data.year,
        term: this.data.term
      },
      header: {
        "Authorization": wx.getStorageSync('userkey')
      },
      success: res => {
        // console.log(res.data)
        this.setData({
          courselist: res.data,
        });
      }
    });
  },

  /**
   * 退课操作
   * @param {*} e 
   */
  Drop(e){
    // console.log(e);
    // console.log(table_id);
    let t_id = e.target.dataset.drop;
    let courses = this.data.courselist;
    let couid = 0;
    for(let i = 0; i < courses.length; i++){
      if(courses[i].table_id == t_id){
        couid = i;
        break;
      }
    }
    let pcs_id = courses[couid].pcs_id;
    wx.showModal({
      title: '警告',
      content: '确认退选' + courses[couid].cname,
      complete: (res) => {
        if (res.confirm) {
          // 第一步：同步后端
          app.getCsrfToken(token =>{
            wx.request({
              url: config.baseUrl + 'stuclass/' + pcs_id + '/',
              method: "DELETE",
              header:{
                "X-CSRFToken": token,
                "Authorization": wx.getStorageSync('userkey'),
              },
              success: () => {
                wx.showToast({
                  title: '退课成功',
                  icon: "success",
                })
              }
            });
          });
          // 第二步：前端修改值，更新页面
          courses[couid].selected = false;
          this.setData({
            courselist: courses,
          });
        }
      }
    })
  },

  /**
   * 选课操作
   * @param {*} e 
   */
  Select(e){
    let t_id = e.target.dataset.select;
    let courses = this.data.courselist;  //课程对象数组
    let couid = 0;   //课程下表索引
    for(let i = 0; i < courses.length; i++){
      if(courses[i].table_id == t_id){
        couid = i;
        break;
      }
    }
    wx.showModal({
      title: '提示',
      content: '是否确认选择' + courses[couid].cname,
      complete: (res) => {
        if (res.confirm) {
          app.getCsrfToken(token => {
            wx.request({
              url: config.baseUrl + 'stuclass/',
              method: "POST",
              header: {
                "Authorization": wx.getStorageSync('userkey'),
                "X-CSRFToken": token,
                "content-type": 'application/x-www-form-urlencoded',
              },
              data: {
                "student": app.globalData.userinfo.id,
                "cou_arr": t_id,
              },
              success: () => {
                wx.showToast({
                  title: '选课成功',
                  icon: 'success',
                })
              }
            })
          })
          //前端修改值，更新页面
          courses[couid].selected = true;
          this.setData({
            courselist: courses,
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
    this.getYearTerm();
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