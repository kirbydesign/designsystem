import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KeyboardHandlerService {
  handle(event: KeyboardEvent, selectedIndex: number, maxIndex: number, cyclicIndex = false) {
    let newIndex = -1;
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        if (selectedIndex === 0 && cyclicIndex) {
          newIndex = maxIndex;
        } else {
          // Select previous item:
          newIndex = selectedIndex - 1;
        }
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        if (selectedIndex === undefined || (selectedIndex === maxIndex && cyclicIndex)) {
          // None selected, select first item:
          newIndex = 0;
        } else if (selectedIndex < maxIndex) {
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
        newIndex = maxIndex;
        break;
      default:
        break;
    }
    return newIndex;
  }
}
