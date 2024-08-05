import { Component, forwardRef, Input } from '@angular/core';
import { Placement } from '@floating-ui/dom';

import { MenuComponent } from '@kirbydesign/designsystem/menu';
import { AttentionLevel, ButtonSize } from '@kirbydesign/designsystem/button';
import { PortalOutletConfig, TriggerEvent } from '@kirbydesign/designsystem/shared/floating';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-menu',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: MenuComponent,
      useExisting: forwardRef(() => MockMenuComponent),
    },
  ],
})
export class MockMenuComponent {
  @Input() isDisabled: boolean;
  @Input() buttonSize: ButtonSize;
  @Input() placement: Placement;
  @Input() attentionLevel: AttentionLevel;
  @Input() triggers: Array<TriggerEvent>;
  @Input() DOMPortalOutlet: HTMLElement | undefined;
  @Input() portalOutletConfig: PortalOutletConfig | undefined;
  @Input() autoPlacement: boolean;
  @Input() closeOnSelect: boolean;
  @Input() closeOnEscapeKey: boolean;
  @Input() closeOnBackdrop: boolean;
  @Input() minWidth: number;
}

// #endregion
