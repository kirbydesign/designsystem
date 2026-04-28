import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
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
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { extendValueAccessors } from '@kirbydesign/designsystem/helpers';
import { FormFieldControl } from '@kirbydesign/designsystem/types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'textarea[kirby-textarea]',
  styleUrls: ['./textarea.component.scss'],
  templateUrl: './textarea.component.html',
  providers: [{ provide: FormFieldControl, useExisting: forwardRef(() => TextareaComponent) }],
})
export class TextareaComponent extends FormFieldControl implements OnChanges, OnInit {
  override wrapInLabel = true;
  kirbyChange = new EventEmitter<string>();
  private _hasError: boolean = false;

  getInteractiveElement(): HTMLElement | null {
    return this.elementRef.nativeElement;
  }

  @HostBinding('attr.value')
  @Input()
  value: string;

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

  @HostBinding('attr.maxlength')
  @Input()
  maxlength: number;

  get nativeValue(): string {
    return this.elementRef?.nativeElement?.value;
  }

  @Output() hasErrorChange = new EventEmitter<boolean>();

  constructor(
    private elementRef: ElementRef<HTMLTextAreaElement>,
    @Optional() @Inject(NG_VALUE_ACCESSOR) builtInValueAccessors: ControlValueAccessor[]
  ) {
    super();
    extendValueAccessors<string>(builtInValueAccessors, {
      writeValue: {
        afterWriteValue: (value) => this.kirbyChange.emit(value),
      },
    });
  }

  ngOnInit(): void {
    // The native input value is emitted here to make sure that
    // the InputCounterComponent receives the value onInit,
    // when [(ngModel)] is used on kirby-textarea.
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

  @HostListener('keyup', ['$event.target.value'])
  _onKeyUp(value: string) {
    this.kirbyChange.emit(value);
  }

  @HostListener('paste', ['$event.target'])
  @HostListener('cut', ['$event.target'])
  _onCutPaste(target: HTMLInputElement) {
    //Value of textarea element is updated after cut/paste:
    setTimeout(() => this.kirbyChange.emit(target.value));
  }
}
