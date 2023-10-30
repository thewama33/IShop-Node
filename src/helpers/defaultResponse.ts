class DefaultResponse {
  status: number;
  message: string | undefined;
  data: any | undefined;
  error: string | null;

  constructor(
    data: any,
    message: string | undefined,
    status = 200,
    error: string | null = null
  ) {
    if (typeof status !== "number" || status < 100 || status > 599) {
      throw new Error("Invalid HTTP status code");
    }

    this.status = status;
    this.message = message;
    this.data = data;
    this.error = error;
  }

  static success(data: any): DefaultResponse {
    return new DefaultResponse(
      !data ? undefined : data,
      "Results are retrieved successfully.",
      200
    );
  }

  static error(message: string, status = 500): DefaultResponse {
    return new DefaultResponse(undefined, undefined, status, message);
  }

  static notFound(): DefaultResponse {
    return new DefaultResponse(undefined, undefined, 404, "Not Found");
  }
}

export { DefaultResponse };
