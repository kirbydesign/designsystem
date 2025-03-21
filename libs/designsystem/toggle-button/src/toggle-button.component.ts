import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'kirby-toggle-button',
  templateUrl: './toggle-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleButtonComponent),
      multi: true,
    },
  ],
})
export class ToggleButtonComponent implements ControlValueAccessor {
  @Input() checked: boolean;
  @Output() checkChanged = new EventEmitter<boolean>();

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef
  ) {}

  writeValue(checked: boolean): void {
    if (this.checked !== checked) {
      this.checked = checked;
      this.cdr.markForCheck();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty-function
  private onChange = (_checked: boolean) => {};
  // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
  private onTouched = () => {};

  registerOnChange(fn: (checked: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.elementRef.nativeElement
      .querySelector('button[kirby-button]')
      ?.toggleAttribute('disabled', isDisabled);
  }

  @HostListener('click', ['$event'])
  onClick(event: PointerEvent) {
    const targetElement = event.target as HTMLElement;
    const buttonEnabled = targetElement.closest('button[kirby-button]:not(:disabled)');

    if (!buttonEnabled) return;

    this.checked = !this.checked;
    this.onChange(this.checked);
    this.onTouched();
    this.checkChanged.emit(this.checked);
    this.focusToggledButton();
  }

  focusToggledButton() {
    // force re-render to ensure that the new button is in the dom
    this.cdr.detectChanges();

    const buttonToFocus = this.elementRef.nativeElement.querySelector(
      'button[kirby-button]'
    ) as HTMLButtonElement;

    buttonToFocus?.focus();
  }
}
