import { signal, type WritableSignal } from '@angular/core';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { RouterTestingModule } from '@angular/router/testing';
import { expect, fn, waitFor } from 'storybook/test';

import { ActionGroupComponent } from '@kirbydesign/designsystem/action-group';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { CardComponent, CardHeaderComponent } from '@kirbydesign/designsystem/card';
import {
  HeaderActionsDirective,
  HeaderComponent,
  HeaderTitleActionIconDirective,
} from '@kirbydesign/designsystem/header';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { ModalNavigationService } from '@kirbydesign/designsystem/modal';
import {
  PageComponent,
  PageContentComponent,
  PageFooterComponent,
} from '@kirbydesign/designsystem/page';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { AppComponent } from '@kirbydesign/designsystem/kirby-app';
import { SlideDirective, SlidesComponent } from '@kirbydesign/designsystem/slide';
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
        SlidesComponent,
        SlideDirective,
        CardComponent,
        CardHeaderComponent,
        ActionGroupComponent,
        ButtonComponent,
        HeaderComponent,
        HeaderActionsDirective,
        HeaderTitleActionIconDirective,
        IconComponent,
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

const scrollToToolbarTitle =
  (showActions: () => void): Story['play'] =>
  async ({ canvasElement }) => {
    const toolbar = canvasElement.querySelector('ion-toolbar');

    await waitFor(() =>
      expect(toolbar.style.getPropertyValue('--action-buttons-width')).not.toBe('')
    );

    showActions();

    await waitFor(() =>
      expect(toolbar.querySelector('ion-buttons[slot="primary"] button')).toBeInTheDocument()
    );

    await canvasElement.querySelector('ion-content').scrollToBottom(0);

    await waitFor(() =>
      expect(toolbar.querySelector('ion-title')).toHaveClass('slide-and-fade-in')
    );
  };

const conditionalHeaderActionsStory = ({
  title,
  headerActions,
  pageAttributes = '',
}: {
  title: string;
  headerActions: string;
  pageAttributes?: string;
}): Story => {
  let showActions: WritableSignal<boolean>;

  return {
    render: () => {
      showActions = signal(false);
      return {
        props: {
          title,
          showActions,
        },
        template: `<kirby-app>
    <kirby-page ${pageAttributes}>
      <kirby-header [title]="title">
        ${headerActions}
      </kirby-header>
      <kirby-page-content>
        <div style="height: 100vh">Scroll to show the toolbar title</div>
      </kirby-page-content>
    </kirby-page>
    </kirby-app>`,
      };
    },
    play: scrollToToolbarTitle(() => showActions.set(true)),
  };
};

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

export const PageWithConditionallyRenderedHeaderActions = conditionalHeaderActionsStory({
  title: 'A long page title that should remain centered in the toolbar',
  headerActions: `
    <kirby-action-group *kirbyHeaderActions>
      @if (showActions()) {
        <button kirby-button attentionLevel="3">Action</button>
      }
    </kirby-action-group>`,
});

export const PageWithConditionallyRenderedHeaderIconActions = conditionalHeaderActionsStory({
  title: 'A long transaction title that should remain centered in the toolbar',
  pageAttributes: 'defaultBackHref="/"',
  headerActions: `
    <ng-container *kirbyHeaderActions>
      @if (showActions()) {
        <button kirby-button attentionLevel="3" aria-label="Confirm">
          <kirby-icon name="verify"></kirby-icon>
        </button>
        <button kirby-button attentionLevel="3" aria-label="Download">
          <kirby-icon name="download"></kirby-icon>
        </button>
      }
    </ng-container>`,
});

export const PageWithSlides: Story = {
  render: () => ({
    props: {
      slides: [...Array(9).keys()].map((number) => ({
        title: `Slide ${number + 1}`,
        subtitle: `Subtitle ${number + 1}`,
        content: `Content for slide ${number + 1}`,
      })),
    },
    template: `<kirby-app>
    <kirby-page title="Page with Slides">
      <kirby-page-content>
        <kirby-slides title="Featured" [slides]="slides">
          <kirby-card *kirbySlide="let slide" [hasPadding]="true">
            <kirby-card-header [title]="slide.title" [subtitle]="slide.subtitle"></kirby-card-header>
            <div>{{ slide.content }}</div>
          </kirby-card>
        </kirby-slides>
      </kirby-page-content>
    </kirby-page>
    </kirby-app>`,
  }),
};

const interactiveToolbarTitleStory = (showActions: boolean): Story => ({
  render: () => ({
    props: {
      showActions,
      title: 'My secret savings account for a one-way ticket to Mars',
      onTitleClick: fn(),
    },
    template: `<kirby-app>
      <kirby-page defaultBackHref="/">
        <kirby-header
          [title]="title"
          value="2.100.854,91"
          valueUnit="kr."
          (titleClick)="onTitleClick($event)"
        >
          <kirby-icon name="arrow-down" *kirbyHeaderTitleActionIcon></kirby-icon>
          <ng-container *kirbyHeaderActions>
            @if (showActions) {
              <button kirby-button aria-label="Search">
                <kirby-icon name="search"></kirby-icon>
              </button>
              <button kirby-button attentionLevel="3" aria-label="More">
                <kirby-icon name="more"></kirby-icon>
              </button>
            }
          </ng-container>
        </kirby-header>
        <kirby-page-content>
          <div style="min-height: 200vh">Page content</div>
        </kirby-page-content>
      </kirby-page>
    </kirby-app>`,
  }),
  play: async ({ canvasElement }) => {
    const content = canvasElement.querySelector('ion-content');
    await expect(content).not.toBeNull();
    await waitFor(async () => {
      const scrollElement = await content.getScrollElement();
      await expect(scrollElement.scrollHeight).toBeGreaterThan(scrollElement.clientHeight);
    });
    await content.scrollToPoint(0, 400, 0);
    await waitFor(() =>
      expect(canvasElement.querySelector('ion-title.slide-and-fade-in')).not.toBeNull()
    );
  },
});

export const InteractiveToolbarTitleWithoutActions = interactiveToolbarTitleStory(false);
export const InteractiveToolbarTitleWithTwoActions = interactiveToolbarTitleStory(true);

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
