import { Component } from '@angular/core';
import { PlatformService } from '@kirbydesign/designsystem/helpers';
import { OutletSelector, PortalOutletConfig } from '@kirbydesign/designsystem/shared/floating';
import ListItemBaseComponent from '../list-item.base.component';

@Component({
  selector: 'kirby-list-item-menu',
  templateUrl: './list-item-menu.component.html',
  styleUrls: ['../../list.component.scss', './list-item-menu.component.scss'],
})
export class ListItemMenuComponent extends ListItemBaseComponent {
  public portalOutletConfig: PortalOutletConfig;

  constructor(_platform: PlatformService) {
    super(_platform);

    this.portalOutletConfig = {
      selector: OutletSelector.id,
      value: 'kirbyListPortalOutletHook',
    };
  }
}
