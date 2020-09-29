import { Component } from '@angular/core';

@Component({
  selector: 'cookbook-toggle-button-example',
  templateUrl: './toggle-button-example.component.html',
  styleUrls: ['./toggle-button-example.component.scss'],
})
export class ToggleButtonExampleComponent {
  onCheckedChange(checked: boolean) {
    console.log(`Toggle onCheckedChange: ${checked}`);
  }
}
