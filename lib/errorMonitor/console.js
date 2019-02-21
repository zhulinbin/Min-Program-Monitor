
let ConsoleMixin = (extendClass) => class extends extendClass {
  constructor() {
    super()
  }
  interceptError() {
    let oldConsoleError = console.error

    console.error = (error) => {
      if (error) {
        this.reportError({
          title: 'console错误捕捉',
          content: error
        })
      }
      return oldConsoleError && oldConsoleError(error)
    }
  }
}

export default ConsoleMixin
