import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  ViewChild,
} from '@angular/core';
import { IonRadio } from '@ionic/angular';
import { IonicElementPartService } from '@kirbydesign/designsystem/helpers';

@Component({
  selector: 'kirby-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [IonicElementPartService],
})
export class RadioComponent implements AfterViewInit {
  @ViewChild(IonRadio, { read: ElementRef, static: true })
  private ionRadioElement?: ElementRef<HTMLIonRadioElement>;

  @Input()
  value: any;

  @HostBinding('class.has-label')
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

  get buttonTabIndex(): number {
    return this.ionRadioElement ? this.ionRadioElement.nativeElement.tabIndex : -1;
  }

  constructor(private ionicElementPartService: IonicElementPartService) {}

  ngAfterViewInit(): void {
    this.ionicElementPartService.setPart('label', this.ionRadioElement, '.radio-wrapper');
    this.ionicElementPartService.setPart(
      'label-text-wrapper',
      this.ionRadioElement,
      '.label-text-wrapper'
    );
  }

  focus() {
    this.ionRadioElement && this.ionRadioElement.nativeElement.focus();
  }
}
