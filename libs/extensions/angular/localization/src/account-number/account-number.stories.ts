import { Component, Input } from '@angular/core';
import { AccountNumber, AccountNumberPipe } from '@kirbydesign/extensions-angular/localization';
import { type Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
  template: `
    {{ accountNumber | accountNumber }}
  `,
  selector: 'extensions-account-number-example',
  standalone: true,
  imports: [AccountNumberPipe],
})
class AccountNumberExampleComponent {
  @Input() accountNumber!: AccountNumber;
}

/**
 * Pipe that formats an `AccountNumber` to a common format.
 */
const meta: Meta<AccountNumberExampleComponent> = {
  component: AccountNumberExampleComponent,
  title: 'Pipes/Localization',
  decorators: [
    moduleMetadata({
      imports: [AccountNumberPipe],
    }),
  ],
  tags: ['!autodocs', 'dev'],
};

export default meta;
type Story = StoryObj<AccountNumberExampleComponent>;

/**
 * TODO: Account Number docs goes here.
 */
export const AccountNum: Story = {
  args: {
    accountNumber: { regNo: '9876', accountNo: '1234567890' },
  },
  parameters: {
    docs: {
      source: {
        language: 'tsx', // Using tsx here to get better syntax highlighting
        code: `<p>
          {{ { regNo: '9876', accountNo: '1234567890' } | accountNumber }}
        </p> `,
      },
    },
  },
};
