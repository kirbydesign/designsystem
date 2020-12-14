import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'kirby-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
  @HostBinding('class.error')
  @Input()
  hasError: boolean;

  @Input() checked: boolean;
  @Input() disabled: boolean;
  @Input() type: 'single' | 'multi' = 'single';
  @Output() checkedChange = new EventEmitter<boolean>();

  onChecked(checked: boolean): void {
    this.checked = checked;
    this.checkedChange.emit(this.checked);
  }
}
