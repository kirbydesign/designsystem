import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DateInputDirective } from '../directives/date/date-input.directive';

export enum InputSize {
  medium = 'md',
  large = 'lg',
}

@Component({
  standalone: true,
  imports: [CommonModule],
  hostDirectives: [
    {
      directive: DateInputDirective,
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ['prefillYear', 'useNativeDatePicker'],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'input[kirby-input]',
  styleUrls: ['./input.component.scss'],
  template: '',
})
export class InputComponent implements OnChanges, OnInit {
  constructor(private elementRef: ElementRef<HTMLInputElement>) {}

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

  @HostBinding('class')
  @Input()
  size: InputSize | `${InputSize}` = InputSize.large;

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
