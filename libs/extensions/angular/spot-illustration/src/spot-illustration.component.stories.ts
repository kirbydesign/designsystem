import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { CardModule } from '@kirbydesign/designsystem/card';
import { ItemModule } from '@kirbydesign/designsystem/item';
// eslint-disable-next-line no-restricted-imports
import { illustrations, SpotIllustrationComponent } from './index';

/**
 * Spot illustrations
 *
 */
const meta: Meta<SpotIllustrationComponent> = {
  component: SpotIllustrationComponent,
  title: 'Components/Spot Illustration',
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent, CardModule, ItemModule],
    }),
  ],
  args: {
    name: 'robot',
    size: 'md',
  },
};
export default meta;
type Story = StoryObj<SpotIllustrationComponent>;

/**
 * The component spot-illustration requires a name from the list.
 */
export const Default: Story = {
  render: (args) => ({
    props: {
      name: 'robot',
      size: 'md',
    },
    template: `
      <kirby-x-spot-illustration ${argsToTemplate(args)}></kirby-x-spot-illustration>
    `,
  }),
};

export const InCard: Story = {
  render: (args) => ({
    props: {
      name: 'robot',
      size: 'md',
    },
    styles: [
      `.card-content {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: nowrap;
  padding: 0 16px;
  box-sizing: border-box;

  .subtitle-no-margin {
    margin-bottom: 0;
  }

  kirby-icon {
    margin-bottom: 16px;
  }
}`,
    ],
    template: `
      <kirby-card [hasPadding]="false">
      <kirby-item [disclosure]="'arrow-more'">
            <p title class="kirby-item-title kirby-text-bold">Robooobt</p>
      </kirby-item>
      <div class="card-content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula consectetur odio ut sodales. Quisque sit amet libero eu ligula feugiat imperdiet. Phasellus volutpat ultrices risus. Nullam rutrum vitae justo eu mollis. Duis vel augue nec ex condimentum vestibulum et id libero. Quisque neque magna, ultrices ac justo nec, rhoncus imperdiet risus.</p>
<kirby-x-spot-illustration [slot]="'end'" ${argsToTemplate(args)}></kirby-x-spot-illustration>
      
      </div>

      </kirby-card>
    `,
  }),
};

export const All: Story = {
  render: (args) => ({
    props: { illustrations: Object.keys(illustrations), ...args },
    template: `
      <table class="kirby-table">
        <thead>
        <th>Illustration Name</th>
        <th>Base</th>
        <th>Small</th>
        <th>medium</th>
        <th>Large</th>
        </thead>
        <tbody>
        <ng-container *ngFor="let illustration of illustrations">
          <tr>
            <td>{{ illustration }}</td>
            <td>
              <ng-container *ngTemplateOutlet="svgTemplate; context: { illustration, size: 'base'}"></ng-container>
            </td>
            <td>
              <ng-container *ngTemplateOutlet="svgTemplate; context: { illustration, size: 'sm'}"></ng-container>
            </td>
            <td>
              <ng-container *ngTemplateOutlet="svgTemplate; context: { illustration, size: 'md'}"></ng-container>
            </td>
            <td>
              <ng-container *ngTemplateOutlet="svgTemplate; context: { illustration, size: 'lg'}"></ng-container>
            </td>
          </tr>
        </ng-container>
        </tbody>
      </table>
      <ng-template #svgTemplate let-illustration="illustration" let-size="size">
        <kirby-x-spot-illustration [size]="size" [name]="illustration">
          <not-found> N/A</not-found>
        </kirby-x-spot-illustration>
      </ng-template>
    `,
  }),
};
