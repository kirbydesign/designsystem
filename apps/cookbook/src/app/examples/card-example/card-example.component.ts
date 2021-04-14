import { Component, Input } from '@angular/core';

import { DynamicComponent } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-card-example',
  templateUrl: './card-example.component.html',
  styleUrls: ['./card-example.component.scss'],
})
export class CardExampleComponent implements DynamicComponent {
  @Input() title = 'Title';
  @Input() subtitle = 'Subtitle';
  @Input() showSize = true;
  @Input() hasPadding = true;
  @Input() hasHeader = true;
  @Input() hasFooter = false;
  @Input() hasHeaderFooterBgColor = false;
  data: any;
}
