// class CustomAssertionError extends Error.AssertionError {
//   constructor(message, status) {
//     console.log(message, ' @@@@')
//     super(message, status);
//     Error.captureStackTrace(this, this.constructor);
//     this.status = statusCode;
//   }
// }

// class CustomTypeError extends Error.TypeError {
//   constructor(message, status = 400) {
//     super(message, status);
//     Error.captureStackTrace(this, this.constructor);
//     this.status = status;
//   }
// }

class CustomGeneralError extends Error {
  constructor(message, status, name = 'Error') {
    super(message, status);
    // Error.captureStackTrace(this, this.constructor);
    // this.status = status;
    this.name = name;
    this.status = status;
    this.message = message;
  }
}

export default {
  // CustomAssertionError,
  // CustomTypeError,
  CustomGeneralError
};


// class CustomAssertionError extends Error.AssertionError {
//   constructor(message, status) {
//     console.log(message, ' @@@@')
//     super(message, status);
//     Error.captureStackTrace(this, this.constructor);
//     this.status = statusCode;
//   }
// }

// class CustomTypeError extends Error.TypeError {
//   constructor(message, status = 400) {
//     super(message, status);
//     Error.captureStackTrace(this, this.constructor);
//     this.status = status;
//   }
// }

// class CustomGeneralError extends Error {
//   constructor(message, status = 400) {
//     super(message, status);
//     Error.captureStackTrace(this, this.constructor);
//     this.status = status;
//   }
// }

// export default {
//   CustomAssertionError,
//   CustomTypeError,
//   CustomGeneralError
// };
