import { Component } from '@angular/core';
import { ItemExampleSizesComponent } from './examples/sizes';
import { ItemExampleTextComponent } from './examples/text';
import { ItemExampleTextVerticallyStackedComponent } from './examples/text-vertically-stacked';
import { ItemExampleSlotsComponent } from './examples/slots';
import { ItemExampleNestedControlsComponent } from './examples/nested-controls';
import { ItemExampleDisclosureComponent } from './examples/disclosure';

@Component({
  selector: 'cookbook-item-example',
  templateUrl: './item-example.component.html',
  styleUrls: ['./item-example.component.scss'],
  imports: [
    ItemExampleSizesComponent,
    ItemExampleTextComponent,
    ItemExampleTextVerticallyStackedComponent,
    ItemExampleSlotsComponent,
    ItemExampleNestedControlsComponent,
    ItemExampleDisclosureComponent,
  ],
})
export class ItemExampleComponent {}
