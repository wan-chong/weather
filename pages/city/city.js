// pages/city/city.js
const keyHeWeather = '37262775385146b7b7f7f1ade53d46d6';
const { fetch } = require('../../api/city.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeCity: '定位',
    topCity: [
      '定位',
      '北京',
      '上海',
      '广州',
      '深圳',
      '杭州',
      '成都',
      '南京',
      '天津'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('aaa')
    this.getTopCity();
  },

  getTopCity() {
    fetch({
      url: 'https://search.heweather.net/top',
      data: {
        key: keyHeWeather,
        group: 'cn',
        number: 10
      }
    }).then(res => {
      console.log(res);
    })
  },

  /**
   * 取消点击
   */
  cancelSearch: function() {
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})