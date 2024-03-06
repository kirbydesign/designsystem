import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { RouterTestingModule } from '@angular/router/testing';

import { ModalNavigationService } from '@kirbydesign/designsystem/modal';
import { PageComponent } from './page.component';
import { PageModule } from './page.module';

const meta: Meta<PageComponent> = {
  component: PageComponent,
  title: 'PageComponent',
  decorators: [
    moduleMetadata({
      providers: [ModalNavigationService],
      imports: [RouterTestingModule, PageModule],
    }),
  ],
};
export default meta;
type Story = StoryObj<PageComponent>;

export const Default: Story = {
  args: {
    title: 'Title',
  },
  render: (args: PageComponent) => ({
    template: `<kirby-page ${argsToTemplate(args)}>
      <kirby-page-content>
        Page Content
      </kirby-page-content>
    </kirby-page>`,
  }),
};
