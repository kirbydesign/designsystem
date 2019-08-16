import { Injectable } from '@angular/core';

export const isIOS = false;
export const isAndroid = false;
export const isWeb = true;

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
