class AppError extends Error {
  constructor (message, statusCode = 400) {
    super(message)

    this.name = this.constructor.name
    this.statusCode = statusCode
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = AppError
