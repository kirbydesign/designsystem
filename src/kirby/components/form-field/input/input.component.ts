import { ChangeDetectionStrategy, Component, Input, HostBinding } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:component-selector
  selector: 'input[kirby-input]',
  styleUrls: ['./input.component.scss'],
  template: '',
})
export class InputComponent {
  private static typeToInputmodeMap = {
    number: 'decimal',
    search: 'search',
  };
  @Input() set type(value: string) {
    this._inputmode = InputComponent.typeToInputmodeMap[value];
  }
  @HostBinding('attr.inputmode')
  _inputmode: string;

  @HostBinding('class.state-success')
  _isSuccess: boolean;
  @HostBinding('class.state-warning')
  _isWarning: boolean;
  @HostBinding('class.state-danger')
  _isDanger: boolean;
  @Input() set state(state: 'success' | 'warning' | 'danger') {
    this._isSuccess = state === 'success';
    this._isWarning = state === 'warning';
    this._isDanger = state === 'danger';
  }
}
