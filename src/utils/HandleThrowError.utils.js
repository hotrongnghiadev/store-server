class HandleError extends Error {
  constructor(message, httpCode) {
    super(message);
    this.httpCode = httpCode;
  }
}

// function handleError(message, httpCode) {
//   this.message = message;
//   this.httpCode = httpCode;
// }
// handleError.prototype = Error.prototype;

export default HandleError;
