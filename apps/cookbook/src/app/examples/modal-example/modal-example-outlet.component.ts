import { Component } from '@angular/core';
import { Params } from '@angular/router';

import { ModalController } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-modal-example-outlet',
  template: `<button kirby-button (click)="navigateToModalRoute('page1', {awesomeQueryParam: 'awesome value'})">Open modal by route</button>
<button kirby-button kirbyModalRouterLink="page1" [kirbyModalQueryParams]="{awesomeQueryParam: 'awesome value'}">Open modal by router link</button>
<button kirby-button class="deeplink" (click)="navigateToModalRoute(['/examples', 'modal', 'page1'], {awesomeQueryParam: 'awesome value'})">Deep link to modal route</button>
<button kirby-button class="deeplink" [kirbyModalRouterLink]="['/examples', 'modal', 'page1']" [kirbyModalQueryParams]="{awesomeQueryParam: 'awesome value'}">Deep link to modal by router link</button>`,
  defaultCodeSnippet: `constructor(private modalController: ModalController) {}

navigateToModalRoute(path: string | string[]) {
  this.modalController.navigateToModal(path);
}`,
  modalRouteCodeSnippet: `{
    path: 'main-route-presented-behind-the-modal',
    component: SomeComponent,
    children: [
      {
        path: 'child-route-presented-in-modal',
        outlet: 'modal',
        component: FirstChildComponent,
      },
      {
        path: 'second-child-route-presented-in-modal',
        outlet: 'modal',
        component: SecondChildComponent,
      },
    ],
  }`,
  routerLinkForModalOutletCodeSnippet: `<!-- Relative path when opened from parent route: -->
<a kirbyModalRouterLink="child-route-presented-in-modal">Open Modal</a>

<!-- Relative path to parent route + modal: -->
<a kirbyModalRouterLink="../main-route-presented-behind-the-modal/child-route-presented-in-modal">Navigate to Modal</a>
<!-- OR using string array: -->
<a [kirbyModalRouterLink]="['../', 'main-route-presented-behind-the-modal', 'child-route-presented-in-modal']">Navigate to Modal</a>

<!-- Absolute path to parent route + modal: -->
<a [kirbyModalRouterLink]="['/home', 'main-route-presented-behind-the-modal', 'child-route-presented-in-modal']">Navigate to Modal</a>`,

  modalControllerForModalOutletCodeSnippet: `import { ModalController } from '@kirbydesign/designsystem';

// Relative path when opened from parent component:
modalController.navigateToModal('child-route-presented-in-modal');

// Relative path when opened from another component:
modalController.navigateToModal(['../', 'main-route-presented-behind-the-modal', 'child-route-presented-in-modal']);
// OR using plain string:
modalController.navigateToModal('../main-route-presented-behind-the-modal/child-route-presented-in-modal');

// Absolute path when opened from another component:
modalController.navigateToModal(['/home', 'main-route-presented-behind-the-modal', 'child-route-presented-in-modal']);`,

  routerLinkWithinModalOutletCodeSnippet: `<!-- Relative path to sibling modal route: -->
<a routerLink="../second-child-route-presented-in-modal">Page 2</a>`,

  modalControllerWithinModalOutletCodeSnippet: `// Using Kirby ModalController:
import { ModalController } from '@kirbydesign/designsystem';

constructor(private modalController: ModalController) {}

navigate() {
  // Relative path to sibling modal route:
  modalController.navigateWithinModal('../second-child-route-presented-in-modal');    
}

// OR using Angular Router:
constructor(private router: Router, private route: ActivatedRoute) {}

navigate() {
  this.router.navigate(['../second-child-route-presented-in-modal'], { relativeTo: this.route });
} `,
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: [
    'button.deeplink { display: none; } ',
    ':host-context(cookbook-modal-showcase) button.deeplink { display: initial; } ',
  ],
})
export class ModalExampleOutletComponent {
  template = config.template;
  defaultCodeSnippet = config.defaultCodeSnippet;
  modalRouteCodeSnippet = config.modalRouteCodeSnippet;
  routerLinkForModalOutletCodeSnippet = config.routerLinkForModalOutletCodeSnippet;
  modalControllerForModalOutletCodeSnippet = config.modalControllerForModalOutletCodeSnippet;
  routerLinkWithinModalOutletCodeSnippet = config.routerLinkWithinModalOutletCodeSnippet;
  modalControllerWithinModalOutletCodeSnippet = config.modalControllerWithinModalOutletCodeSnippet;

  constructor(private modalController: ModalController) {}

  navigateToModalRoute(path: string | string[], queryParams?: Params) {
    this.modalController.navigateToModal(path, queryParams);
  }
}
