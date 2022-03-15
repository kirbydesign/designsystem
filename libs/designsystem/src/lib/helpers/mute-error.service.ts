import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MuteErrorService {
  private mutedErrors: string[] = [];

  constructor() {
    this.extendErrorHandler();
  }

  public register(messages: string[] | string) {
    this.mutedErrors = this.mutedErrors.concat(messages);
  }

  private extendErrorHandler() {
    const existingErrorHandler = window.onerror;
    window.onerror = (message, url, lineno, colno, error) => {
      const originalError = {
        message: message as string,
        url,
        lineno,
        colno,
        error,
      };

      this.handleError(originalError, existingErrorHandler);
    };
  }

  private handleError(error: any, errorHandler?: OnErrorEventHandlerNonNull) {
    if (this.mutedErrors.includes(error.message)) {
      // Return true here, which means we mute the error
      // by preventing the firing of the default event handler
      return true;
    } else if (errorHandler !== null && errorHandler !== undefined) {
      // If an error handler has previously been registered
      // reuse it with the original error
      return errorHandler(error);
    } else {
      return error;
    }
  }
}
