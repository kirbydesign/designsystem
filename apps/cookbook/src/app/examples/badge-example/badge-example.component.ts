import { Component } from '@angular/core';
import { CardModule } from '@kirbydesign/designsystem/card';
import { BadgeExampleNumberComponent } from './examples/badge-example-number.component';
import { BadgeExampleTextComponent } from './examples/badge-example-text.component';
import { BadgeExampleIconComponent } from './examples/badge-example-icon.component';
import { BadgeExampleSmallComponent } from './examples/badge-example-small.component';

@Component({
  selector: 'cookbook-badge-example',
  templateUrl: './badge-example.component.html',
  styleUrls: ['./badge-example.component.scss'],
  imports: [
    CardModule,
    BadgeExampleNumberComponent,
    BadgeExampleTextComponent,
    BadgeExampleIconComponent,
    BadgeExampleSmallComponent,
  ],
})
export class BadgeExampleComponent {}
