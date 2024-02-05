import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';
import { MenuDefaultExampleComponent } from './examples/default';
import { MenuAdvancedExampleComponent } from './examples/advanced';
import { MenuSelectableExampleComponent } from './examples/selectable';
import { PortalInListWrapperComponent as MenuPortalInListWrapperComponent } from './examples/portal-in-list-wrapper';
import { MenuCustomButtonExampleComponent } from '~/app/examples/menu-example/examples/customButton';
import { MenuPortalExampleComponent } from '~/app/examples/menu-example/examples/portal';
import { MenuCustomPlacementExampleComponent } from '~/app/examples/menu-example/examples/customPlacement';
import { MenuPortalConfigExampleComponent } from '~/app/examples/menu-example/examples/portalConfig';

const COMPONENT_DECLARATIONS = [
  MenuPortalInListWrapperComponent,
  MenuDefaultExampleComponent,
  MenuAdvancedExampleComponent,
  MenuSelectableExampleComponent,
  MenuCustomButtonExampleComponent,
  MenuPortalExampleComponent,
  MenuPortalConfigExampleComponent,
  MenuCustomPlacementExampleComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class MenuExampleModule {}
