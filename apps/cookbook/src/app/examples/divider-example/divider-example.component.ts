import { Component, Input } from '@angular/core';

import { ThemeColor } from '@kirbydesign/designsystem';
import { DividerComponent } from '@kirbydesign/angular/divider';
import { CardComponent } from '@kirbydesign/designsystem/card';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';

@Component({
  selector: 'cookbook-divider-example',
  templateUrl: './divider-example.component.html',
  imports: [DividerComponent, CardComponent, ThemeColorDirective],
})
export class DividerExampleComponent {
  @Input() themeColor: ThemeColor = 'white';
  @Input() hasMargin: boolean = true;
}
