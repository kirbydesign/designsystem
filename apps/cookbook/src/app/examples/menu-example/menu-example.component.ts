import { Component } from '@angular/core';
import { MenuSelectableExampleComponent } from './examples/selectable';
import { MenuAdvancedExampleComponent } from './examples/advanced';
import { MenuCustomButtonExampleComponent } from './examples/customButton';
import { MenuPortalExampleComponent } from './examples/portal';
import { MenuPortalConfigExampleComponent } from './examples/portalConfig';
import { MenuScrollExampleComponent } from './examples/scroll';

@Component({
  selector: 'cookbook-action-list-example',
  templateUrl: './menu-example.component.html',
  imports: [
    MenuSelectableExampleComponent,
    MenuAdvancedExampleComponent,
    MenuCustomButtonExampleComponent,
    MenuPortalExampleComponent,
    MenuPortalConfigExampleComponent,
    MenuScrollExampleComponent,
  ],
})
export class MenuExampleComponent {}
