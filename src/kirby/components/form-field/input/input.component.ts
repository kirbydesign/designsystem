import {
  ChangeDetectionStrategy,
  Component,
  Input,
  HostBinding,
  HostListener,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  ElementRef,
} from '@angular/core';

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

  private element;
  private previousValue: any;

  kirbyChange = new EventEmitter<string>();

  constructor(private el: ElementRef) {
    this.element = this.el.nativeElement;
  }

  @Input() set type(value: string) {
    const mappedValue = InputComponent.typeToInputmodeMap[value];
    if (mappedValue && !this.inputmode) {
      this.inputmode = mappedValue;
    }
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
  @Input()
  inputmode: string;

  @HostListener('keyup', ['$event.target.value'])
  private _onKeyUp(value: string) {
    let currentValue = value;

    if (currentValue.length > this.maxlength) {
      currentValue = this.previousValue;
      this.element.value = currentValue;
    }

    if (currentValue.length <= this.maxlength) {
      this.previousValue = currentValue;
    }

    this.kirbyChange.emit(currentValue);
  }

  @HostListener('paste', ['$event.target'])
  @HostListener('cut', ['$event.target'])
  private _onCutPaste(target: HTMLInputElement) {
    //Value of input element is updated after cut/paste:
    setTimeout(() => this.kirbyChange.emit(target.value));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value) {
      this.kirbyChange.emit(changes.value.currentValue);
    }
  }
}
