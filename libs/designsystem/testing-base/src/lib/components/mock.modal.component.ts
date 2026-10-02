import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core/components';

import {
  DrawerSupplementaryAction,
  ModalComponent,
  ModalFlavor,
  ModalSize,
  ShowAlertCallback,
} from '@kirbydesign/designsystem/modal';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-modal',
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
  providers: [
    {
      provide: ModalComponent,
      useExisting: forwardRef(() => MockModalComponent),
    },
  ],
})
export class MockModalComponent {
  @Input() isOpen: boolean;
  @Input() trigger: string;
  @Input() size: ModalSize;
  @Input() scrollDisabled: boolean;
  @Input() canDismiss: ShowAlertCallback | boolean;
  @Input() collapseTitle: boolean;
  @Input() customHeight: string;
  @Input() flavor: ModalFlavor;
  @Input() drawerSupplementaryAction?: DrawerSupplementaryAction;
  @Input() interactWithBackground: boolean;
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
