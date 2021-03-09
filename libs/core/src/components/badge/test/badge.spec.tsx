// import { Badge } from '../badge';
// // import { newSpecPage } from '@stencil/core/testing';

// describe('kirby-core-badge', () => {
//   it('builds', () => {
//     // const page = await newSpecPage({
//     //   components: [Badge],
//     // });
//     // expect(page.rootInstance).toBeTruthy();
//     expect(new Badge()).toBeTruthy();
//   });
// });

import { newSpecPage } from '@stencil/core/testing';
import { Badge } from '../badge';

describe('some-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Badge],
      html: `<kirby-badge></kirby-badge>`,
    });
    expect(page.root).toEqualHtml(`
      <kirby-badge>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </kirby-badge>
    `);
  });
});
