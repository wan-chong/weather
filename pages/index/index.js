/**
 * @file index.js
 * @author wanchong(wilson3cy@163.com)
 */

import * as echarts from '../../libs/ec-canvas/echarts';
const indexAPI = require('../../api/index.js');

/**
 * 生活指数
 * 
 * @const
 * @type {Array}
 */
const indexList = [{
  name: '舒适度',
  iconClass: 'shushidu'
}, {
  name: '穿衣',
  iconClass: 'chuanyi'
}, {
  name: '感冒',
  iconClass: 'ganmao'
}
  , {
  name: '运动',
  iconClass: 'yundong'
}, {
  name: '旅游',
  iconClass: 'lvyou'
}, {
  name: '紫外线',
  iconClass: 'ziwaixian'
}, {
  name: '洗车',
  iconClass: 'xiche'
}, {
  name: '空气质量',
  iconClass: 'kongqizhiliang'
}];

//获取应用实例
const app = getApp();

/**
 * 初始化一周温度变化折线图
 */
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    color: ["#f19878", "#67E0E3"],
    grid: {
      show: false,
      left: 0,
      right: 0,
      top: 30,
      bottom: 10
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      boundaryGap: false,
      show: false
    },
    series: [{
      name: '最高气温',
      type: 'line',
      symbol: 'rect',
      smooth: true,
      label: {
        show: true,
        formatter: '{c} °C'
      },
      data: [11, 12, 12, 9, 8, 12, 10]
    }, 
    {
      name: '最低气温',
      type: 'line',
      symbol: 'emptyCircle',
      label: {
        show: true,
        formatter: '{c} °C'
      },
      smooth: true,
      data: [-3, -3, -2, -1, -3, -2, -1]
    }]
  };

  chart.setOption(option);
  return chart;
}


Page({
  globalData: {
  },
  data: {
    indicatorDots: true,
    city: '',
    ec: {
      onInit: initChart
    },
    now: null,
    update: '',
    livingIndex: null,
    livingIndexList: indexList,
    iconUrl: 'https://cdn.heweather.com/cond_icon/',
    hoursData: null,
    weekData: null
  },
  // 事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goToCity: function() {
    wx.navigateTo({
      url: '../line/index',
    })
  },
  onLoad: function () {
    let self = this;
    self.getUserLocation()
      .then(() => {
        self.getWeatherLive();
        self.getLivingIndex();
        self.getHoursWeather();
        self.getWeekWeather();
      })
      .catch(err => {
        wx.showToast({
          title: '出错了：' + err,
          icon: 'none',
          duration: 2000
        })
      });
  },

  /**
   * 获取用户所在城市
   * 
   * @return Promise 
   */
  getUserLocation() {
    let self = this;
    return indexAPI.getSettingPromise()
      .then(res => {
        if (res.authSetting['scope.userLocation']) {
          return indexAPI.getUserLocation();
        } else {
          let authP = new Promise(function(resolve, reject) {
            wx.authorize({
              scope: 'scope.userLocation',
              success() {
                resolve();
              },
              fail() {
                reject();
              }
            })
          });

          return authP.then(() => {
            return indexAPI.getUserLocation();
          })
        }
      })
      .then(res => {
        let location = {
          latitude: res.latitude,
          longitude: res.longitude
        };
        return indexAPI.getLocationCity(location);
      })
      .then((res) => {
        let currentCity = res.ad_info.city;
        self.setData({
          city: currentCity
        });
      })
      .catch(err => {
        wx.showToast({
          title: '出错了：' + err,
          icon: 'none',
          duration: 2000
        })
      });
  },

  /**
   * 获取实况天气
   */
  getWeatherLive() {
    let self = this;
    indexAPI
    .getWeatherLive(self.data.city)
    .then(res => {
      self.setData({
        now: res.now,
        update: res.update.loc
      });
    }).catch(err => {
      wx.showToast({
        title: '出错了：' + err,
        icon: 'none',
        duration: 2000
      })
    });
  },

  /**
   * 24小时天气
   */
  getHoursWeather() {
    let self = this;
    indexAPI
    .getHoursWeather(self.data.city)
    .then(res => {
      self.setData({
        hoursData: res.hourly
      });
    }).catch(err => {
      wx.showToast({
        title: '出错了：' + err,
        icon: 'none',
        duration: 2000
      })
    });
  },

  /**
   * 一周天气
   */
  getWeekWeather() {
    let self = this;
    indexAPI
      .getWeekWeather(self.data.city)
      .then(res => {
        self.setData({
            weekData: res.daily_forecast
        });
      }).catch(err => {
        wx.showToast({
          title: '出错了：' + err,
          icon: 'none',
          duration: 2000
        })
      });
  },

  /**
   * 获取生活指数
   */
  getLivingIndex() {
    let self = this;
    indexAPI
    .getLivingIndex(self.data.city)
      .then(res => {
      self.setData({
        livingIndex: res.lifestyle
      });
    }).catch(err => {
      wx.showToast({
        title: '出错了：' + err,
        icon: 'none',
        duration: 2000
      })
    });
  }
})
