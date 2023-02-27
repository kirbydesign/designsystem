import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { ModalExperimentalComponent } from '@kirbydesign/designsystem/modal/experimental';
import { OverlayEventDetail } from '@kirbydesign/designsystem/modal';
// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-modal-experimental',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ModalExperimentalComponent,
      useExisting: forwardRef(() => MockModalExperimentalComponent),
    },
  ],
})
export class MockModalExperimentalComponent {
  @Input() open: boolean;
  @Input() canDismiss: boolean | (() => Promise<boolean>);
  @Input() title: string;
  @Input() hasCollapsibleTitle: boolean;
  @Input() scrollDisabled: boolean;
  @Output() willPresent = new EventEmitter<CustomEvent<OverlayEventDetail>>();
  @Output() didPresent = new EventEmitter<CustomEvent<OverlayEventDetail>>();
  @Output() didDismiss = new EventEmitter<CustomEvent<OverlayEventDetail>>();
  @Output() willDismiss = new EventEmitter<CustomEvent<OverlayEventDetail>>();

  scrollToTop() {}
  scrollToBottom() {}
}

// #endregion
