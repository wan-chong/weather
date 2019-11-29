const apiBaseUrl = 'https://free-api.heweather.net/s6/weather/';
// 和风天气key
const keyHeWeather = '37262775385146b7b7f7f1ade53d46d6';

function fetch({ url, data = {}}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      success: (res) => {
        if (res.statusCode !== 200) {
          wx.showToast({
            title: '哎呀，出错了。请稍后再试',
          });
        } else {
          resolve(res.data);
        }
      },
      fail: (err) => {
        wx.showToast({
          icon: 'none',
          duration: 2000,
          title: '哎呀，出错了。请稍后再试',
        });
      }
    })
  })
}

/**
 * 获取热门城市
 */


module.exports = {
  fetch: fetch
}