import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { IonFabButton, IonRadio } from '@ionic/angular';

@Component({
  selector: 'kirby-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent {
  @Input()
  value: any;

  @Input()
  disabled: any;

  @Output()
  focusChange = new EventEmitter<boolean>();

  @ViewChild(IonRadio, { static: true, read: ElementRef })
  private ionRadio: ElementRef<HTMLIonRadioElement>;

  @HostListener('click', ['$event'])
  hostElementClicked(event: Event) {
    if (event.target !== this.ionRadio.nativeElement) {
      this.ionRadio.nativeElement.click();
    }
  }
}
