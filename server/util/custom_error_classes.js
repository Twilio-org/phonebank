export default class CustomError extends Error {
  constructor(message, status, log) {
    super(message, status);
    this.log = log;
    this.status = status;
    this.message = message;
  }
}
