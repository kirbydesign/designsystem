import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cookbook-dropdown-example-configuration',
  templateUrl: './dropdown-example-configuration.component.html',
  styleUrls: ['./dropdown-example-configuration.component.scss'],
})
export class DropdownExampleConfigurationComponent {
  @Input() size: 'sm' | 'md';
  @Output() sizeChanged = new EventEmitter<string>();
}
