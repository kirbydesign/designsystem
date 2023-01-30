import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'kirby-modal-routing-wrapper',
  templateUrl: './modal-routing.component.html',
})
export class ModalRoutingExperimentalComponent implements OnDestroy {
  constructor(private router: Router, private route: ActivatedRoute) {}

  @ViewChild(IonModal) modal: IonModal;

  isOpen = true;

  closeModal() {
    this.isOpen = false;
    this.router.navigate([{ outlets: { 'modal-experimental': null } }], {
      relativeTo: this.route.parent,
    });
  }

  ngOnDestroy() {
    this.modal.dismiss(null, 'cancel');
  }
}
