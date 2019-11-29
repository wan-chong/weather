function httpRequest({ url, method = 'GET', data = {} }) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: method,
      success: (res) => {
        if (res.statusCode !== 200) {
          wx.showToast({
            icon: 'none',
            duration: 2000,
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

module.exports = {
  httpRequest: httpRequest
}