import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

import { AccordionModule } from '@kirbydesign/designsystem/accordion';
import { AccordionItemComponent } from '@kirbydesign/designsystem/accordion';

import { AccordionExampleModule } from '~/app/examples/accordion-example/accordion-example.module';

const meta: Meta<AccordionItemComponent> = {
  component: AccordionItemComponent,
  title: 'Components / Accordion',
  decorators: [
    moduleMetadata({
      imports: [AccordionModule, AccordionExampleModule],
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
