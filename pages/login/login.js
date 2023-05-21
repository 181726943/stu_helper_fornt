// pages/login/login.js
const app = getApp();
const config = require('../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //showpwdType：眼睛状态   passwordType：密码可见与否状态
    //默认不可见
    showpwdType: true,
    passwordType: true,

    //默认用户密码为空
    username: '',
    password: '',

    //模态框
    showModal: null,
    message: '',
    
  },

  //设置密码是否可见的函数
  showorhide() {
    let showpwdType = !this.data.showpwdType;
    let passwordType = !this.data.passwordType;
    this.setData({
      showpwdType: showpwdType,
      passwordType: passwordType
    })
  },

  //获取用户输入的用户名与密码
  getusername(e) {
    const name = e.detail.value;
    this.setData({
      username: name,
    });
  },
  getpassword(e) {
    const pwd = e.detail.value;
    this.setData({
      password: pwd,
    });
  },

  /**
   * 登录按钮
   */
 btnlogin() {
    let user = wx.getStorageSync('username');
    let username = this.data.username;
    let password = this.data.password;
    if (username == '' || password == ''){
      wx.showToast({
        title: '请输入账号密码',
        icon: 'error',
      })
    }
    else if (app.globalData.userinfo.username === user){
      wx.showToast({
        title: '不可重复登录',
        icon: 'none'
      })
    }
    else{
      /**
       * 第一个请求，get方式获取csrftoken，
       * 用于登录post方式必须有csrftoken
      */
      app.getCsrfToken(token => {
        /**
           * 第二个请求post方式登录
          */
         wx.request({
          url: config.baseUrl + 'auth/login/',
          method: 'POST',
          data: {
            "username": username,
            "password": password,
          },
          header: {
            'X-CSRFToken': token,
          },
          /**
           * 此处success只表示成功发送请求
           * 并不表示得到预期结果
           * @param {*} res 请求返回结果
          */
          success: loginres => {
            /** 
             * 判断是否登录成功
             * loginres.statusCode=200:登陆成功
             * loginres.statusCode=400:密码账号错误
            */
            if(loginres.statusCode === 200){
              // 存储用户登录凭证
              wx.setStorage({
                  key: "userkey",
                  data: 'Token ' + loginres.data.key,
              });
              wx.setStorage({
                key: 'username',
                data: username,
              });
              let userkey = loginres.data.key;
              // console.log(loginres.data.key)
              /**
               * 第三个请求，get方式获取每个用户的唯一key值
               * 若登陆成功，则loginres.data.key的值就是key值
               */
              wx.request({
                url: config.baseUrl + 'auth/user/',
                method: 'GET',
                header:{
                  "Authorization":'Token ' + userkey,
                },
                success: userinfo => {
                  /**
                   * 第四个请求，get方式获取当前登录用户信息
                   */
                  wx.request({
                    url: config.baseUrl + 'user/'+userinfo.data.pk+'/',
                    method: "GET",
                    header:{
                      "Authorization":'Token ' + userkey,
                    },
                    success: user_res => {
                      // console.log(user_res);
                      app.globalData.userinfo["id"] = userinfo.data.pk,
                      app.globalData.userinfo["username"] = user_res.data.username,
                      app.globalData.userinfo["name"] = user_res.data.user_name,
                      app.globalData.userinfo["grade"] = user_res.data.grade,
                      app.globalData.userinfo["institute"] = user_res.data.institute,
                      app.globalData.userinfo["profession"] = user_res.data.profession,
                      app.globalData.userinfo["phone"] = user_res.data.phone
                    }
                  })
                }
              });
              // 登陆成功，跳转首页
              wx.switchTab({
                url: '../home/home',
              });
            }
            // res.statusCode=400
            else{
              wx.showToast({
                title: '账号密码错误',
                icon: 'error',
              });
            }
          },
        });
      })
    }
  },

  /**
   * 模态框取消按钮
   * @param {*}  
   */
  Cancle(){
    this.setData({
      showModal: false,
    });
    //退出小程序
    wx.exitMiniProgram();
  },

  /**
   * 模态框确认按钮
   * @param {*}  
   */
  Confirm(){
    this.setData({
      showModal: false,
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let message = options.info;
    if(message)
      if(message == 'logout'){
        this.setData({
          showModal: true,
          message: '已退出登录',
        });
      }
      else {
        this.setData({
          showModal: true,
          message: '密码已修改，请重新登录'
        })
      }
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
    // //动态背景1
    // clearInterval(this.data.intervalId);
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