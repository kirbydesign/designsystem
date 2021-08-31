import { Injectable } from '@angular/core';

import { WindowRef } from '../types/window-ref';

import { DesignTokenHelper } from './design-token-helper';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  constructor(private windowRef: WindowRef) {}

  isTouch() {
    const isTouchDeviceQuery = '(pointer: coarse)'; // No check for `hover: none`, as Samsung Galaxy will return false on `hover: none` media query
    return this.windowRef.nativeWindow.matchMedia(isTouchDeviceQuery).matches;
  }

  isPhabletOrBigger() {
    const query = `(min-width: ${DesignTokenHelper.breakpoints.medium})`;
    return this.windowRef.nativeWindow.matchMedia(query).matches;
  }
}
