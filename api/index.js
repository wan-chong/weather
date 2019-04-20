const QQMapWX = require('../libs/qqmap-wx-jssdk.min.js');
const apiBaseUrl = 'https://free-api.heweather.net/s6/weather/';
/**
 * 获取用户的当前设置
 * @returm {Object} Promise对象
 */
const getSettingPromise = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err);
      }
    })
  })
}

/**
 * 获取用户位置坐标
 * @returm {Object} Promise对象
 */
const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      success: res => {
        resolve(res);
      },
      fail: err => {
        reject(err);
      }
    })
  })
}

/**
 * 获取用户当前所在城市
 * @param  {Object} location 当前位置的坐标
 * @returm {Object}          Promise对象
 */
const getLocationCity = location => {
  const qqmapsdk = new QQMapWX({
    key: 'JZ5BZ-B6PWW-3VJRG-OEFMA-APE5E-LGBSJ'
  });
  return new Promise((resolve, reject) => {
    qqmapsdk.reverseGeocoder({
      location: location,
      success: function (res) {
        if (res.status !== 0) {
          reject(res.message);
        } else {
          resolve(res.result);
        }
      }
    })
  })
}

// 和风天气key
const keyHeWeather = '37262775385146b7b7f7f1ade53d46d6';

/**
 * 获取实况天气
 */
const getWeatherLive = (city) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: apiBaseUrl + 'now',
      data: {
        key: keyHeWeather,
        location: city
      },
      success: (res) => {
        if (res.statusCode !== 200) {
          reject(res.errMsg);
        } else {
          resolve(res.data.HeWeather6[0]);
        }
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}

/**
 * 获取生活指数
 */
const getLivingIndex = (city) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: apiBaseUrl + 'lifestyle',
      data: {
        key: keyHeWeather,
        location: city
      },
      success: (res) => {
        if (res.statusCode !== 200) {
          reject(res.errMsg);
        } else {
          resolve(res.data.HeWeather6[0]);
        }
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}

/**
 * 获取24小时天气数据
 */
const getHoursWeather = (city) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: apiBaseUrl + 'hourly',
      data: {
        key: keyHeWeather,
        location: city
      },
      success: (res) => {
        if (res.statusCode !== 200) {
          reject(res.errMsg);
        } else {
          resolve(res.data.HeWeather6[0]);
        }
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}

/**
 * 获取一周天气数据
 */
const getWeekWeather = (city) => {

  return new Promise((resolve, reject) => {
    wx.request({
      url: apiBaseUrl + 'forecast',
      data: {
        key: keyHeWeather,
        location: city
      },
      success: (res) => {
        if (res.statusCode !== 200) {
          reject(res.errMsg);
        } else {
          resolve(res.data.HeWeather6[0]);
        }
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}

module.exports = {
  getSettingPromise: getSettingPromise,
  getUserLocation: getUserLocation,
  getLocationCity: getLocationCity,
  getWeatherLive: getWeatherLive,
  getLivingIndex: getLivingIndex,
  getHoursWeather: getHoursWeather,
  getWeekWeather: getWeekWeather
}