import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { RouterTestingModule } from '@angular/router/testing';

import { ModalNavigationService } from '@kirbydesign/designsystem/modal';
import { PageComponent, PageModule } from '@kirbydesign/designsystem/page';
import { KirbyAppModule } from '@kirbydesign/designsystem/kirby-app';
import { responsiveModes } from 'tools/storybook-config/shared-config';

const meta: Meta<PageComponent> = {
  component: PageComponent,
  title: 'Components / Page',
  decorators: [
    moduleMetadata({
      providers: [ModalNavigationService],
      imports: [RouterTestingModule, KirbyAppModule, PageModule],
    }),
  ],
  parameters: {
    chromatic: {
      modes: {
        ...responsiveModes,
      },
    },
  },
};
export default meta;
type Story = StoryObj<PageComponent>;

export const Page: Story = {
  args: {
    title: 'Title',
  },
  render: () => ({
    template: `<kirby-app>
    <kirby-page title="Page Title">
      <kirby-page-content>
        <p>Page Content</p>
        <p>Blanditiis, cupiditate distinctio earum illo impedit laborum velit veritatis. Accusamus adipisci alias
        aperiam, assumenda corporis culpa cum debitis exercitationem impedit laborum possimus quam qui repellat,
        saepe similique sint soluta. Unde.</p>
        <p>Aut eligendi excepturi magni nulla quo reprehenderit tempora tempore voluptates! Aliquid deserunt
        exercitationem nulla praesentium reiciendis, veniam voluptatem voluptatibus. Aut consectetur dignissimos
        dolor ex maiores nostrum numquam ratione sint voluptates.</p>
      </kirby-page-content>
    </kirby-page>
    </kirby-app>`,
  }),
};
