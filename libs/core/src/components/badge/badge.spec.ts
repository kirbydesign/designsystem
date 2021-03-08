import { Badge } from './badge';
// import { newSpecPage } from '@stencil/core/testing';

describe('kirby-core-badge', () => {
  it('builds', () => {
    // const page = await newSpecPage({
    //   components: [Badge],
    // });
    // expect(page.rootInstance).toBeTruthy();
    expect(new Badge()).toBeTruthy();
  });
});
