import { newE2EPage } from '@stencil/core/testing';

describe('kirby-badge', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<kirby-core-badge></kirby-core-badge>');

    const element = await page.find('kirby-badge');
    expect(element).toHaveClass('hydrated');
  });
});
