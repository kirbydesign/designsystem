import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'kirby-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent {
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
  @Output() checkedChange = new EventEmitter<boolean>();
  onCheckedChange(checked: boolean): void {
    this.checked = checked;
    this.checkedChange.emit(this.checked);
  }
}
