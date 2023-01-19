import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cookbook-embedded-modal-example',
  template: `
    <p>This is page 2</p>
    <a [routerLink]="'../page1'">Go back!!!</a>
  `,
})
export class InlineModalPage2ExampleComponent {}
