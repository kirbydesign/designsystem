import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { IonRadio } from '@ionic/angular';
import { DesignTokenHelper } from '@kirbydesign/core';

@Component({
  selector: 'kirby-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  /**
   *
   */
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.setRadioWrapperPart();
  }

  focus() {
    this.ionRadioElement && this.ionRadioElement.nativeElement.focus();
  }

  private setRadioWrapperPart() {
    // Ensure ion-radio custom element has been defined (primarily when testing, but doesn't hurt):
    customElements.whenDefined(this.ionRadioElement.nativeElement.localName).then(() => {
      this.ionRadioElement.nativeElement.componentOnReady().then((radio) => {
        const radioWrapper: HTMLElement = radio.shadowRoot.querySelector('.radio-wrapper');
        if (
          radioWrapper &&
          radioWrapper.offsetHeight > parseInt(DesignTokenHelper.lineHeight('n'))
        ) {
          this.renderer.addClass(radio, 'multiline');
          this.renderer.setAttribute(radioWrapper, 'part', 'radio-wrapper');
        }
      });
    });
  }
}
