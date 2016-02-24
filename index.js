'use strict'

module.exports = class extends Error {

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
    global[this.name] = this.model
    return true
  }

  _bindToApp() {
    this.proton.app.exceptions[this.name] = this
  }

  /**
   * @return class name
   */
  get name() {
    return this.constructor.name
  }

}
