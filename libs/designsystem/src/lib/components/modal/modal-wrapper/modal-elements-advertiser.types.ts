import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

export type ModalAdvertiserElementType = 'footer' | 'pageProgress' | 'title';
export type ModalAdvertiserAction = 'register' | 'deregister';

export type ModalAdvertiserElementEntry = {
  type: ModalAdvertiserElementType;
  action: ModalAdvertiserAction;
  elementRef: ElementRef<HTMLElement>;
};

export type ModalAdvertiserObservableSet = {
  anyAction$: Observable<{
    action: ModalAdvertiserAction;
    elementRef: ElementRef<HTMLElement>;
  }>;
  added$: Observable<ElementRef<HTMLElement>>;
  removed$: Observable<ElementRef<HTMLElement>>;
};
