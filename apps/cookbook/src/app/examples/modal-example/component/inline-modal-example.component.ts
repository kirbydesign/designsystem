import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'cookbook-embedded-modal-example',
  templateUrl: './inline-modal-example.component.html',
})
export class InlineModalExampleComponent implements OnDestroy {
  constructor(private router: Router, private route: ActivatedRoute) {}

  @ViewChild(IonModal) modal: IonModal;

  isOpen = true;

  closeModal() {
    this.isOpen = false;
    this.router.navigate([{ outlets: { myModal: null } }], { relativeTo: this.route.parent });
  }

  ngOnDestroy() {
    this.modal.dismiss(null, 'cancel');
  }
}
