import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

import { AccordionDirective, AccordionItemComponent } from '@kirbydesign/designsystem/accordion';
import { CardComponent } from '@kirbydesign/designsystem/card';

import { responsiveModes } from 'tools/storybook-config/shared-config';
// eslint-disable-next-line no-restricted-imports
import {
  gridStyles,
  interactionStates,
  pseudoStatesFor,
  Surface,
  surfaces,
} from '../../.storybook/story-helpers';
import { AccordionExampleComponent } from '~/app/examples/accordion-example/accordion-example.component';

const meta: Meta<AccordionItemComponent> = {
  component: AccordionItemComponent,
  title: 'Components / Accordion',
  parameters: {
    chromatic: { modes: { ...responsiveModes } },
  },
  decorators: [
    moduleMetadata({
      imports: [
        AccordionDirective,
        AccordionItemComponent,
        AccordionExampleComponent,
        CardComponent,
      ],
    }),
    applicationConfig({
      providers: [importProvidersFrom([BrowserAnimationsModule])],
    }),
    componentWrapperDecorator((story) => `<kirby-accordion>${story}</kirby-accordion>`),
  ],
};
export default meta;
type Story = StoryObj<AccordionItemComponent>;

export const Default: Story = {
  args: {
    title: 'Default',
    isExpanded: false,
    isDisabled: false,
    disabledTitle: '',
  },
};

export const CookbookExamples: Story = {
  render: () => ({
    template: `<cookbook-accordion-example></cookbook-accordion-example>`,
  }),
};

export const Focused: Story = {
  args: {
    title: 'Focused Accordion Item',
    isExpanded: false,
  },
  decorators: [componentWrapperDecorator((story) => `<div style="padding: 8px">${story}</div>`)],
  play: async ({ canvasElement }) => {
    const header = canvasElement.querySelector('.header') as HTMLElement;
    if (header) {
      header.focus();
    }
  },
};

export const FocusedFirstInCard: Story = {
  args: {
    isExpanded: false,
  },
  render: (args) => ({
    template: `
      <kirby-card>
        <kirby-accordion>
          <kirby-accordion-item title="First item">First content</kirby-accordion-item>
          <kirby-accordion-item title="Second item" [isExpanded]="${args.isExpanded}">Second content</kirby-accordion-item>
        </kirby-accordion>
      </kirby-card>
    `,
  }),
  decorators: [componentWrapperDecorator((story) => `<div style="padding: 8px">${story}</div>`)],
  play: async ({ canvasElement }) => {
    const headers = canvasElement.querySelectorAll('.header');
    if (headers[0]) {
      (headers[0] as HTMLElement).focus();
    }
  },
};

export const FocusedLastInCard: Story = {
  ...FocusedFirstInCard,
  play: async ({ canvasElement }) => {
    const headers = canvasElement.querySelectorAll('.header');
    if (headers[1]) {
      (headers[1] as HTMLElement).focus();
    }
  },
};

export const FocusedLastExpandedInCard: Story = {
  ...FocusedLastInCard,
  args: {
    isExpanded: true,
  },
};

type AccordionRow = {
  id: string;
  label: string;
  surface: Surface;
  isExpanded?: boolean;
};

const accordionVariants: Omit<AccordionRow, 'id' | 'surface'>[] = [
  { label: 'collapsed' },
  { label: 'expanded', isExpanded: true },
];

const accordionRows: AccordionRow[] = surfaces.flatMap((surface) =>
  accordionVariants.map((variant) => ({
    ...variant,
    surface,
    id: `accordion-${surface}-${variant.label}`,
  }))
);

// Disabled items can't be interacted with, so disabled is shown as a state of its own
const accordionStates = [...interactionStates, 'disabled'] as const;

export const InteractionStates: Story = {
  parameters: {
    chromatic: { modes: { mobile: { disable: true } } },
    pseudo: pseudoStatesFor(
      accordionRows.map((row) => row.id),
      '.header'
    ),
  },
  render: () => ({
    props: { rows: accordionRows, states: accordionStates },
    template: `
      <div class="grid">
        @for (state of states; track state) {
          <p class="kirby-text-small-light">{{ state }}</p>
        }
        @for (row of rows; track row.id) {
          @for (state of states; track state) {
            <kirby-card [variant]="row.surface">
              <kirby-accordion>
                <kirby-accordion-item
                  [attr.id]="row.id + '-' + state"
                  [title]="row.label + ', ' + row.surface + ', ' + state"
                  [isExpanded]="row.isExpanded"
                  [isDisabled]="state === 'disabled'"
                >
                  Content
                </kirby-accordion-item>
              </kirby-accordion>
            </kirby-card>
          }
        }
      </div>
    `,
    styles: [gridStyles(accordionStates.length, '220px')],
  }),
};
