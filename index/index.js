
Page({
  doCatchOnError: function() {
    throw new Error('手动触发onError错误')
  },
  doCatchRequestError: function() {
    wx.request({
      url: 'https://ww.jwdai.com.cn',
      method: 'POST',
      data: '测试网络请求捕捉',
      fail: () => {
      },
      success: () => {
      }
    })
  },
  doCatchConsoleError: function() {
    console.error('手动触发console错误')
  }
})