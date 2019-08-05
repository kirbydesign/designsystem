import { Injectable } from '@angular/core';
import { isAndroid, isIOS } from 'tns-core-modules/platform';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  isAndroid: boolean;
  isIOS: boolean;
  constructor() {
    if (isAndroid) {
      this.isAndroid = true;
      this.isIOS = false;
    } else if (isIOS) {
      this.isAndroid = false;
      this.isIOS = true;
    }
  }
}
