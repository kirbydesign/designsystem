import { Component } from '@angular/core';

@Component({
  templateUrl: './action-sheet.component.html',
  styleUrls: ['./action-sheet.component.scss'],
})
export class ActionSheetComponent {
  items: string[] = ['Vis spørgsmål og svar', 'Ring os op'];
  constructor() {}

  onItemSelect(e: any) {
    console.log(`item selected: ${e}`);
  }
}
