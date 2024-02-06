type ErrorAPITypes = {
  messageText: string;
  titleText?: string;
  statusCode?: number;
};

export class ErrorAPI {
  status: string;
  titleText: string;
  messageText: string;
  statusCode: number;

  constructor({ messageText, titleText, statusCode }: ErrorAPITypes) {
    this.status = "ERROR";
    this.messageText = messageText;
    this.titleText = titleText || "An error occurred!";
    this.statusCode = statusCode || 500;
  }
}
