import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { RouterTestingModule } from '@angular/router/testing';

import { CardComponent, CardHeaderComponent } from '@kirbydesign/designsystem/card';
import { ActionGroupComponent } from '@kirbydesign/designsystem/action-group';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { HeaderActionsDirective, HeaderComponent } from '@kirbydesign/designsystem/header';
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
        HeaderComponent,
        HeaderActionsDirective,
        ActionGroupComponent,
        ButtonComponent,
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
type ConditionalActionsStory = StoryObj<PageComponent & { showActions: boolean }>;

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

export const PageWithConditionallyRenderedHeaderActions: ConditionalActionsStory = {
  args: {
    title: 'A long page title that should remain centered in the toolbar',
    showActions: false,
  },
  render: (args) => ({
    props: args,
    template: `<kirby-app>
    <kirby-page>
      <kirby-header [title]="title">
        <kirby-action-group *kirbyHeaderActions>
          @if (showActions) {
            <button kirby-button attentionLevel="3">Action</button>
          }
        </kirby-action-group>
      </kirby-header>
      <kirby-page-content>
        <button kirby-button (click)="showActions = !showActions">Toggle actions</button>
        <div style="height: 1200px">Scroll to show the toolbar title</div>
      </kirby-page-content>
    </kirby-page>
    </kirby-app>`,
  }),
};

export const PageWithConditionallyRenderedHeaderIconActions: ConditionalActionsStory = {
  args: {
    title: 'A long transaction title that should remain centered in the toolbar',
    showActions: false,
  },
  render: (args) => ({
    props: args,
    template: `<kirby-app>
    <kirby-page defaultBackHref="/">
      <kirby-header [title]="title">
        <ng-container *kirbyHeaderActions>
          @if (showActions) {
            <button kirby-button attentionLevel="3" aria-label="Confirm">
              <kirby-icon name="verify"></kirby-icon>
            </button>
            <button kirby-button attentionLevel="3" aria-label="Download">
              <kirby-icon name="download"></kirby-icon>
            </button>
          }
        </ng-container>
      </kirby-header>
      <kirby-page-content>
        <button kirby-button (click)="showActions = !showActions">Toggle actions</button>
        <div style="height: 1200px">Scroll to show the toolbar title</div>
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
