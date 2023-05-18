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

    rainbowColors: ['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#f00'] // 渐变色数组
    
  },

  //设置密码是否可见的函数
  showorhide: function() {
    this.data.showpwdType = !this.data.showpwdType,
    this.data.passwordType = !this.data.passwordType,
    this.setData({
      showpwdType: this.data.showpwdType,
      passwordType: this.data.passwordType
    })
  },

  //获取用户输入的用户名与密码
  getusername: function(e) {
    const name = e.detail.value;
    this.setData({
      username: name,
    });
  },
  getpassword: function(e) {
    const pwd = e.detail.value;
    this.setData({
      password: pwd,
    });
  },

 btnlogin() {
    this.getusername();
    this.getpassword();
    let user = wx.getStorageSync('username');
    if (!this.data.username || !this.data.password){
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
      wx.request({
        url: config.baseUrl + 'getCsrftoken/',
        method: 'GET',
        //获取成功，将token加入请求头发送登录请求
        success: res => {
          let token = ''
          if (res.statusCode == 200) {
            // console.log(res.data.csrftoken)
            token = res.data.csrftoken
          }
          /**
           * 第二个请求post方式登录
          */
          wx.request({
            url: config.baseUrl + 'auth/login/',
            method: 'POST',
            data: {
              "username": this.data.username,
              "password": this.data.password,
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
              // console.log(loginres.statusCode);
              // console.log(loginres.data.key);
              /** 
               * 判断是否登录成功
               * loginres.statusCode=200:登陆成功
               * loginres.statusCode=400:密码账号错误
              */
              if(loginres.statusCode === 200){
                // 存储用户登录凭证
                wx.setStorage({
                    key: "userkey",
                    data: 'Token ' + res.data.key,
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
                    // console.log(userinfo);
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
        }
      });
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