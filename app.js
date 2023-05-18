// app.js
const config = require('./config');
App({
  onLaunch() {
    /**
     * 用户只有登录才能使用小程序
     * 没有token就表示没有登陆
     */
    // const token = wx.getStorageSync('userkey');
    // if (!token) {
    //   wx.reLaunch({
    //     url: 'pages/login/login',
    //   })
    // }
    // else {
    //   wx.reLaunch({
    //     url: 'pages/home/home',
    //   })
    // }

    /**
     * 设置顶部导航栏高度，勿删！！！
    */
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },

  getCsrfToken(callback) {
    wx.request({
      url: config.baseUrl + 'getCsrftoken/',
      method: 'GET',
      success: res => {
        const csrfToken = res.data.csrftoken;
        callback(csrfToken);
      },
      fail: err => {
        console.log('Fail to get csrf token', err);
      }
    })
  },

  globalData: {
    userinfo: {
      "id": 2,
      "username": "222019603193109",
      "name": "李世泽",
      "grade": 2019,
      "institute": "商贸学院",
      "profession": "信管",
      "phone": "178****0805",
      "email": "1817246943@qq.com",
    },  //用户信息
    cuinfo: {
      "class": "1班",
      "dormnum": "219",
      "dormIndex": 2,
      "account": 50,
    },
  }
})