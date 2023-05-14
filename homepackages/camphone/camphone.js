// homepackages/camphone/camphone.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,   //导航栏下方固定栏
    TabCur: 0,
    list: ['宿舍', '校医', '教务', '网络', '安全'],
    phone: [
      [
        {name: '宿舍空调维修1', value: '02365012181'},
        {name: '宿舍空调维修2', value: '02365012956'},
        {name: '水电维修', value: '02346751037'},
      ],
      [
        {name: '阳光心理热线', value: '13996464520'},
        {name: '校医院', value: '02346751085'},
      ],
      [
        {name: '教务处', value: '02368252530'},
        {name: '图书馆投诉', value: '02368254679'}
      ],
      [
        {name: '网络故障', value: '02368254080'},
        {name: '西大网安工作', value: '02368367290'},
        {name: '信息化办公室', value: '02346751750'},
      ],
      [
        {name: '治安科', value: '02368252459'},
        {name: '派出所白天', value: '02346751519'},
        {name: '派出所晚上', value: '02346751524'},
        {name: '校保卫办', value: '13500354597'},
      ]
    ]
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    });
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