import { InjectionToken, ClassProvider } from '@angular/core';

export const WINDOW_REF = new InjectionToken<Window>('WindowToken');

export class WindowRef {
  get nativeWindow(): Window {
    return window;
  }
}

export const WINDOW_PROVIDER: ClassProvider = {
  provide: WINDOW_REF,
  useClass: WindowRef,
};
