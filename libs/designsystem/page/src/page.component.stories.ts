import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { RouterTestingModule } from '@angular/router/testing';

import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { ModalNavigationService } from '@kirbydesign/designsystem/modal';
import {
  PageComponent,
  PageContentComponent,
  PageFooterComponent,
} from '@kirbydesign/designsystem/page';
import { AppComponent } from '@kirbydesign/designsystem/kirby-app';
import { responsiveModes } from 'tools/storybook-config/shared-config';
// eslint-disable-next-line no-restricted-imports
import { gridStyles, interactionStates, pseudoStatesFor } from '../../.storybook/story-helpers';

const meta: Meta<PageComponent> = {
  component: PageComponent,
  title: 'Components / Page',
  decorators: [
    moduleMetadata({
      providers: [ModalNavigationService],
      imports: [
        RouterTestingModule,
        AppComponent,
        PageComponent,
        PageContentComponent,
        PageFooterComponent,
        ButtonComponent,
      ],
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

const pageContainerStyles = `
  .page-container {
    position: relative;
    height: 160px;
    overflow: hidden;
  }
`;

const backButtonPseudoStates = pseudoStatesFor(['page'], 'ion-back-button');

export const BackButtonInteractionStates: Story = {
  parameters: {
    chromatic: { modes: { mobile: { disable: true } } },
    // Pressing a button with a pointer also hovers it
    pseudo: {
      ...backButtonPseudoStates,
      hover: [...backButtonPseudoStates.hover, ...backButtonPseudoStates.active],
    },
  },
  render: () => ({
    props: { states: interactionStates },
    template: `
      <div class="grid">
        @for (state of states; track state) {
          <div class="page-container" [attr.id]="'page-' + state">
            <kirby-page [title]="state" defaultBackHref="/">
              <kirby-page-content></kirby-page-content>
            </kirby-page>
          </div>
        }
      </div>
    `,
    styles: [gridStyles(interactionStates.length, '240px'), pageContainerStyles],
  }),
};

export const PageWithFooter: Story = {
  parameters: {
    chromatic: { modes: { mobile: { disable: true } } },
  },
  render: () => ({
    template: `<kirby-app>
    <kirby-page title="Page with Footer" defaultBackHref="/">
      <kirby-page-content>
        <p>Page Content</p>
      </kirby-page-content>
      <kirby-page-footer>
        <button kirby-button>Action</button>
      </kirby-page-footer>
    </kirby-page>
    </kirby-app>`,
  }),
};
