import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

import { ToggleChangeEventDetail } from '@ionic/core';

@Component({
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

  onCheckedChange(event: Event): void {
    const customEvent = event as CustomEvent<ToggleChangeEventDetail>;
    this.checked = customEvent.detail.checked;
    this.checkedChange.emit(this.checked);
  }

  _onActive() {
    this._pressed = true;
  }

  _onInactive() {
    this._pressed = false;
  }
}
