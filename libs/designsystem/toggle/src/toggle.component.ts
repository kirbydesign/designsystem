import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonToggle } from '@ionic/angular/standalone';
import { inheritAriaLabelText, setAccessibleLabel } from '@kirbydesign/designsystem/shared';
import { IonicElementPartHelper } from '@kirbydesign/designsystem/helpers';

@Component({
  imports: [CommonModule, IonToggle],
  selector: 'kirby-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers: [
    IonicElementPartHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleComponent
  implements ControlValueAccessor, OnInit, AfterViewInit, AfterContentInit
{
  @ViewChild(IonToggle, { read: ElementRef, static: true })
  private ionToggleElement?: ElementRef<HTMLIonToggleElement>;

  @Input() checked: boolean = false;

  @Input() disabled: boolean = false;
  @HostBinding('attr.disabled')
  get _isDisabled() {
    return this.disabled ? 'disabled' : null;
  }

  @HostBinding('class.has-hidden-label') _labelText: string;

  @Output() checkedChange = new EventEmitter<boolean>();

  _justify: 'start' | 'end' | 'space-between' = 'start';
  _labelPlacement: 'end' | 'fixed' | 'stacked' | 'start' = 'start';
  _hasSlottedContent: boolean;
  _pressed = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef<HTMLElement>,
    private ionicElementPartHelper: IonicElementPartHelper
  ) {}

  ngOnInit(): void {
    /**
     * We cannot query ion-toggle for slotted content at this point as the slot has not been rendered.
     * But we need to know if content is slotted to set justify and labelPlacement BEFORE ion-toggle is rendered.
     * So it has to be done by querying an additional wrapper around the default content slot like this.
     */
    this._hasSlottedContent = this.elementRef.nativeElement
      .querySelector('.default-content')
      .hasChildNodes();

    const slot = this.elementRef.nativeElement.getAttribute('slot');
    if (slot === 'end' && this._hasSlottedContent) {
      this._justify = 'space-between';
    }

    if (slot === 'start' && this._hasSlottedContent) {
      this._labelPlacement = 'end';
    }
  }

  ngAfterViewInit(): void {
    this.ionicElementPartHelper.setPart('label', this.ionToggleElement, '.toggle-wrapper');
    this.ionicElementPartHelper.setPart(
      'label-text-wrapper',
      this.ionToggleElement,
      '.label-text-wrapper'
    );
  }

  ngAfterContentInit(): void {
    this._labelText = inheritAriaLabelText(this.elementRef.nativeElement);

    if (!this._labelText && !this._hasSlottedContent) {
      // if no label has been set try to find a label in an item and use its text content
      this._labelText = setAccessibleLabel(this.elementRef.nativeElement);
    }
  }

  onCheckedChange(checked: boolean): void {
    this.checked = checked;
    this._onChange(this.checked);
    this.checkedChange.emit(this.checked);
  }

  _onActive() {
    this._pressed = true;
  }

  _onInactive() {
    this._pressed = false;
    this._onTouched();
  }

  // Initialize default ControlValueAccessor callback functions (noop)
  // eslint-disable-next-line no-empty-function
  private _onChange: (value: boolean) => void = () => {};
  // eslint-disable-next-line no-empty-function
  private _onTouched = () => {};

  /**
   * Sets the toggle's value. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   *
   * @param value New value to be written to the model.
   */
  writeValue(value: boolean): void {
    this.checked = value;
  }
  /**
   * Saves a callback function to be invoked when the toggle's value
   * changes from user input. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   *
   * @param fn Callback to be triggered when the value changes.
   */
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  /**
   * Saves a callback function to be invoked when the toggle is blurred
   * by the user. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   *
   * @param fn Callback to be triggered when the component has been touched.
   */
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  /**
   * Disables the toggle. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   *
   * @param isDisabled Sets whether the component is disabled.
   */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.detectChanges();
  }
}
