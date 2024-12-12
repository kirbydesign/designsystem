import { Component } from '@angular/core';
import { ImageBannerComponent } from '@kirbydesign/extensions-angular/image-banner';
import { AccountNumberPipe } from '@kirbydesign/extensions-angular/localization';
import { type Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
  template: `
    hello world
  `,
  selector: 'dummy-pipe-account-number',
})
class DummyPipeAccountNumberComponent {}

const meta: Meta<DummyPipeAccountNumberComponent> = {
  component: DummyPipeAccountNumberComponent,
  title: 'Pipes/Localization/Account Number',
  decorators: [
    moduleMetadata({
      imports: [AccountNumberPipe],
    }),
  ],
};

export default meta;
type Story = StoryObj<ImageBannerComponent>;

/**
 * This is a default image banner with a header, image and body text.
 */
export const Default: Story = {
  args: {},
};
