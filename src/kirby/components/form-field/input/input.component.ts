import {
  ChangeDetectionStrategy,
  Component,
  Input,
  HostBinding,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:component-selector
  selector: 'input[kirby-input]',
  styleUrls: ['./input.component.scss'],
  template: '',
})
export class InputComponent {
  @Output() change = new EventEmitter<string>();

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

  @HostBinding('attr.autocomplete')
  @Input()
  autocomplete: 'on' | 'off' = 'off';

  @HostBinding('attr.autocorrect')
  @Input()
  autocorrect: 'on' | 'off' = 'off';

  @HostBinding('attr.value')
  @Input()
  value: string;

  @HostBinding('attr.maxlength')
  @Input()
  maxlength: number;

  @HostBinding('attr.inputmode')
  private _inputmode: string;

  @HostListener('keyup', ['$event.target.value'])
  private _onKeyUp(value: string) {
    this.change.emit(value);
  }

  @HostListener('paste', ['$event.target'])
  @HostListener('cut', ['$event.target'])
  private _onCutPaste(target: HTMLInputElement) {
    //Value of input element is updated after cut/paste:
    setTimeout(() => this.change.emit(target.value));
  }
}
