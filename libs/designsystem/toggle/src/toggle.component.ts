import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { KirbyIonicModule } from '@kirbydesign/designsystem/kirby-ionic-module';

@Component({
  standalone: true,
  imports: [KirbyIonicModule, CommonModule],
  selector: 'kirby-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleComponent {
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;

  @Output() checkedChange = new EventEmitter<boolean>();

  _pressed = false;

  onCheckedChange(checked: boolean): void {
    this.checked = checked;
    this.checkedChange.emit(this.checked);
  }

  _onActive() {
    this._pressed = true;
  }

  _onInactive() {
    this._pressed = false;
  }
}
