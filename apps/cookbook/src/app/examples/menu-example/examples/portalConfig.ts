import { Component } from '@angular/core';
import { OutletSelector, PortalOutletConfig } from '@kirbydesign/designsystem/shared/floating';
import { MenuComponent } from '@kirbydesign/designsystem/menu';
import { ItemModule } from '@kirbydesign/designsystem/item';

const config = {
  selector: 'cookbook-menu-portal-config-example',
  template: `<kirby-menu [portalOutletConfig]="outletConfig">
  <kirby-item>
    <p class="kirby-item-title">Stone</p>
  </kirby-item>
  <kirby-item>
    <p class="kirby-item-title">Rick</p>
  </kirby-item>
  <kirby-item>
    <p class="kirby-item-title">Gooey</p>
  </kirby-item>
</kirby-menu>`,
  codeSnippet: `public outletConfig: PortalOutletConfig = {
    selector: OutletSelector.tag,
    value: 'cookbook-root',
  };`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [MenuComponent, ItemModule],
})
export class MenuPortalConfigExampleComponent {
  template: string = config.template;

  public outletConfig: PortalOutletConfig = {
    selector: OutletSelector.tag,
    value: 'cookbook-root',
  };
}
