import { Component, ElementRef, Input, OnInit } from '@angular/core';

export type Flavor = 'modal' | 'drawer';
@Component({
  selector: 'kirby-modal-v2-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class ModalV2WrapperComponent implements OnInit {
  constructor(private elementRef: ElementRef<HTMLElement>) {}

  private ionModalElement?: HTMLIonModalElement;

  @Input() flavor: Flavor = 'modal';
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
