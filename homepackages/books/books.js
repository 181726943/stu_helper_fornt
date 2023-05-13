// homepackages/books/books.js
const app = getApp();
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,   //导航栏下方固定栏
    grade: Object.assign({}, app.globalData.userinfo).grade,  //用户年级
    todaydate: `${year}-${month}-${day}`,   //获取今天日期
    //起止时间默认当前日期
    begindate: `${year}-${month}-${day}`,
    enddate: `${year}-${month}-${day}`,
    booklist: []
  },

  /**
   * 起始时间值变化处理函数
   * @param {*} e 时间变化事件
   */
  startChange(e){
    this.setData({
      begindate: e.detail.value,
    });
  },
  /**
   * 截止时间变化处理函数
   * @param {*} e 时间变化事件
   */
  endChange(e){
    this.setData({
      enddate: e.detail.value,
    });
  },

  tosearch(){
    wx.request({
      url: 'http://127.0.0.1:8000/main/bookinfo/readinfo',
      method: 'GET',
      data:{
        begin_date: this.data.begindate,
        end_date: this.data.enddate
      },
      header:{
        "Authorization": wx.getStorageSync('userkey')
      },
      success: res => {
        if(res.statusCode === 200){
          this.setData({
            booklist: res.data
          });
        }
        else{
          wx.showToast({
            title: '宕机了',
            icon: "error",
            duration: 1500
          })
        }
      }
    })
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