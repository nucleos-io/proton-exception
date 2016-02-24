'use strict'

module.exports = class Exception extends Error {

  constructor(message) {
    super(message)
    this.message = message
    Error.captureStackTrace(this, this.constructor.name)
  }

  handle(ctx) {
    return ctx.status = 500
  }

  /**
   * @return class name
   */
  get name() {
    return this.constructor.name
  }

}
