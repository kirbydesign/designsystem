import { LoadOnDemandEventData } from '../list.event';

import { ListComponent } from './../list.component';

export class ListHelper {
  onLoadOnDemand(component: ListComponent, _args: LoadOnDemandEventData): void {
    if (component.isLoadOnDemandEnabled && !component.isLoading) {
      component.isLoading = true;
      component.loadOnDemand.emit({
        complete: (disableLoadOnDamand: boolean) => {
          component.isLoadOnDemandEnabled = !disableLoadOnDamand;
          component.isLoading = false;
        },
      });
    }
  }
}
