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

  @HostBinding('class.error')
  @Input()
  hasError: boolean;

  @HostBinding('attr.inputmode')
  private _inputmode: string;
}
