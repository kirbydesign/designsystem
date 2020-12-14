import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'kirby-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
  @Input() checked: boolean;
  @Input() disabled: boolean;
  @Input() error: boolean;
  @Input() type: 'single' | 'multi' = 'single';
  @Output() checkedChange = new EventEmitter<boolean>();

  hasFocus: boolean;

  onChecked(checked: boolean): void {
    this.checked = checked;
    this.checkedChange.emit(this.checked);
  }

  onFocus() {
    this.hasFocus = true;
  }
  onBlur() {
    this.hasFocus = false;
  }
}
