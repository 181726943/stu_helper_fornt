// homepackages/cammap/cammap.js
import { BMapWX } from '../libs/js/bmap-wx.min.js';
var wxMarkerData = [];
import { ssl, st, jxl, kd, qt } from '../libs/js/localList.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: ssl,
    latitude: '',
    longitude: '',
    tabList: ['宿舍楼', '食堂', '教学楼', 'ATM/快递', '其他'],
    tabName: [ssl, st, jxl, kd, qt],
    TabCur: 0,
  },

  /**
   * 导航栏选择
   * @param {e} e 
   */
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    });
    this.markdown(this.data.TabCur);
    // console.log(e);
  },

  /**
   * 标点函数
   * @param {*} id 当前点击的状态栏选项的id 
   */
  markdown(id){
    var that = this;
    var BMap = new BMapWX({
        ak: 'qk5wduG12ecc1QRofAFWGMaPYG8Qm0io'
    });
    var fail = function(data) {
        console.log(data)
    };
    var success = function(data) {
        wxMarkerData = data.wxMarkerData;
        that.setData({
          markers: that.data.tabName[id],
        });
        that.setData({
            latitude: wxMarkerData[0].latitude,
        });
        that.setData({
            longitude: wxMarkerData[0].longitude,
        });
    }
    BMap.regeocoding({
        fail: fail,
        success: success,
        iconPath: '/image/marker.png',
    });
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.markdown(this.data.TabCur);
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