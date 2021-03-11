import { newE2EPage } from '@stencil/core/testing';

describe('kirby-badge', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<kirby-badge></kirby-badge>');

    const element = await page.find('kirby-badge');
    expect(element).toHaveClass('hydrated');
  });
});
