import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular/standalone';

@Component({
  selector: 'kirby-modal-v2-routing-wrapper',
  templateUrl: './modal-routing.component.html',
  styleUrls: ['./modal-routing.component.scss'],
})
export class ModalV2RoutingComponent implements OnDestroy {
  constructor(private router: Router, private route: ActivatedRoute) {}

  @ViewChild(IonModal) modal: IonModal;

  isOpen = true;

  closeModal() {
    this.isOpen = false;
    this.router.navigate([{ outlets: { 'modal-v2': null } }], {
      relativeTo: this.route.parent,
    });
  }

  ngOnDestroy() {
    this.modal.dismiss(null, 'cancel');
  }
}
