// pages/my/my.js
const app = getApp();
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

  },

  showDrawer(e){
    this.setData({
      modelName: e.currentTarget.dataset.target,
    })
  },
  hideDrawer(){
    this.setData({
      modelName: null,
    })
  },

  modifyInfo(){
    wx.navigateTo({
      url: '/modifyinfo/information/information',
    });
    this.hideDrawer();
  },

  logout(){
    app.globalData.userinfo = null;
    wx.clearStorage();
    wx.reLaunch({
      url: '/pages/login/login',
    });
    wx.showModal({
      title: '注销/切换账号',
      content: '当前帐号已退出登录,请重新登录',
      showCancel: false,
      confirmColor: "#8dc63f",
    })
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