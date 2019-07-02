import { IonItemSliding } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ListItemOptionHelper {
  selectedOptionItem$ = new BehaviorSubject<SelectedOptionItem>(undefined);

  public async getOptionItemId(slidingItem: IonItemSliding, side: string): Promise<string> {
    const elements = Array.from(
      slidingItem.el.firstElementChild.getElementsByTagName('kirby-list-item-options')
    );
    return new Promise<string>((resolve) => {
      if (elements) {
        elements.forEach(function(element) {
          const sideValue = element.getAttributeNode('side').value;
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
