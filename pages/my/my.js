// pages/my/my.js
const app = getApp();
const config = require('../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    userInfo: [],
    cuInfo: {},
    dormPicker: ['A', 'B', 'C', 'D', 'E', '4', '5', '6'],
    dormIndex: 2,
    staticUrl: config.staticUrl,

  },

  /**
   * 展示侧边栏
   * @param {*} e 
   */
  showDrawer(e){
    this.setData({
      modelName: e.currentTarget.dataset.target,
    })
  },

  /**
   * 消除警告信息
   */
  holdDrawer(){
    return ;
  },

  hideDrawer(){
    this.setData({
      modelName: null,
    })
  },

  /**
   * 修改密码
   */
  changePwd(){
    wx.navigateTo({
      url: '/modifyinfo/resetpwd/resetpwd',
    });
    this.hideDrawer();
  },

  /**
   * 修改信息
   */
  modifyInfo(){
    wx.navigateTo({
      url: '/modifyinfo/information/information',
    });
    this.hideDrawer();
  },

  /**
   * 退出登录
   */
  logout(){
    app.getCsrfToken(token => {
      wx.request({
        url: config.baseUrl + 'auth/logout/',
        method: 'POST',
        header: {
          "X-CSRFToken": token,
        },
        success: ()=> {
          app.globalData.userinfo = null;
          wx.clearStorage();
          wx.reLaunch({
            url: '/pages/login/login?info=logout',
          });
        }
      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      userInfo: Object.assign({}, app.globalData.userinfo),
      cuInfo: Object.assign({}, app.globalData.cuinfo),
      dormIndex: Object.assign({}, app.globalData.cuinfo).dormIndex,
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
    this.setData({
      userInfo: Object.assign({}, app.globalData.userinfo),
      cuInfo: Object.assign({}, app.globalData.cuinfo),
      dormIndex: Object.assign({}, app.globalData.cuinfo).dormIndex,
    });

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