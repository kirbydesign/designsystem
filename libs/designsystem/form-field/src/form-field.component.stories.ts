import {
  argsToTemplate,
  componentWrapperDecorator,
  type Meta,
  moduleMetadata,
  type StoryObj,
} from '@storybook/angular';
import { userEvent, within } from 'storybook/test';

import {
  FormFieldComponent,
  FormFieldModule,
  InputComponent,
  TextareaComponent,
} from '@kirbydesign/designsystem/form-field';

import { IconComponent } from '@kirbydesign/designsystem';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormFieldExampleComponent } from '~/app/examples/form-field-example/form-field-example.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'text-area-form-field-wrapper',
  imports: [FormFieldModule, ReactiveFormsModule, TextareaComponent],
  template: `
    <kirby-form-field label="test">
      <textarea
        rows="3"
        kirby-textarea
        [formControl]="control"
        [maxlength]="1000"
        #textarea
      ></textarea>
      <kirby-input-counter [listenTo]="textarea"></kirby-input-counter>
    </kirby-form-field>
  `,
})
class TextAreaFormFieldWrapperComponent {
  readonly control = new FormControl<string>('');
  constructor() {
    this.control.setValue('test');
  }
}

const meta: Meta<FormFieldComponent> = {
  component: FormFieldComponent,
  title: 'Components / FormField',
  decorators: [
    moduleMetadata({
      imports: [
        FormFieldModule,
        InputComponent,
        TextareaComponent,
        FormFieldExampleComponent,
        IconComponent,
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<FormFieldComponent>;

export const Default: Story = {
  args: {
    label: 'Input with label and message',
    message: 'This is additional info that will be shown below the input',
  },
  render: (args) => ({
    props: args,
    template: `<kirby-form-field ${argsToTemplate(args)}>
    <input kirby-input />
  </kirby-form-field>`,
  }),
};

export const Textarea: Story = {
  render: () => ({
    template: `<kirby-form-field label="Textarea with label and message" message="This is additional info that will be shown below the textarea">
    <textarea kirby-textarea></textarea>
  </kirby-form-field>`,
  }),
};

export const InputCounter: Story = {
  render: () => ({
    template: `<kirby-form-field>
    <input kirby-input placeholder="Input Counter" #input maxlength="140" />
    <kirby-input-counter [listenTo]="input"></kirby-input-counter>
  </kirby-form-field>`,
  }),
};

export const TextAreaInputCounter: Story = {
  decorators: [
    moduleMetadata({
      imports: [TextAreaFormFieldWrapperComponent],
    }),
    componentWrapperDecorator(TextAreaFormFieldWrapperComponent),
  ],
};

export const CookbookExample: Story = {
  render: () => ({
    template: `<cookbook-form-field-example></cookbook-form-field-example>`,
  }),
};

export const DateInputWithPrefixIcon: Story = {
  render: () => ({
    template: `
      <kirby-form-field label="Date input with prefix icon">
        <kirby-icon kirby-affix="prefix" name="calendar"></kirby-icon>
        <input kirby-input type="date" size="size" />
      </kirby-form-field>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByRole('textbox');

    await userEvent.click(input);
    await userEvent.type(input, '987654');
  },
};
