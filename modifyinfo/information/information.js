// modifyinfo/information/information.js
const app = getApp();
const config = require('../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,   //导航栏下方固定栏
    userInfo: {},   //系统保存的用户信息
    cuInfo: {}, //用户自定义信息
    dormPicker: ['A', 'B', 'C', 'D', 'E', '4', '5', '6'],
    dormIndex: 2,
    staticUrl: config.staticUrl,
  },

  /**
   * picker事件处理函数
   * @param {*} e picker事件对象
   */
  ValueChange(e){
    this.setData({
      dormIndex: e.detail.value
    })
  },

  /**
   * 处理输入框输入
   * @param {*} e 输入结束事件
   */
  getInput(e){
    // 邮箱
    if(e.currentTarget.id == "email"){
      // 更新局部变量
      this.setData({
        "userInfo.email": e.detail.value,
      });
    }
    // 电话
    else if(e.currentTarget.id == "phone"){
      this.setData({
        "userInfo.phone": e.detail.value,
      })
    }
    // 本页变量 班级、宿舍、余额
    else{
      let temp = this.data.cuInfo;
      temp[e.currentTarget.id] = e.detail.value;
      this.setData({
        cuInfo: temp,
      })
    }
  },

  /**
   * 取消按钮处理函数
   * @param {*} 
  */
  Cancle(){
    wx.navigateBack();
  },

  /**
   * 保存按钮处理函数
   * @param {*} e 
   */
  Save(){
    // 更新全局变量
    app.globalData.userinfo = this.data.userInfo;
    app.globalData.cuinfo = this.data.cuInfo;
    // 后端同步
    app.getCsrfToken(token => {
      wx.request({
        url: config.baseUrl + 'user/' + this.data.userInfo.id + '/',
        method: 'PUT',
        data: {
          "email": this.data.userInfo.email,
          "phone": this.data.userInfo.phone,
        },
        header:{
          "X-CSRFToken": token,
          "Authorization": wx.getStorageSync('userkey'),
          "content-type": 'application/x-www-form-urlencoded',
        },
        success: () => {
          wx.showToast({
            title: '修改成功',
            icon: 'success'
          })
          // wx.navigateBack();
        }
      })
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      userInfo: Object.assign({}, app.globalData.userinfo),
      cuInfo: Object.assign({}, app.globalData.cuinfo),
    });
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