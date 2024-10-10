import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IonRadio } from '@ionic/angular/standalone';
import { IonicElementPartHelper } from '@kirbydesign/designsystem/helpers';

@Component({
  selector: 'kirby-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [IonicElementPartHelper],
})
export class RadioComponent implements AfterViewInit, OnInit {
  @ViewChild(IonRadio, { read: ElementRef, static: true })
  private ionRadioElement?: ElementRef<HTMLIonRadioElement>;

  @Input()
  value: any;

  @Input()
  text: string;

  @HostBinding('class')
  @Input()
  size: 'xs' | 'sm' | 'md' = 'md';

  @Input()
  disabled: boolean;
  @HostBinding('attr.disabled')
  get _isDisabled() {
    return this.disabled ? 'disabled' : null;
  }

  @HostBinding('class.has-hidden-label') _labelText: string;

  get buttonTabIndex(): number {
    return this.ionRadioElement ? this.ionRadioElement.nativeElement.tabIndex : -1;
  }

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
    this.ionicElementPartHelper.setPart('label', this.ionRadioElement, '.radio-wrapper');
    this.ionicElementPartHelper.setPart(
      'label-text-wrapper',
      this.ionRadioElement,
      '.label-text-wrapper'
    );
    this.ionicElementPartHelper.setPart('native-wrapper', this.ionRadioElement, '.native-wrapper');
  }

  focus() {
    this.ionRadioElement && this.ionRadioElement.nativeElement.focus();
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

  private findItemLabel(element: HTMLElement): HTMLIonLabelElement {
    const itemEl = element.closest('kirby-item');
    if (itemEl) {
      return itemEl.querySelector('kirby-label');
    }

    return null;
  }
}
