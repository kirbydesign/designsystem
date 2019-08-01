import { InjectionToken } from '@angular/core';

export class ModalConfigHelper {
  static readonly defaultDim = 0.5;
}

export const COMPONENT_PROPS = new InjectionToken<string>('componentProps');
