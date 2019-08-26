import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-toolbar-example',
  templateUrl: './toolbar-example.component.html',
  styleUrls: ['./toolbar-example.component.scss'],
})
export class ToolbarExampleComponent {
  onBackButtonSelect(): void {
    alert('backbutton clicked!');
  }

  onPrimarySelect(): void {
    alert('primary clicked!');
  }

  onSecondarySelect(): void {
    alert('secondary clicked!');
  }
}
