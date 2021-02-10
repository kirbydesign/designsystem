import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

enum InputSize {
  medium = 'md',
  large = 'lg',
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:component-selector
  selector: 'input[kirby-input]',
  styleUrls: ['./input.component.scss'],
  template: '',
})
export class InputComponent implements OnChanges {
  private static typeToInputmodeMap = {
    number: 'decimal',
    search: 'search',
  };

  kirbyChange = new EventEmitter<string>();

  @Input() set type(value: string) {
    const mappedValue = InputComponent.typeToInputmodeMap[value];
    if (mappedValue && !this.inputmode) {
      this.inputmode = mappedValue;
    }
  }

  @Input() size: InputSize = InputSize.large;

  @HostBinding('class')
  get _cssClass() {
    return [this.size];
  }

  /**
   * Removes padding, width, rounded borders and drop-shadow when set to `true`.
   */
  @HostBinding('class.borderless')
  @Input()
  borderless: boolean;

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
  @Input()
  inputmode: string;

  @HostListener('keyup', ['$event.target.value'])
  _onKeyUp(value: string) {
    this.kirbyChange.emit(value);
  }

  @HostListener('paste', ['$event.target'])
  @HostListener('cut', ['$event.target'])
  _onCutPaste(target: HTMLInputElement) {
    //Value of input element is updated after cut/paste:
    setTimeout(() => this.kirbyChange.emit(target.value));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value) {
      this.kirbyChange.emit(changes.value.currentValue);
    }
  }
}
