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
import { ExamplesSharedModule } from './examples.shared.module';
import { FlagExampleModule } from './flag-example/flag-example.module';
import { FormFieldExamplesModule } from './form-field-example/form-field-example.module';
import { ItemExampleModule } from './item-example/item-example.module';
import { LinkExampleModule } from './link-example/link-example.module';
import { ListExamplesModule } from './list-example/list-example.module';
import { ListVirtualScrollExamplesModule } from './list-virtual-scroll-example/list-virtual-scroll-example.module';
import { ModalExampleModule } from './modal-example/modal-example.module';
import { ProgressCircleExampleModule } from './progress-circle-example/progress-circle-example.module';
import { RadioExampleModule } from './radio-example/radio-example.module';
import { RangeExampleModule } from './range-example/range-example.module';
import { SegmentedControlExampleModule } from './segmented-control-example/segmented-control-example.module';
import { ToggleButtonExampleModule } from './toggle-button-example/toggle-button-example.module';

const IMPORTS = [
  ExamplesSharedModule,
  FormFieldExamplesModule,
  ItemExampleModule,
  ListExamplesModule,
  ListVirtualScrollExamplesModule,
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
  LinkExampleModule,
  ModalExampleModule,
];

@NgModule({
  imports: [CommonModule, RouterModule, KirbyModule, ...IMPORTS],
  declarations: COMPONENT_DECLARATIONS,
  exports: [...COMPONENT_DECLARATIONS, ...IMPORTS],
  entryComponents: [CardExampleComponent],
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
