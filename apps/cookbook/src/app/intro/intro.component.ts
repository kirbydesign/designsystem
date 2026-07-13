import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { KirbyPopoverElement } from '@kirbydesign/core/popover';
import { KirbyTooltipElement } from '@kirbydesign/core/tooltip';

import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconComponent } from '@kirbydesign/designsystem/icon';

@Component({
  selector: 'cookbook-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ButtonComponent, IconComponent],
})
export class IntroComponent {
  constructor() {
    KirbyPopoverElement.define();
    KirbyTooltipElement.define();
  }
}
