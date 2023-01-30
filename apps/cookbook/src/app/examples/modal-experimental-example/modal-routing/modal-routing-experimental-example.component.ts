import { Component } from '@angular/core';

export const routerConfigCodeSnippet = `{
  path: 'modal-experimental',
  component: ModalExperimentalShowcaseComponent,
  children: [
    {
      path: 'modal',
      component: ModalRoutingExperimentalComponent,
      outlet: 'modal-experimental',
      children: [
        {
          path: 'page1',
          component: ModalRoutingExperimentalExamplePage1Component,
        },
        {
          path: 'page2',
          component: ModalRoutingExperimentalExamplePage2Component,
        },
      ],
    },
  ],
}`;

@Component({
  selector: 'cookbook-modal-routing-experimental-example',
  templateUrl: './modal-routing-experimental-example.component.html',
})
export class ModalRoutingExperimentalExampleComponent {}
