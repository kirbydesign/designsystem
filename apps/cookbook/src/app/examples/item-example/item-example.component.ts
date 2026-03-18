import { Component } from '@angular/core';
import { ItemExampleSizesComponent } from './examples/sizes';
import { ItemExampleTextComponent } from './examples/text';
import { ItemExampleTextVerticallyStackedComponent } from './examples/text-vertically-stacked';
import { ItemExampleComplexLabelsComponent } from './examples/complex-labels';
import { ItemExampleSlotsComponent } from './examples/slots';
import { ItemExampleNestedControlsComponent } from './examples/nested-controls';
import { ItemExampleDisabledControlsComponent } from './examples/disabled-controls';
import { ItemExampleSelectableComponent } from './examples/selectable';
import { ItemExampleDisabledComponent } from './examples/disabled';

@Component({
  selector: 'cookbook-item-example',
  templateUrl: './item-example.component.html',
  styleUrls: ['./item-example.component.scss'],
  imports: [
    ItemExampleSizesComponent,
    ItemExampleTextComponent,
    ItemExampleTextVerticallyStackedComponent,
    ItemExampleComplexLabelsComponent,
    ItemExampleSlotsComponent,
    ItemExampleNestedControlsComponent,
    ItemExampleDisabledControlsComponent,
    ItemExampleSelectableComponent,
    ItemExampleDisabledComponent,
  ],
})
export class ItemExampleComponent {}
