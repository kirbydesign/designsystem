import { Directive, ElementRef, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { Placement, Strategy } from '@floating-ui/dom';

import {
  FloatingDirective,
  FloatingOffset,
  PortalOutletConfig,
  TriggerEvent,
} from '@kirbydesign/designsystem/shared/floating';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Directive({
  selector: '[kirbyFloating]',
  providers: [
    {
      provide: FloatingDirective,
      useExisting: forwardRef(() => MockFloatingDirective),
    },
  ],
})
export class MockFloatingDirective {
  @Input() reference: ElementRef<HTMLElement> | undefined;
  @Input() placement: Placement;
  @Input() strategy: Strategy;
  @Input() triggers: Array<TriggerEvent>;
  @Input() DOMPortalOutlet: HTMLElement | undefined;
  @Input() portalOutletConfig: PortalOutletConfig | undefined;
  @Input() isDisabled: boolean;
  @Input() offset: FloatingOffset;
  @Input() shift: boolean;
  @Input() autoPlacement: boolean;
  @Input() closeOnSelect: boolean;
  @Input() closeOnEscapeKey: boolean;
  @Input() closeOnBackdrop: boolean;
  @Output() displayChanged = new EventEmitter<boolean>();

  onEscapeKeyPressed() {
    // NOOP
  }
  show() {
    // NOOP
  }
  hide() {
    // NOOP
  }
  toggleShow() {
    // NOOP
  }
}

// #endregion
