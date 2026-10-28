import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { RouterTestingModule } from '@angular/router/testing';
import { expect, fn, waitFor } from 'storybook/test';

import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { CardComponent, CardHeaderComponent } from '@kirbydesign/designsystem/card';
import {
  HeaderActionsDirective,
  HeaderComponent,
  HeaderTitleActionIconDirective,
} from '@kirbydesign/designsystem/header';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { ModalNavigationService } from '@kirbydesign/designsystem/modal';
import { PageComponent, PageContentComponent } from '@kirbydesign/designsystem/page';
import { AppComponent } from '@kirbydesign/designsystem/kirby-app';
import { SlideDirective, SlidesComponent } from '@kirbydesign/designsystem/slide';
import { responsiveModes } from 'tools/storybook-config/shared-config';

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
        SlidesComponent,
        SlideDirective,
        CardComponent,
        CardHeaderComponent,
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
