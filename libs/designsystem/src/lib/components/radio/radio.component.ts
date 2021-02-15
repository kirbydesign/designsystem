import { Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { IonRadio } from '@ionic/angular';

import { UniqueIdGenerator } from '../../helpers/unique-id-generator.helper';

@Component({
  selector: 'kirby-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent {
  @Input()
  value: any;

  @HostBinding('class.has-label')
  @Input()
  text: string;

  @HostBinding('class')
  @Input()
  size?: 'xs' | 'sm' | 'md';

  @Input()
  disabled: boolean;
  @HostBinding('attr.disabled')
  get _isDisabled() {
    return this.disabled ? 'disabled' : null;
  }

  get buttonTabIndex(): number {
    return this.ionRadioElement ? this.ionRadioElement.nativeElement.tabIndex : -1;
  }

  focus() {
    this.ionRadioElement && this.ionRadioElement.nativeElement.focus();
  }

  private idGenerator = UniqueIdGenerator.scopedTo('kirby-radio-label');
  _labelId = this.idGenerator.next();

  @ViewChild(IonRadio, { read: ElementRef, static: true }) private ionRadioElement?: ElementRef<
    HTMLIonRadioElement
  >;
}
