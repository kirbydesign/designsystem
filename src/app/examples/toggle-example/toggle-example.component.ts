import { Component } from '@angular/core';

@Component({
  selector: 'kirby-toggle-example',
  templateUrl: './toggle-example.component.html',
  styleUrls: ['./toggle-example.component.scss'],
})
export class ToggleExampleComponent {
  onChange(checked: boolean) {
    console.log(`Toggle onChange: ${checked}`);
  }
}
