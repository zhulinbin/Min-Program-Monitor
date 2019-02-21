
## 功能
小程序全局错误捕捉工具,简单引用就可以在后台监控异常信息。

* 1. 获取onError生命周期里的错误信息
* 2. 上报wx.request、wx.uploadFile错误信息
* 3. 劫持console终端报错信息


## 使用方法
* 1. 复制文件夹
<pre>
-lib/
  -errorMonitor/
    config.js
    console.js
    core.js
    report.js
    request.js
  index.js
</pre>

* 2. 引用文件
<pre>
在app.js中

let errorMonitor = require('./lib/index.js')

errorMonitor.default.init({
  apiKey: 'xxxx',
  url: 'https://www.baidu.com',
  getNetwordkType: true,
  isShowModal: true
})

App({
})
</pre>

* 3. 示例
注: 在手机端预览的时候需要先打开调试(貌似报错了小程序就卡住了),其他情况可以直接运行
<a href="https://developers.weixin.qq.com/s/jmnNqlmg7g6R" target="_blank" rel="noopener">开发工具在线预览</a>

![小程序截图](https://www.jwdai.com.cn/images/screenShot2.png)

## 可选参数

| 参数    | 说明   | 类型   | 可选值  | 默认值| 必填   |
| ------ | ------ | ------ | ------ | ------| ------|
| appKey | 用于识别每个小程序(目前随便输入都可以暂时无用) | string | - | - | 是 |
| url    | 错误提交API地址    | string | - | - | 是 |
| getNetwordkType | 是否获取网络类型 | boolean | true/false | false | 否 |
| isShowModal | 是否显示错误捕捉modal | boolean | true/false | false | 否 |



