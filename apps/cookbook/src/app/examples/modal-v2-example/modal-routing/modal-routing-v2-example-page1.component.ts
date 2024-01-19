import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: `
    <kirby-modal-v2-wrapper [title]="'Modal Page 1/2'" [hasCollapsibleTitle]="false">
      <h4>The standard Lorem Ipsum passage, used since the 1500s</h4>
      <span>
        QueryParams:
        <pre>{{ queryParams$ | async | json }}</pre>
      </span>
      <p>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      </p>

      <kirby-modal-v2-footer themeColor="white" class="footer" footer>
        <button kirby-button class="nav" routerLink="../page2" nav-next>
          <kirby-icon name="arrow-more"></kirby-icon>
        </button>
      </kirby-modal-v2-footer>
    </kirby-modal-v2-wrapper>
  `,
  styles: [
    'kirby-modal-v2-footer { --kirby-modal-footer-justify-content: flex-end; }',
    'h4 { margin-top: 24px; } ',
  ],
})
export class ModalRoutingV2ExamplePage1Component {
  constructor(private route: ActivatedRoute) {}
  queryParams$ = this.route.queryParams;
}
