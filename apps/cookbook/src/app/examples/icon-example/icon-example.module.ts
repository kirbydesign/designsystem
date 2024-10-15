import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule, IconRegistryService } from '@kirbydesign/designsystem';

import { IconExampleComponent } from './icon-example.component';
import { IconDefaultExampleComponent } from './examples/default';
import { IconCustomExampleComponent } from './examples/custom';
import { IconSizesExampleComponent } from './examples/sizes';

const COMPONENT_DECLARATIONS = [
  IconExampleComponent,
  IconDefaultExampleComponent,
  IconCustomExampleComponent,
  IconSizesExampleComponent,
];

@NgModule({
  declarations: COMPONENT_DECLARATIONS,
  imports: [CommonModule, IconModule],
  exports: COMPONENT_DECLARATIONS,
})
export class IconExampleModule {
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
