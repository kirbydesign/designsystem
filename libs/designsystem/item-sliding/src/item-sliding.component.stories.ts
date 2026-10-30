import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { ItemSlidingComponent } from '@kirbydesign/designsystem/item-sliding';
import { CardComponent } from '@kirbydesign/designsystem/card';
import { TestHelper } from '@kirbydesign/designsystem/testing';

// eslint-disable-next-line no-restricted-imports
import { idsOnSurfaces, pseudoStatesFor, renderOnSurfaces } from '../../.storybook/story-helpers';

const meta: Meta<ItemSlidingComponent> = {
  component: ItemSlidingComponent,
  title: 'Components / Item / ItemSliding',
  decorators: [
    moduleMetadata({
      imports: [ItemComponent, CardComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<ItemSlidingComponent>;

export const ItemSliding: Story = {
  args: {
    side: 'left',
    swipeActions: [
      {
        title: 'edit',
        type: 'success',
        onSelected: () => {},
      },
      {
        title: 'archive',
        type: 'warning',
        onSelected: () => {},
      },
      {
        title: 'delete',
        icon: 'trash',
        onSelected: () => {},
        type: 'danger',
      },
    ],
  },
  render: (args) => ({
    props: args,
    template: `<kirby-item-sliding ${argsToTemplate(args)}>
      <kirby-item>Item Sliding</kirby-item>
    </kirby-item-sliding>`,
  }),
};

const swipeActions = ItemSliding.args.swipeActions;

const swipeActionStates = ['default', 'hover', 'active'] as const;

const openItemSlidings = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const itemSlidings = Array.from(
    canvasElement.querySelectorAll<HTMLIonItemSlidingElement>('ion-item-sliding')
  );
  await TestHelper.whenReady(itemSlidings);

  itemSlidings.forEach((itemSliding) => {
    // Skip the slide animation, so the snapshot shows the item fully opened
    itemSliding.querySelector('ion-item').style.transition = 'none';
  });
  await Promise.all(itemSlidings.map((itemSliding) => itemSliding.open('start')));
};

export const SwipeActionStates: Story = {
  parameters: {
    pseudo: pseudoStatesFor(idsOnSurfaces('item-sliding', ['opened']), 'ion-item-option'),
  },
  render: renderOnSurfaces(
    `
    <p class="kirby-text-normal-bold">{{ surface }}</p>
    @for (state of states; track state) {
      <p class="kirby-text-small-light">{{ state }}</p>
      <kirby-item-sliding
        [attr.id]="'item-sliding-' + surface + '-opened-' + state"
        side="left"
        [swipeActions]="swipeActions"
      >
        <kirby-item>Item Sliding</kirby-item>
      </kirby-item-sliding>
    }
  `,
    '360px',
    { swipeActions, states: swipeActionStates }
  ),
  play: openItemSlidings,
};
