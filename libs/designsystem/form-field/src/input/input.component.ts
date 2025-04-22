import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormFieldControl } from '@kirbydesign/designsystem/types';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateInputDirective } from '../directives/date/date-input.directive';

export enum InputSize {
  medium = 'md',
  large = 'lg',
}

@Component({
  imports: [CommonModule],
  hostDirectives: [
    {
      directive: DateInputDirective,
      inputs: ['prefillYear', 'useNativeDatePicker'],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'input[kirby-input]',
  styleUrls: ['./input.component.scss'],
  template: '',
})
export class InputComponent implements OnChanges, OnInit, FormFieldControl {
  kirbyChange = new EventEmitter<string>();
  private _hasError: boolean = false;

  @Input() set type(value: string) {
    const mappedValue = InputComponent.typeToInputmodeMap[value];
    if (mappedValue && !this.inputmode) {
      this.inputmode = mappedValue;
    }
  }

  @HostBinding('class')
  @Input()
  size: InputSize | `${InputSize}` = InputSize.large;

  /**
   * Removes padding, width, rounded borders and drop-shadow when set to `true`.
   */
  @HostBinding('class.borderless')
  @Input()
  borderless: boolean;

  @HostBinding('attr.aria-invalid')
  @HostBinding('class.error')
  @Input()
  get hasError(): boolean {
    return this._hasError;
  }

  set hasError(value: boolean) {
    if (this._hasError !== value) {
      this._hasError = value;
      this.hasErrorChange.emit(this._hasError);
    }
  }

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

  @Output() hasErrorChange = new EventEmitter<boolean>();

  constructor(
    private elementRef: ElementRef<HTMLInputElement>,
    @Optional() @Inject(NG_VALUE_ACCESSOR) private builtInValueAccessors: ControlValueAccessor[]
  ) {
    this.extendBuiltinValueAccessor();
  }

  ngOnInit(): void {
    // The native input value is emitted here to make sure that
    // the InputCounterComponent receives the value onInit,
    // when [(ngModel)] is used on kirby-input.
    setTimeout(() => {
      const inputValue = this.elementRef.nativeElement.value;
      if (inputValue) {
        this.kirbyChange.emit(inputValue);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value) {
      this.kirbyChange.emit(changes.value.currentValue);
    }
  }

  extendBuiltinValueAccessor() {
    if (this.builtInValueAccessors) {
      this.builtInValueAccessors.forEach((accessor) => {
        const originalWriteValue = accessor.writeValue?.bind(accessor);
        accessor.writeValue = (value: any) => {
          if (originalWriteValue) {
            originalWriteValue(value);
          }
          this.kirbyChange.emit(value);
        };
      });
    }
  }

  private static typeToInputmodeMap = {
    number: 'decimal',
    search: 'search',
  };

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
}
