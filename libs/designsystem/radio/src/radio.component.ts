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
import { inheritAriaLabelText, setAccessibleLabel } from '@kirbydesign/designsystem/shared';

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
    /**
     * We cannot query ion-checkbox for slotted content at this point as the slot has not been rendered.
     * But we need to know if content is slotted to set justify and labelPlacement BEFORE ion-checkbox is rendered.
     * So it has to be done by querying an additional wrapper around the default content slot like this.
     */
    this._hasSlottedContent = this.element.nativeElement
      .querySelector('.default-content')
      .hasChildNodes();

    const slot = this.element.nativeElement.getAttribute('slot');
    if (slot === 'end' && this._hasSlottedContent) {
      this._justify = 'space-between';
      this._labelPlacement = 'start';
    }

    this._labelText = inheritAriaLabelText(this.element.nativeElement);

    if (!this.text && !this._labelText && !this._hasSlottedContent) {
      // if no label has been set try to find a label in an item and use its text content
      this._labelText = setAccessibleLabel(this.element.nativeElement);
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
}
