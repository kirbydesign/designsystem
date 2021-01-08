import { Component, HostBinding, Input } from '@angular/core';

// Counter for generating unique element ids
let uniqueId = 0;

@Component({
  selector: 'kirby-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent {
  @Input()
  value: any;

  @HostBinding('class.has-label')
  @Input()
  text: string;

  @HostBinding('class.error')
  @Input()
  hasError: boolean = false;

  @Input()
  disabled: boolean;
  @HostBinding('attr.disabled')
  get _isDisabled() {
    return this.disabled ? 'disabled' : null;
  }

  _labelId = `kirby-radio-label-${uniqueId++}`;
}
