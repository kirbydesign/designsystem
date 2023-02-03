import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KeyboardHandlerService {
  handle(event: KeyboardEvent, items: any[] | string[], selectedIndex: number) {
    let newIndex = -1;
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        // Select previous item:
        newIndex = selectedIndex - 1;
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        if (selectedIndex === undefined) {
          // None selected, select first item:
          newIndex = 0;
        } else if (selectedIndex < items.length - 1) {
          // Select next item:
          newIndex = selectedIndex + 1;
        }
        break;
      case 'Home':
        // Select first item:
        newIndex = 0;
        break;
      case 'End':
        // Select last item:
        newIndex = items.length - 1;
        break;
      default:
        break;
    }
    return newIndex;
  }
}
