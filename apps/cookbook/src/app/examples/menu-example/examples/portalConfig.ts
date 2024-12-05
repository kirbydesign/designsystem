import { Component } from '@angular/core';
import { OutletSelector, PortalOutletConfig } from '@kirbydesign/designsystem/shared/floating';

const config = {
  selector: 'cookbook-menu-portal-config-example',
  template: `<kirby-menu [portalOutletConfig]="outletConfig">
  <kirby-item>
    Stone
  </kirby-item>
  <kirby-item>
    Rick
  </kirby-item>
  <kirby-item>
    Gooey
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
})
export class MenuPortalConfigExampleComponent {
  template: string = config.template;

  public outletConfig: PortalOutletConfig = {
    selector: OutletSelector.tag,
    value: 'cookbook-root',
  };
}
