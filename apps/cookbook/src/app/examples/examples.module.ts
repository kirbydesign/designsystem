import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IconRegistryService, KirbyModule } from '@kirbydesign/designsystem';

import { AccordionExampleModule } from './accordion-example/accordion-example.module';
import { AvatarExampleModule } from './avatar-example/avatar-example.module';
import { CardExampleComponent } from './card-example/card-example.component';
import { ChartExampleModule } from './chart-example/chart-example.module';
import { CheckboxExampleModule } from './checkbox-example/checkbox-example.module';
import { DropdownExampleModule } from './dropdown-example/dropdown-example.module';
import { COMPONENT_DECLARATIONS } from './examples.common';
import { FlagExampleModule } from './flag-example/flag-example.module';
import { FormFieldExamplesModule } from './form-field-example/form-field-example.module';
import { ItemExampleModule } from './item-example/item-example.module';
import { ListExamplesModule } from './list/list-example.module';
import { ModalCompactExampleComponent } from './modal-example/compact-example/modal-compact-example.component';
import { FirstEmbeddedModalExampleComponent } from './modal-example/first-embedded-modal-example/first-embedded-modal-example.component';
import { ModalRoutePage1ExampleComponent } from './modal-example/modal-route-example/modal-route-page1-example.component';
import { ModalRoutePage2ExampleComponent } from './modal-example/modal-route-example/modal-route-page2-example.component';
import { SecondEmbeddedModalExampleComponent } from './modal-example/second-embedded-modal-example/second-embedded-modal-example.component';
import { ProgressCircleExampleModule } from './progress-circle-example/progress-circle-example.module';
import { RadioExampleModule } from './radio-example/radio-example.module';
import { RangeExampleModule } from './range-example/range-example.module';
import { SegmentedControlExampleModule } from './segmented-control-example/segmented-control-example.module';
import { ToggleButtonExampleModule } from './toggle-button-example/toggle-button-example.module';

const IMPORTS = [
  FormFieldExamplesModule,
  ItemExampleModule,
  ListExamplesModule,
  DropdownExampleModule,
  SegmentedControlExampleModule,
  ChartExampleModule,
  ProgressCircleExampleModule,
  AvatarExampleModule,
  FlagExampleModule,
  ToggleButtonExampleModule,
  AccordionExampleModule,
  RadioExampleModule,
  CheckboxExampleModule,
  RangeExampleModule,
];

@NgModule({
  imports: [CommonModule, RouterModule, KirbyModule, ...IMPORTS],
  declarations: COMPONENT_DECLARATIONS,
  exports: [...COMPONENT_DECLARATIONS, ...IMPORTS],
  entryComponents: [
    CardExampleComponent,
    FirstEmbeddedModalExampleComponent,
    SecondEmbeddedModalExampleComponent,
    ModalCompactExampleComponent,
    ModalRoutePage1ExampleComponent,
    ModalRoutePage2ExampleComponent,
  ],
})
export class ExamplesModule {
  constructor(iconRegistryService: IconRegistryService) {
    // Example of "custom" icons:
    iconRegistryService.addIcons([
      {
        name: 'football',
        svg: 'assets/icons/football.svg',
      },
      {
        name: 'umbrella',
        svg: 'assets/icons/umbrella.svg',
      },
    ]);
  }
}
