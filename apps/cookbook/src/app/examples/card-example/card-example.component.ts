import { Component } from '@angular/core';
import { CardExampleVariantComponent } from './examples/variant';
import { CardExampleFlagComponent } from './examples/flag';
import { CardExampleColorComponent } from './examples/color';
import { CardExampleBackgroundImageComponent } from './examples/background-image';
import { CardExampleDisclosureComponent } from './examples/disclosure';

@Component({
  selector: 'cookbook-card-example',
  templateUrl: './card-example.component.html',
  styleUrls: ['./card-example.component.scss'],
  imports: [
    CardExampleVariantComponent,
    CardExampleFlagComponent,
    CardExampleColorComponent,
    CardExampleBackgroundImageComponent,
    CardExampleDisclosureComponent,
  ],
})
export class CardExampleComponent {}
