// homepackages/schoolcal/schoolcal.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,   //导航栏下方固定栏
    imageurl1: "http://localhost:8000/static/img/2022-2023.png",
    imageurl2: "http://localhost:8000/static/img/2023-2024.png",
    selected: true,
    imgurl: "http://localhost:8000/static/img/2022-2023.png",

  },

  /**
   * 选择2022*2023学年的校历
   * @param {*}  
   */
  choose1(){
    this.setData({
      selected: true,
      imgurl: this.data.imageurl1,
    })
  },

  /**
   * 选择2023-2024学年的校历
   * @param {*} options 
   */
  choose2(){
    this.setData({
      selected: false,
      imgurl: this.data.imageurl2,
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