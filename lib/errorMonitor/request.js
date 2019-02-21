
import Config from './config'

class Request extends Config {
  constructor() {
    super()
  }
  interceptHttp() {
    ['request', 'uploadFile'].forEach((type) => {
      this._handleIntercept(type)
    })
  }
  _handleIntercept(type) {
    let oldHttpRequest = wx[type]

    Object.defineProperty(wx, type, {
      configurable: true,
      enumerable: true,
      writable: true,
      value: (options) => {
        if (options.url !== this.__APP_CONFIG__.url) {
          let oldFailFn = options.fail
          options.fail = (error) => {
            if (error) {
              wx.request({
                url: this.__APP_CONFIG__.url,
                method: this.__APP_CONFIG__.method,
                data: {
                  data: error
                },
                fail: (reportError) => {
                  if (this.__APP_CONFIG__.isShowModal) {
                    wx.showModal({
                      title: '网络错误捕捉 - 提交失败',
                      content: `${JSON.stringify(error)}===============response=====================${JSON.stringify(reportError)}`
                    })
                  }
                },
                success: (reportRes) => {
                  if (this.__APP_CONFIG__.isShowModal) {
                    wx.showModal({
                      title: '网络错误捕捉 - 提交成功',
                      content: `${JSON.stringify(error)}================response====================${JSON.stringify(reportRes)}`
                    })
                  }
                }
              })
            }
            return oldFailFn && oldFailFn(error)
          }
        }

        return oldHttpRequest && oldHttpRequest(options)
      }
    })
  }
}

export default Request
