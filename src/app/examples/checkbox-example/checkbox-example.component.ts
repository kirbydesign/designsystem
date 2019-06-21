import { Component } from '@angular/core';

@Component({
  selector: 'kirby-checkbox-example',
  templateUrl: './checkbox-example.component.html',
  styleUrls: ['./checkbox-example.component.scss'],
})
export class CheckboxExampleComponent {
  checkedChange(checked: boolean) {
    console.log('Checked:', checked);
  }
}
