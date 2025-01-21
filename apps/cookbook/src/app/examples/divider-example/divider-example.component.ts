import { Component, Input } from '@angular/core';

import { ThemeColor } from '@kirbydesign/designsystem';
import { DividerComponent } from '@kirbydesign/designsystem/divider';
import { CardModule } from '@kirbydesign/designsystem/card';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';

@Component({
  selector: 'cookbook-divider-example',
  templateUrl: './divider-example.component.html',
  imports: [DividerComponent, CardModule, ThemeColorDirective],
})
export class DividerExampleComponent {
  @Input() themeColor: ThemeColor = 'white';
  @Input() hasMargin: boolean = true;
}
