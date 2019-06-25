import { Component } from '@angular/core';

@Component({
  selector: 'kirby-toggle-example',
  templateUrl: './toggle-example.component.html',
  styleUrls: ['./toggle-example.component.scss'],
})
export class ToggleExampleComponent {
  onCheckedChange(checked: boolean) {
    console.log(`Toggle onCheckedChange: ${checked}`);
  }
}
