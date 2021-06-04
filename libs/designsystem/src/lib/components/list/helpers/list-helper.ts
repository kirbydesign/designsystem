import { Injectable } from '@angular/core';

import { ListComponent } from '../list.component';
import { LoadOnDemandEventData } from '../list.event';

@Injectable()
export class ListHelper {
  onLoadOnDemand(component: ListComponent, _event: LoadOnDemandEventData) {
    if (component.isLoadOnDemandEnabled && !component._isLoading) {
      component._isLoading = true;
      component.loadOnDemand.emit({
        complete: (disableLoadOnDemand: boolean) => {
          component.isLoadOnDemandEnabled = !disableLoadOnDemand;
          component._isLoading = false;
        },
      });
    }
  }
}
