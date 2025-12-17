class ApiResponse {
  public statusCode: number;
  public data: any | null;
  public message: string;
  public success: boolean;

  constructor(
    statusCode: number,
    data: any,
    message: string = "Something went wrong"
  ) {
    ((this.statusCode = statusCode),
      (this.data = data),
      (this.message = message),
      (this.success = statusCode < 400));
  }
}

export { ApiResponse };
