type ExtenderErrorTypes = {
  statusCode?: number;
  statusWithoutCode?: string;
  textTitle?: string;
  textMessage?: string;
};

type GenerateErrorTypes = {
  statusCode?: number;
  statusWithoutCode?: string;
  textTitle?: string;
  textMessage?: string;
};

class ExtendedError extends Error {
  statusCode?: number;
  statusWithoutCode?: string;
  textTitle?: string;
  textMessage?: string;

  constructor({
    statusCode,
    statusWithoutCode,
    textTitle,
    textMessage,
  }: ExtenderErrorTypes) {
    super(textMessage);
    this.statusCode = statusCode;
    this.textTitle = textTitle;
    this.textMessage = textMessage;
    this.statusWithoutCode = statusWithoutCode;
  }
}

export class ErrorHandler {
  static instance = new ErrorHandler();

  private constructor() {}

  static generateError({
    statusCode,
    statusWithoutCode,
    textTitle,
    textMessage,
  }: GenerateErrorTypes): ExtendedError {
    if (statusCode) {
      return new ExtendedError({
        statusCode: statusCode,
        textTitle: textTitle || this.instance.getDefaultTitle(statusCode),
        textMessage: textMessage || this.instance.getDefaultMessage(statusCode),
      });
    } else if (statusWithoutCode) {
      return new ExtendedError({ statusWithoutCode });
    } else {
      throw new Error("Invalid error parameters");
    }
  }

  private getDefaultTitle(statusCode: number): string {
    switch (statusCode) {
      case 400:
        return "Bad Request";
      case 401:
        return "Unauthorized";
      case 403:
        return "Forbidden";
      case 404:
        return "Not Found";
      case 405:
        return "Method Not Allowed";
      case 409:
        return "Conflict";
      case 415:
        return "Unsupported Media Type";
      case 500:
        return "Internal Server Error";
      default:
        return "Unknown Error";
    }
  }

  private getDefaultMessage(statusCode: number): string {
    switch (statusCode) {
      case 400:
        return "The request was malformed or incomplete.";
      case 401:
        return "The user is not authorized to perform this action.";
      case 403:
        return "The user is not authorized to access this resource.";
      case 404:
        return "The requested resource was not found.";
      case 405:
        return "The requested method is not allowed for this resource.";
      case 409:
        return "The request conflicts with an existing resource.";
      case 415:
        return "The request was made with an unsupported media type.";
      case 500:
        return "An unexpected error occurred.";
      default:
        return "An unknown error occurred.";
    }
  }
}
