import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { IonFabButton, IonRadio } from '@ionic/angular';

@Component({
  selector: 'kirby-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent {
  @Input()
  value: any;

  @ViewChild(IonRadio, { static: true, read: ElementRef }) ionRadio: ElementRef<HTMLElement>;

  @HostListener('click')
  hostElementClicked() {
    this.ionRadio.nativeElement.click();
  }
}
