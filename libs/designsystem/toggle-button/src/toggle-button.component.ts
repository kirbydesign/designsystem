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

  @HostListener('focusout')
  onFocusOut() {
    this.onTouched();
  }

  focusToggledButton() {
    // force re-render to ensure that the new button is in the dom
    this.cdr.detectChanges();

    const buttonToFocus = this.elementRef.nativeElement.querySelector(
      'button[kirby-button]'
    ) as HTMLButtonElement;

    buttonToFocus?.focus();
  }

  /**
   * Sets the toggle button's value. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   *
   * @param checked New value to be written to the model.
   */
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

  /**
   * Saves a callback function to be invoked when the toggle button's value
   * changes from user input. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   *
   * @param fn Callback to be triggered when the value changes.
   */
  registerOnChange(fn: (checked: boolean) => void): void {
    this.onChange = fn;
  }

  /**
   * Saves a callback function to be invoked when the toggle button is blurred
   * by the user. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   *
   * @param fn Callback to be triggered when the component has been touched.
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Disables the toggle button. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   *
   * @param isDisabled Sets whether the component is disabled.
   */
  setDisabledState(isDisabled: boolean): void {
    this.elementRef.nativeElement
      .querySelector('button[kirby-button]')
      ?.toggleAttribute('disabled', isDisabled);
  }
}
