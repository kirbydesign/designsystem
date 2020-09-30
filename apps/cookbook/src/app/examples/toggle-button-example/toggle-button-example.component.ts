import { Component } from '@angular/core';

@Component({
  selector: 'cookbook-toggle-button-example',
  templateUrl: './toggle-button-example.component.html',
})
export class ToggleButtonExampleComponent {
  onCheckedChange(checked: boolean) {
    console.log(`Toggle onCheckedChange: ${checked}`);
  }
}
