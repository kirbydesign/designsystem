import { Component, Input } from '@angular/core';

import { ThemeColor } from '@kirbydesign/designsystem';
import { DividerComponent } from '@kirbydesign/designsystem/divider';
import { CardComponent } from '@kirbydesign/designsystem/card';

@Component({
  selector: 'cookbook-divider-example',
  templateUrl: './divider-example.component.html',
  imports: [DividerComponent, CardComponent],
})
export class DividerExampleComponent {
  @Input() themeColor: ThemeColor = 'white';
  @Input() hasMargin: boolean = true;
}
