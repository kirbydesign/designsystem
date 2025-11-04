import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

import { AccordionDirective, AccordionItemComponent } from '@kirbydesign/designsystem/accordion';

import { responsiveModes } from 'tools/storybook-config/shared-config';
import { AccordionExampleComponent } from '~/app/examples/accordion-example/accordion-example.component';

const meta: Meta<AccordionItemComponent> = {
  component: AccordionItemComponent,
  title: 'Components / Accordion',
  parameters: {
    chromatic: { modes: { ...responsiveModes } },
  },
  decorators: [
    moduleMetadata({
      imports: [AccordionDirective, AccordionItemComponent, AccordionExampleComponent],
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
