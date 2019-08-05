import { Injectable } from '@angular/core';

const LoadingIndicator = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
const Mode = require('@nstudio/nativescript-loading-indicator').Mode;

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loader;

  constructor() {
    this.loader = new LoadingIndicator();
  }

  public showLoadingOverlay() {
    // optional options
    // android and ios have some platform specific options
    const options = {
      progress: 0.65,
      margin: 10,
      dimBackground: true,
      color: '#4B9ED6', // color of indicator and labels
      // background box around indicator
      // hideBezel will override this if true
      backgroundColor: 'yellow',
      userInteractionEnabled: false, // default true. Set false so that the touches will fall through it.
      hideBezel: true, // default false, can hide the surrounding bezel
      mode: Mode.Indeterminate, // see options below
    };

    this.loader.show(options); // options is optional
  }
}
