import { Component } from '@angular/core';

import { IconComponent } from '@kirbydesign/designsystem/icon';

@Component({
  selector: 'cookbook-aside',
  template: `
    <kirby-icon name="information-decoration"></kirby-icon>
    <div>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./aside.component.scss'],
  imports: [IconComponent],
})
export class AsideComponent {}
