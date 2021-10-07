import { newSpecPage } from '@stencil/core/testing';

import { Badge } from './badge.component';

describe('Badge', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Badge],
      html: `<kirby-badge></kirby-badge>`,
    });
    expect(page.root).toEqualHtml(`
      <kirby-badge class="md">
        <mock:shadow-root>
          <ion-badge>
            <slot></slot>
          </ion-badge>
        </mock:shadow-root>
      </kirby-badge>
    `);
  });
});
