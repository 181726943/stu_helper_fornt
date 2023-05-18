// modifyinfo/repsetpwd/resetpwd.js
const config = require('../../config.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    warning: '',  //警告信息是否显示
    newpasswd: '',
    ackpasswd: '',
  },

  /**
   * 设置新密码
   * @param {*} e 
   */
  newPwd(e){
    let newpasswd = e.detail.value;
    if (newpasswd.length < 8){
      this.setData({
        warning: 'length',  //长度报错
      })
    }
    this.data.newpasswd = newpasswd;
  },

  /**
   * 确认密码
   * @param {*} e 
   */
  ackPwd(e){
    let ackpasswd = e.detail.value;
    this.data.ackpasswd = ackpasswd;
  },

  /**
   * 确认按钮
   * @param {*} e 
   */
  Confirm(e){
    let pwd1 = this.data.newpasswd;
    let pwd2 = this.data.ackpasswd;
    // 密码一致，长度符合，进行下一步操作
    if (pwd1 == pwd2 && pwd1.length >= 8){
      //消除警告信息
      this.setData({
        warning: null,
      });
      //后端更新
      app.getCsrfToken(token =>{
        wx.request({
          url: config.baseUrl + 'auth/password/change/',
          method: "POST",
          header:{
            "X-CSRFToken": token,
            // "Authorization": wx.getStorageSync('userkey'),
            "Authorization": 'Token 892c8cc13629659ba86be020b267807a81dfba7c',
            "content-type": 'application/x-www-form-urlencoded',
          },
          data: {
            new_password1: pwd1,
            new_password2: pwd2
          },
          success: () => {
            wx.showToast({
              title: '密码修改成功',
              icon: "success",
            });
          }
        });
      });
      //退出登录
      app.getCsrfToken(token => {
        wx.request({
          url: baseUrl + 'auth/logout/',
          method: 'POST',
          header:{
            "X-CSRFToken": token,
          },
        });
      });
      //清除缓存
      wx.clearStorage();
      //跳转登录页面
      wx.reLaunch({
        url: '/pages/login/login?info=reset',
      })
    }
    //显示密码不一致警告信息
    else if(pwd1 != pwd2){
      this.setData({
        warning: 'same',
      })
    }
    //显示长度警告信息
    else{
      this.setData({
        warning: 'length',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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