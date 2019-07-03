import { BehaviorSubject } from 'rxjs';

import { LoadOnDemandEventData } from '../list.event';
import { ListComponent } from './../list.component';

export class ListHelper {
  selectedOptionItem$ = new BehaviorSubject<SelectedOptionItem>(undefined);

  onLoadOnDemand(component: ListComponent, _event: LoadOnDemandEventData) {
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

  getSelectedItem(items: any[], item: any) {
    return item;
  }

  async getOptionItemId(slidingItem: any, side: string): Promise<string> {
    /*
     * Must cast slidingItem as any to avoid
     * Property 'slidingItem.el' is protected and only accessible within class 'IonItemSliding' and its subclasses.
     */
    const elements = Array.from(
      slidingItem.el.firstElementChild.getElementsByTagName('kirby-list-item-options')
    );
    return new Promise<string>((resolve) => {
      if (elements) {
        elements.forEach(function(element: HTMLElement) {
          const sideValue = element.getAttribute('side');
          // Left side items - start
          if (sideValue === side) {
            resolve(element.firstElementChild.firstElementChild.id);
          }
          // Right side items - end
          if (sideValue === side) {
            resolve(element.firstElementChild.lastElementChild.id);
          }
        });
      } else {
        resolve(undefined);
      }
    });
  }
}

export interface SelectedOptionItem {
  id: string;
  item: any;
}
