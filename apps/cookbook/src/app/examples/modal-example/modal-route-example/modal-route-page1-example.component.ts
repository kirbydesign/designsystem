import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cookbook-modal-route-page-1-example',
  template: `
    <kirby-page-title>Modal Page 1/2</kirby-page-title>
    <h4>The standard Lorem Ipsum passage, used since the 1500s</h4>
    <span>
      QueryParams:
      <pre>{{ queryParams$ | async | json }}</pre>
    </span>
    <p>
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    </p>
    <button kirby-button (click)="toggleFooter()">Toggle footer</button>
    <kirby-modal-footer *ngIf="showFooter">
      <button kirby-button class="nav" routerLink="../page2">
        Next
        <kirby-icon name="arrow-more"></kirby-icon>
      </button>
    </kirby-modal-footer>
  `,
  styles: [
    'kirby-modal-footer { --kirby-modal-footer-justify-content: flex-end; }',
    'h4 { margin-top: 24px; } ',
  ],
})
export class ModalRoutePage1ExampleComponent {
  showFooter: boolean = true;
  queryParams$ = this.route.queryParams;

  constructor(private route: ActivatedRoute) {}

  toggleFooter() {
    this.showFooter = !this.showFooter;
  }
}
