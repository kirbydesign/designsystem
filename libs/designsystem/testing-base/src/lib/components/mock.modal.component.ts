import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { Flavor, ModalV2Component, SizeTemp } from '@kirbydesign/designsystem/modal/v2';
import type { OverlayEventDetail } from '@ionic/core/components';
// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-modal-v2',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: ModalV2Component,
      useExisting: forwardRef(() => MockModalV2Component),
    },
  ],
})
export class MockModalV2Component {
  @Input() flavor: Flavor;
  @Input() open: boolean;
  @Input() canDismiss: boolean | (() => Promise<boolean>);
  @Input() title: string;
  @Input() hasCollapsibleTitle: boolean;
  @Input() scrollDisabled: boolean;
  @Input() breakpoints: number[];
  @Input() initialBreakpoint;
  @Input() size: SizeTemp;
  @Input() height: string;
  @Output() willPresent = new EventEmitter<CustomEvent<OverlayEventDetail>>();
  @Output() didPresent = new EventEmitter<CustomEvent<OverlayEventDetail>>();
  @Output() didDismiss = new EventEmitter<CustomEvent<OverlayEventDetail>>();
  @Output() willDismiss = new EventEmitter<CustomEvent<OverlayEventDetail>>();

  scrollToTop() {
    // NOOP
  }
  scrollToBottom() {
    // NOOP
  }
}

// #endregion
