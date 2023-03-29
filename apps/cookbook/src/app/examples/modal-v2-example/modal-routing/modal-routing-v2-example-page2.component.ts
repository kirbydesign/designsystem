import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  template: `
    <kirby-modal-v2-wrapper [title]="'Modal Page 2/2'" [hasCollapsibleTitle]="false">
      <h4>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</h4>
      <p>
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
        laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
        architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
        aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
        consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
        dolore magnam aliquam quaerat voluptatem."
      </p>

      <kirby-modal-v2-footer themeColor="white" class="footer" footer>
        <button kirby-button attentionLevel="3" routerLink="../page1" nav-prev>
          <kirby-icon name="arrow-back"></kirby-icon>
        </button>
        <button kirby-button (click)="closeModal()">Finish</button>
      </kirby-modal-v2-footer>
    </kirby-modal-v2-wrapper>
  `,
  styles: [
    'kirby-modal-v2-footer { --kirby-modal-footer-justify-content: space-between; }',
    'h4 { margin-top: 24px; } ',
  ],
})
export class ModalRoutingV2ExamplePage2Component {
  constructor(private router: Router, private route: ActivatedRoute) {}

  closeModal() {
    this.router.navigate([{ outlets: { 'modal-v2': null } }], {
      relativeTo: this.route.parent.parent,
    });
  }
}
