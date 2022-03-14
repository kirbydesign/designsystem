import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MuteErrorService {
  constructor() {
    this.extendErrorHandler();
  }
  private errorMessages: string[] = [];

  public registerErrorMessages(messages: string[] | string) {
    this.errorMessages = this.errorMessages.concat(messages);
    console.log('Error messages: ', this.errorMessages);
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

      if (this.errorMessages.includes(originalError.message)) {
        console.log('Muting resizeobserver error');
        // Return true here, to prevent firing the default event handler
        return true;
      } else if (existingErrorHandler !== null) {
        console.log('Old window.onerror exists, rethrow');
        return existingErrorHandler(originalError.message);
      } else {
        console.log('Just throwing that old onerror as usual, nothing to see here.');
        console.log(originalError);
        return originalError;
      }
    };
  }
}
