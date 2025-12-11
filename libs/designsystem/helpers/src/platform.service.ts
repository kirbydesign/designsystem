import { Injectable } from '@angular/core';

import { WindowRef } from '@kirbydesign/designsystem/types';
import { DesignTokenHelper } from './design-token-helper';

export enum Browser {
  Safari = 'safari',
  Chrome = 'chrome',
  Firefox = 'firefox',
  Edge = 'edge',
  Other = 'other',
}

export enum DeviceType {
  iOS = 'ios',
  Android = 'android',
  Desktop = 'desktop',
}

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  private _browser: Browser = undefined;
  private _deviceType: DeviceType = undefined;

  constructor(private windowRef: WindowRef) {}

  isTouch() {
    const isTouchDeviceQuery = '(pointer: coarse)'; // No check for `hover: none`, as Samsung Galaxy will return false on `hover: none` media query
    return this.windowRef.nativeWindow.matchMedia(isTouchDeviceQuery).matches;
  }

  isPhabletOrBigger() {
    const query = `(min-width: ${DesignTokenHelper.breakpoints.medium})`;
    return this.windowRef.nativeWindow.matchMedia(query).matches;
  }

  getBrowser(): Browser {
    if (this._browser) {
      return this._browser;
    }
    let browser: Browser = undefined;
    const userAgent = navigator.userAgent.toLowerCase();

    if (/edg(e|a|ios)/.test(userAgent)) {
      browser = Browser.Edge;
    }
    if (/chrome|crios|crmo/.test(userAgent) && !/edg/.test(userAgent)) {
      browser = Browser.Chrome;
    }
    if (/firefox|fxios/.test(userAgent)) {
      browser = Browser.Firefox;
    }
    if (/safari/.test(userAgent) && !/chrome|crios|crmo/.test(userAgent)) {
      browser = Browser.Safari;
    }
    if (!browser) {
      browser = Browser.Other;
    }

    this._browser = browser;
    return this._browser;
  }

  getDeviceType(): DeviceType {
    if (this._deviceType) {
      return this._deviceType;
    }
    let deviceType: DeviceType = undefined;
    const userAgent = navigator.userAgent;

    if (/iPad|iPhone|iPod/.test(userAgent)) {
      deviceType = DeviceType.iOS;
    }
    if (/android/i.test(userAgent)) {
      deviceType = DeviceType.Android;
    }
    if (!deviceType) {
      deviceType = DeviceType.Desktop;
    }
    this._deviceType = deviceType;
    return this._deviceType;
  }
}
