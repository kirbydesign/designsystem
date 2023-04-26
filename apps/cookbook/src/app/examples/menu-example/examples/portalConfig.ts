import { Component } from '@angular/core';
import { OutletSelector, PortalOutletConfig } from '@kirbydesign/designsystem/shared/floating';

const config = {
  selector: 'cookbook-menu-portal-config-example',
  template: `<kirby-menu [portalOutletConfig]="outletConfig" [isDisabled]="true">
  <kirby-item [selectable]="true">
    <h3>Action 1</h3>
  </kirby-item>
  <kirby-item [selectable]="true">
    <h3>Action 2</h3>
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
