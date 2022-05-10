import { ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import {
  ModalAdvertiserAction,
  ModalAdvertiserElementEntry,
  ModalAdvertiserElementType,
  ModalAdvertiserObservableSet,
} from './modal-elements-advertiser.types';

export class ModalElementsAdvertiser {
  private modalElementEntrySubject: Subject<ModalAdvertiserElementEntry> =
    new Subject<ModalAdvertiserElementEntry>();

  public footer: ModalAdvertiserObservableSet;
  public pageProgress: ModalAdvertiserObservableSet;
  public title: ModalAdvertiserObservableSet;

  constructor() {
    this.footer = this.createModalElementObservableSet('footer');
    this.pageProgress = this.createModalElementObservableSet('pageProgress');
    this.title = this.createModalElementObservableSet('title');
  }

  public registerElement(
    elementType: ModalAdvertiserElementType,
    elementRef: ElementRef<HTMLElement>
  ) {
    this.modalElementEntrySubject.next({ type: elementType, action: 'register', elementRef });
  }

  public deregisterElement(
    elementType: ModalAdvertiserElementType,
    elementRef: ElementRef<HTMLElement>
  ) {
    this.modalElementEntrySubject.next({ type: elementType, action: 'deregister', elementRef });
  }

  private createModalElementObservableSet(
    elementType: ModalAdvertiserElementType
  ): ModalAdvertiserObservableSet {
    /* 
      Sets up 3 observables for the given element type: 
      - added$: activated whenever element of elementType is added 
      - removed$: activated whenever element of elementType is removed
      - anyAction$: activated on any action for elementType // TODO: might not be necessary
    */
    const anyAction$ = this.modalElementEntrySubject.pipe(
      filter(({ type }) => elementType === type),
      map(({ action, elementRef }) => ({ action, elementRef }))
    );

    const actions: ModalAdvertiserAction[] = ['register', 'deregister'];
    const [added$, removed$] = actions.map((action) =>
      anyAction$.pipe(
        filter((modalElementEntry) => action === modalElementEntry.action),
        map(({ elementRef }) => elementRef)
      )
    );

    return { added$, removed$, anyAction$ };
  }
}
