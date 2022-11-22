import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'kirby-modal-wrapper-experimental',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class ModalWrapperExperimentalComponent implements OnInit {
  constructor(private elementRef: ElementRef<HTMLElement>) {}

  private ionModalElement?: HTMLIonModalElement;

  @Input() title = '';
  @Input() hasCollapsibleTitle = true;
  @Input() scrollDisabled = false;

  ngOnInit() {
    this.ionModalElement = this.elementRef.nativeElement.closest('ion-modal');
  }

  close() {
    this.ionModalElement.dismiss();
  }
}
