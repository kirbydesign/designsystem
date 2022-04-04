import { Component, Input } from '@angular/core';

import { ThemeColor } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-divider-example',
  templateUrl: './divider-example.component.html',
})
export class DividerExampleComponent {
  @Input() themeColor: ThemeColor = 'white';
  @Input() hasMargin: boolean = true;
}
