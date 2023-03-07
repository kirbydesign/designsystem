import { Component } from '@angular/core';

export const routerConfigCodeSnippet = `{
  path: 'modal-v2',
  component: ModalV2ShowcaseComponent,
  children: [
    {
      path: 'modal',
      component: ModalRoutingV2Component,
      outlet: 'modal-v2',
      children: [
        {
          path: 'page1',
          component: ModalRoutingV2ExamplePage1Component,
        },
        {
          path: 'page2',
          component: ModalRoutingV2ExamplePage2Component,
        },
      ],
    },
  ],
}`;

export const routerLinkCodeSnippet = `<!-- Open the modal -->
<button
  kirby-button
  [routerLink]="[{ outlets: { 'modal-v2': ['modal', 'page1'] } }]"
  [queryParams]="{ awesomeQueryParam: 'awesome value' }"
>
  Open modal by route
</button>

<!-- Navigate between siblings within the modal -->
<a routerLink="../page1">Go to page 1</a>
<a routerLink="../page2">Go to page 2</a>
`;

export const programmaticRoutingCodeSnippet = `import { ActivatedRoute, Router } from '@angular/router';
constructor(private router: Router, private route: ActivatedRoute) {}

// Open the modal
this.router.navigate([{ outlets: { 'modal-v2': ['modal', 'page1'] } }], {
  relativeTo: this.route,
});

// Navigate between siblings within the modal
this.router.navigate(['../page1'], { relativeTo: this.route });
this.router.navigate(['../page2'], { relativeTo: this.route });

// Close the modal from within the named outlet
this.router.navigate([{ outlets: { 'modal-v2': null } }], {
  relativeTo: this.route.parent.parent,
});
`;

@Component({
  selector: 'cookbook-modal-routing-v2-example',
  templateUrl: './modal-routing-v2-example.component.html',
})
export class ModalRoutingV2ExampleComponent {}
