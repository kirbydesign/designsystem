import { Component } from '@angular/core';
import { Params } from '@angular/router';

import { AlertConfig, ModalController } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-modal-example-outlet',
  template: `<button kirby-button (click)="navigateToModalRoute('page1', {awesomeQueryParam: 'awesome value'})">Open modal by route</button>
<button kirby-button kirbyModalRouterLink="page1" [kirbyModalQueryParams]="{awesomeQueryParam: 'awesome value'}">Open modal by router link</button>`,
  defaultCodeSnippet: `
  readonly alertConfig: AlertConfig = {
    title: 'Do you want to close the modal?',
    okBtn: {
      text: 'Yes',
      isDestructive: true,
    },
    cancelBtn: 'No',
  };
  
  constructor(private modalController: ModalController) {}

  navigateToModalRoute(path: string | string[], queryParams?: Params, alertConfig?: AlertConfig) {
    this.modalController.navigateToModal(path,  queryParams, alertConfig);
  }`,
  modalRouteCodeSnippet: `{
    path: 'main-route-presented-behind-the-modal',
    component: SomeComponent,
    children: [
      {
        path: 'child-route-presented-in-modal',
        outlet: 'modal',
        component: FirstChildComponent,
        
        //optional modalConfig passed via developer-defined route data
        data: {
          modalConfig: {
            size: 'large',
          },
        },  
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
<a [kirbyModalRouterLink]="['/home', 'main-route-presented-behind-the-modal', 'child-route-presented-in-modal']">Navigate to Modal</a>

<!-- Passing query parameters (OPTIONAL) -->
<a kirbyModalRouterLink="../main-route-presented-behind-the-modal/child-route-presented-in-modal" [kirbyModalQueryParams]="{awesomeQueryParam: 'awesome value'}">Navigate to Modal</a>
`,

  modalControllerForModalOutletCodeSnippet: `import { ModalController } from '@kirbydesign/designsystem';

// Relative path when opened from parent component:
modalController.navigateToModal('child-route-presented-in-modal');

// Relative path when opened from another component:
modalController.navigateToModal(['../', 'main-route-presented-behind-the-modal', 'child-route-presented-in-modal']);
// OR using plain string:
modalController.navigateToModal('../main-route-presented-behind-the-modal/child-route-presented-in-modal');

// Absolute path when opened from another component:
modalController.navigateToModal(['/home', 'main-route-presented-behind-the-modal', 'child-route-presented-in-modal']);

// Passing query parameters (OPTIONAL): 
modalController.navigateToModal('child-route-presented-in-modal', {awesomeQueryParam: 'awesome value'});

// Show alert on close (OPTIONAL): 
modalController.navigateToModal('child-route-presented-in-modal', null, { title: 'Do you want to close the modal?', okBtn: { text: 'Yes', isDestructive: true }, cancelBtn: 'No'});
`,

  routerLinkWithinModalOutletCodeSnippet: `<!-- Relative path to sibling modal route: -->
<a routerLink="../second-child-route-presented-in-modal">Page 2</a>

<!-- Passing query parameters (OPTIONAL): -->
<a routerLink="../second-child-route-presented-in-modal" [queryParams]="{awesomeQueryParam: 'awesome value'}">Page 2</a>
`,

  modalControllerWithinModalOutletCodeSnippet: `// Using Kirby ModalController:
import { ModalController } from '@kirbydesign/designsystem';

constructor(private modalController: ModalController) {}

navigate() {
  // Relative path to sibling modal route:
  modalController.navigateWithinModal('../second-child-route-presented-in-modal');    

  // Relative path to sibling modal route with query parameters (OPTIONAL):
  modalController.navigateWithinModal('../second-child-route-presented-in-modal', {awesomeQueryParam: 'awesome value'});    
}

// OR using Angular Router:
constructor(private router: Router, private route: ActivatedRoute) {}

navigate() {
  this.router.navigate(['../second-child-route-presented-in-modal'], { relativeTo: this.route });

  // OR with query parameters (OPTIONAL)
  this.router.navigate(['../second-child-route-presented-in-modal'], { queryParams: {awesomeQueryParam: 'awesome value'}, relativeTo: this.route });
} `,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./modal-example-outlet.component.scss'],
})
export class ModalExampleOutletComponent {
  readonly alertConfig: AlertConfig = {
    title: 'Do you want to close the modal?',
    okBtn: {
      text: 'Yes',
      isDestructive: true,
    },
    cancelBtn: 'No',
  };

  static readonly template = config.template;
  static readonly defaultCodeSnippet = config.defaultCodeSnippet;
  static readonly modalRouteCodeSnippet = config.modalRouteCodeSnippet;
  static readonly routerLinkForModalOutletCodeSnippet = config.routerLinkForModalOutletCodeSnippet;
  static readonly modalControllerForModalOutletCodeSnippet =
    config.modalControllerForModalOutletCodeSnippet;
  static readonly routerLinkWithinModalOutletCodeSnippet =
    config.routerLinkWithinModalOutletCodeSnippet;
  static readonly modalControllerWithinModalOutletCodeSnippet =
    config.modalControllerWithinModalOutletCodeSnippet;

  constructor(private modalController: ModalController) {}

  navigateToModalRoute(path: string | string[], queryParams?: Params, alertConfig?: AlertConfig) {
    this.modalController.navigateToModal(path, queryParams, alertConfig);
  }
}
