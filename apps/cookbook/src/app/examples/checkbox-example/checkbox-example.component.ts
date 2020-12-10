import { Component } from '@angular/core';

@Component({
  selector: 'cookbook-checkbox-example',
  templateUrl: './checkbox-example.component.html',
})
export class CheckboxExampleComponent {
  checkedChange(checked: boolean) {
    console.log('Checked:', checked);
  }
}
