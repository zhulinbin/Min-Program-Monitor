import Report from './report'
import ConsoleMixin from './console'

class ErrorMonitor extends ConsoleMixin(Report) {
  constructor() {
    super()
    this.breadcrumb = {
      app: [],
      page: []
    }
    this.init = (config) => {
      let errMsg = config.apiKey ? '' : '请输入apiKey'
      errMsg = errMsg ? errMsg : (config.url ? '' : '请输入url')

      if (errMsg) {  
        // todo
      } else {
        Object.assign(this.__APP_CONFIG__, config)
        this.interceptApp()
        this.interceptPage()
        this.interceptHttp()
        this.interceptError()
      }
    }
  }

  interceptApp() {
    let oldAppFn = App

    App = (obj) => {
      let lifecycleHooks = ['onLaunch', 'onShow', 'onHide', 'onError']
      lifecycleHooks.forEach((name) => {
        let oldHookFn = obj[name]
        let _this = this

        obj[name] = function(info) {
          switch(name) {
            case 'onLaunch':
              _this._handleOnLaunch()
              break
            case 'onError':
              _this._handleOnError(info)
              break
            default:
              break
          }
          _this._recordBreadcrumb({
            origin: 'App',
            hook: name,
            path: info && info.path,
            query: info && info.query,
            scene: info && info.scene
          })
          return oldHookFn && oldHookFn.call(this, info)
        }
      })

      oldAppFn && oldAppFn(obj)
    }
  }
  interceptPage() {
    let oldPage = Page

    Page = (obj) => {
      obj.onReady || this._doInterceptPage(obj, 'onReady')
      obj.onLoad || this._doInterceptPage(obj, 'onLoad')

      Object.keys(obj).forEach((name) => {
        typeof obj[name] === 'function' && this._doInterceptPage(obj, name)
      })

      oldPage && oldPage(obj)
    }
  }
  _handleOnLaunch() {
    if (this.__APP_CONFIG__.getNetwordkType) {
      wx.getNetworkType({
        success: (res) => {
          // todo 
        }
      })
    }
  }
  _handleOnError(info) {
    this.reportError({
      title: 'onError错误捕捉成功',
      content: info
    })
  }
  _doInterceptPage(obj, hook) {
    let oldHookFn = obj[hook]
    let _this = this
    obj[hook] = function() {
      if (hook !== 'onPageScroll') {
        let activePage = _this._getActivePage()
        _this._recordBreadcrumb({
          origin: 'Page',
          hook: hook,
          route: activePage && activePage.route,
          options: activePage && activePage.options
        })
      }
      return oldHookFn && oldHookFn.apply(this, arguments)
    }
  }
  _getActivePage() {
    let currentPages = getCurrentPages()

    if (currentPages && currentPages.length > 0) {
      return currentPages[currentPages.length -1]
    }
    return currentPages
  }
  _recordBreadcrumb(options) {
    let base = {
      type: 'function',
      time: new Date().getTime()
    }
    let desObj = Object.assign({}, base, options)

    if (options.origin === 'App') {
      this.breadcrumb.app.push(desObj)
    } else {
      this.breadcrumb.page.push(desObj)
    }
  }
}

export default new ErrorMonitor()
