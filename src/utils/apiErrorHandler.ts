class ApiError extends Error {
  public statusCode: number;
  public data: any | null;
  public success: boolean;
  public error: any[];

  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    error: any[] = [],
    stack: string = ""
  ) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.data = null;
    this.success = false;
    this.error = error;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
