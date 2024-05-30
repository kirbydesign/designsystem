import type { Meta, StoryObj } from '@storybook/angular';
import {
  applicationConfig,
  argsToTemplate,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

import { AccordionModule } from '@kirbydesign/designsystem/accordion';
import { AccordionItemComponent } from '@kirbydesign/designsystem/accordion';

const meta: Meta<AccordionItemComponent> = {
  component: AccordionItemComponent,
  title: 'AccordionItemComponent',
  decorators: [
    moduleMetadata({
      imports: [AccordionModule],
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
    title: 'Accordion Item 1',
    isExpanded: false,
    isDisabled: false,
    disabledTitle: '',
  },
  render: (args: AccordionItemComponent) => ({
    props: args,
    template: `
    <kirby-accordion-item ${argsToTemplate(args)}>Content</kirby-accordion-item>
    <kirby-accordion-item title="Accordion item 2">Content</kirby-accordion-item>
    <kirby-accordion-item title="Accordion item 3">Content</kirby-accordion-item>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
    <kirby-accordion-item [isDisabled]="true" title="Accordion item">Content</kirby-accordion-item>
    <kirby-accordion-item [isDisabled]="true" title="Accordion item" disabledTitle="Alternative Disabled Title (disabledTitle)">Content</kirby-accordion-item>
    <kirby-accordion-item [isDisabled]="true" [isExpanded]="true" title="Disabled with isExpanded">Content</kirby-accordion-item>
    `,
  }),
};
