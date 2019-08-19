import { Injectable } from '@angular/core';
import * as platform from 'tns-core-modules/platform';

export const isIOS = platform.isIOS;
export const isAndroid = platform.isAndroid;
export const isWeb = false;

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  constructor() {}

  get isAndroid(): boolean {
    return isAndroid;
  }

  get isIOS(): boolean {
    return isIOS;
  }

  get isWeb(): boolean {
    return isWeb;
  }
}
