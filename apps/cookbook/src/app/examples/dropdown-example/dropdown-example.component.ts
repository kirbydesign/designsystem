import { Component } from '@angular/core';

@Component({
  selector: 'cookbook-dropdown-example',
  templateUrl: './dropdown-example.component.html',
  styleUrls: ['./dropdown-example.component.scss'],
})
export class DropdownExampleComponent {
  size: string = 'md';

  onSizeChange(size: string) {
    this.size = size;
  }
}
