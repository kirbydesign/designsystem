import type { Meta, StoryObj } from '@storybook/angular';
import {
  applicationConfig,
  argsToTemplate,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';
import { importProvidersFrom } from '@angular/core';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { AccordionDirective } from '@kirbydesign/designsystem/accordion';
import { AccordionItemComponent } from './accordion-item.component';

const meta: Meta<AccordionItemComponent> = {
  component: AccordionItemComponent,
  title: 'AccordionItemComponent',
  decorators: [
    moduleMetadata({
      declarations: [IconComponent, AccordionDirective],
    }),
    applicationConfig({
      providers: [importProvidersFrom([IonicModule.forRoot(), BrowserAnimationsModule])],
    }),
    componentWrapperDecorator((story) => `<div style="padding: 1em;">${story}</div>`),
  ],
  render: (args: AccordionItemComponent) => ({
    props: {
      ...args,
    },
    template: `<kirby-accordion>
    <kirby-accordion-item ${argsToTemplate(args)}>
      Accordion Content
    </kirby-accordion-item>
    <kirby-accordion-item title="Expanded" [isExpanded]="true">
      Accordion Content
    </kirby-accordion-item>
    <kirby-accordion-item [isDisabled]="true" disabledTitle="Disabled">
      Accordion Content
    </kirby-accordion-item>
  </kirby-accordion>`,
  }),
};
export default meta;
type Story = StoryObj<AccordionItemComponent>;

export const TestGrid: Story = {
  args: {
    title: 'Default',
    isExpanded: false,
    isDisabled: false,
    disabledTitle: '',
  },
};

// export const Heading: Story = {
//   args: {
//     title: 'Accordion-item works!',
//     isExpanded: false,
//     isDisabled: false,
//     disabledTitle: '',
//   },
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     expect(canvas.getByText(/accordion-item works!/gi)).toBeTruthy();
//   },
// };
