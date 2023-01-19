import { Component } from '@angular/core';

@Component({
  selector: 'cookbook-embedded-modal-example',
  template: `<p>This is my experimental component</p>
    <router-outlet name="myModal"></router-outlet>
    <a
      [routerLink]="[{ outlets: { myModal: ['modal', 'page1'] } }]"
      [queryParams]="{ awesomeQueryParam: 'awesome value' }"
      >Go here!!!</a
    > `,
})
export class ModalExperimentalShowcaseComponent {}
