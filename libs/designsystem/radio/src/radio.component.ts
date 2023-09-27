import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
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
export class RadioComponent implements OnInit {
  @ViewChild(IonRadio, { read: ElementRef, static: true })
  private ionRadioElement?: ElementRef<HTMLIonRadioElement>;

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

  constructor(private ionicElementPartService: IonicElementPartService) {}

  ngOnInit(): void {
    this.setPartOnMultilineLabel();
  }

  focus() {
    this.ionRadioElement && this.ionRadioElement.nativeElement.focus();
  }

  setPartOnMultilineLabel() {
    this.ionicElementPartService.setPart(
      this.ionRadioElement,
      '.radio-wrapper',
      'label',
      (part) => {
        const labelHeight = part.clientHeight;
        const labelLineHeight = parseInt(
          window.getComputedStyle(part).getPropertyValue('line-height')
        );
        const multiLineLabel = labelHeight > labelLineHeight;

        if (multiLineLabel) {
          this.ionRadioElement.nativeElement.classList.add('multiline');
        }

        return multiLineLabel;
      }
    );
  }
}
