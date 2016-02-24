'use strict'

module.exports = class Exception extends Error {

  constructor(message, proton) {
    super(message)
    this.proton = proton
    this.message = message
    this._bindToApp()
    this.expose()
    Error.captureStackTrace(this, this.constructor.name)
  }

  handle(ctx) {
    return ctx.status = 500
  }

  expose() {
    global[this.name] = this.constructor
    return true
  }

  _bindToApp() {
    this.proton.app.exceptions[this.name] = this.constructor
  }

  /**
   * @return class name
   */
  get name() {
    return this.constructor.name
  }

}
