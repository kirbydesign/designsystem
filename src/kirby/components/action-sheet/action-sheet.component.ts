import { Component } from '@angular/core';

@Component({
  templateUrl: './action-sheet.component.html',
  styleUrls: ['./action-sheet.component.scss'],
})
export class ActionSheetComponent {
  items: string[] = ['Option 1', 'Option 2', 'Option 3'];
  constructor() {}

  onItemSelect(e: any) {
    console.log(`item selected: ${e}`);
  }
}
