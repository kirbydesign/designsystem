import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
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

import { IonicElementPartHelper } from '@kirbydesign/designsystem/helpers';
import { IonCheckbox } from '@ionic/angular/standalone';

@Component({
  standalone: true,
  imports: [CommonModule, IonCheckbox],
  selector: 'kirby-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    IonicElementPartHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements AfterViewInit, ControlValueAccessor, OnInit {
  @ViewChild(IonCheckbox, { read: ElementRef, static: true })
  private ionCheckboxElement?: ElementRef<HTMLIonCheckboxElement>;

  @Input() checked: boolean = false;
  @Input() attentionLevel: '1' | '2' = '2';

  @Input()
  text: string;

  @HostBinding('class')
  @Input()
  size: 'xs' | 'sm' | 'md' = 'md';

  @HostBinding('class.error')
  @Input()
  hasError: boolean = false;

  @Input() disabled = false;
  @HostBinding('attr.disabled')
  get _isDisabled() {
    return this.disabled ? 'disabled' : null;
  }

  @HostBinding('class.attention-level1') get isAttentionLevel1() {
    return this.attentionLevel === '1';
  }
  @HostBinding('class.attention-level2') get isAttentionLevel2() {
    return this.attentionLevel === '2';
  }

  @HostBinding('class.has-hidden-label') _labelText: string;

  @Output() checkedChange = new EventEmitter<boolean>();

  _justify: 'start' | 'end' | 'space-between' = 'start';
  _labelPlacement: 'end' | 'fixed' | 'stacked' | 'start' = 'end';
  _hasSlottedContent: boolean;

  constructor(
    private element: ElementRef<HTMLElement>,
    private ionicElementPartHelper: IonicElementPartHelper
  ) {}

  ngOnInit(): void {
    this._hasSlottedContent = this.element.nativeElement
      .querySelector('.default-content')
      .hasChildNodes();

    const slot = this.element.nativeElement.getAttribute('slot');
    if (slot === 'end' && this._hasSlottedContent) {
      this._justify = 'space-between';
      this._labelPlacement = 'start';
    }

    this.inheritAriaLabelText();

    if (this.text || this._labelText || this._hasSlottedContent) return;

    const label = this.findItemLabel(this.element.nativeElement);
    if (label) {
      this._labelText = label.textContent;
      label.setAttribute('aria-hidden', 'true');
    }
  }

  ngAfterViewInit(): void {
    this.ionicElementPartHelper.setPart('label', this.ionCheckboxElement, '.checkbox-wrapper');
    this.ionicElementPartHelper.setPart(
      'label-text-wrapper',
      this.ionCheckboxElement,
      '.label-text-wrapper'
    );
    this.ionicElementPartHelper.setPart(
      'native-wrapper',
      this.ionCheckboxElement,
      '.native-wrapper'
    );
  }

  onChecked(checked: boolean): void {
    this.checked = checked;
    this._onChange(this.checked);
    this.checkedChange.emit(this.checked);
  }

  onBlur() {
    this._onTouched();
  }

  private findItemLabel(element: HTMLElement): HTMLIonLabelElement {
    const itemEl = element.closest('kirby-item');
    if (itemEl) {
      return itemEl.querySelector('kirby-label');
    }

    return null;
  }

  private inheritAriaLabelText() {
    const el = this.element.nativeElement;
    const attribute = 'aria-label';
    if (el.hasAttribute(attribute)) {
      const value = el.getAttribute(attribute);
      el.removeAttribute(attribute);
      this._labelText = value;
    }
  }

  // Initialize default ControlValueAccessor callback functions (noop)
  // eslint-disable-next-line no-empty-function
  private _onChange: (value: boolean) => void = () => {};
  // eslint-disable-next-line no-empty-function
  private _onTouched = () => {};

  /**
   * Sets the checkbox's value. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   *
   * @param value New value to be written to the model.
   */
  writeValue(value: boolean): void {
    this.checked = value;
  }

  /**
   * Saves a callback function to be invoked when the checkbox's value
   * changes from user input. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   *
   * @param fn Callback to be triggered when the value changes.
   */
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  /**
   * Saves a callback function to be invoked when the checkbox is blurred
   * by the user. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   *
   * @param fn Callback to be triggered when the component has been touched.
   */
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  /**
   * Disables the checkbox. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   *
   * @param isDisabled Sets whether the component is disabled.
   */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
