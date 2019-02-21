
import Request from './request'

class Report extends Request {
  constructor() {
    super()
  }
  reportError(data) {
    wx.request({
      url: this.__APP_CONFIG__.url,
      method: this.__APP_CONFIG__.method,
      data: {
        data: data.content
      },
      fail: (error) => {
        if (this.__APP_CONFIG__.isShowModal) {
          wx.showModal({
            title: `${data.title} - 提交失败`,
            content: `${data.content}===============response=====================${JSON.stringify(error)}`
          })
        }
      },
      success: (res) => {
        if (this.__APP_CONFIG__.isShowModal) {
          wx.showModal({
            title: `${data.title} - 提交成功`,
            content: `${data.content}================response====================${JSON.stringify(res)}`
          })
        }
      }
    })
  }
}

export default Report
