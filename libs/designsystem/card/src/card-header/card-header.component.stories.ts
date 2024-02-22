import {
  applicationConfig,
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';

import { importProvidersFrom } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { CardComponent } from '../card.component';
import { CardHeaderComponent } from './card-header.component';

const cardContent = `<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</p>
`;

const meta: Meta<CardHeaderComponent> = {
  component: CardHeaderComponent,
  title: 'CardHeaderComponent',
  decorators: [
    moduleMetadata({
      imports: [IconModule],
      declarations: [CardComponent],
    }),
    applicationConfig({
      providers: [importProvidersFrom([IonicModule.forRoot()])],
    }),
  ],
  render: (args: CardHeaderComponent) => ({
    props: args,
    template: `
      <div class="test-row" title="Default (interactive)">  
        <kirby-card>
          <kirby-card-header ${argsToTemplate(args)}></kirby-card-header>
          ${cardContent}
        </kirby-card>
      </div>

      <div class="test-row" title="ThemeColor ">
        <kirby-card>
          <kirby-card-header [title]="'Flagged card header'" flagged="success"></kirby-card-header>
          ${cardContent}
        </kirby-card>

        <kirby-card>
          <kirby-card-header [title]="'Flagged card header'" flagged="warning"></kirby-card-header>
          ${cardContent}
        </kirby-card>

        <kirby-card>
          <kirby-card-header [title]="'Flagged card header'" flagged="danger"></kirby-card-header>
          ${cardContent}
        </kirby-card>

        <kirby-card>
          <kirby-card-header [title]="'Flagged card header'" flagged="info"></kirby-card-header>
          ${cardContent}
        </kirby-card>
      </div>  
    `,
  }),
};
export default meta;
type Story = StoryObj<CardHeaderComponent>;

export const TestGrid: Story = {
  argTypes: {
    flagged: {
      options: ['success', 'warning', 'danger', 'info'],
      control: { type: 'radio' },
    },
  },
  args: {
    title: 'Title',
    subtitle: '',
    isTitleBold: false,
    flagged: null,
    hasPadding: true,
  },
};
