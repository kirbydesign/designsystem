import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { CardComponent } from '@kirbydesign/designsystem/card';

// eslint-disable-next-line no-restricted-imports
import {
  idsOnSurfaces,
  interactionStates,
  pseudoStatesFor,
  renderOnSurfaces,
} from '../../../.storybook/story-helpers';

const meta: Meta = {
  title: 'Styles / Link',
  decorators: [
    moduleMetadata({
      imports: [CardComponent],
    }),
  ],
};
export default meta;

type Story = StoryObj;

export const InteractionStates: Story = {
  parameters: {
    // Focus ring on anchors is scoped to `:link:focus-visible`
    pseudo: { ...pseudoStatesFor(idsOnSurfaces('link', ['anchor', 'button'])), link: ['a[href]'] },
  },
  render: renderOnSurfaces(
    `
    <p class="kirby-text-normal-bold">{{ surface }}</p>
    <p class="kirby-text-small-light">Anchor</p>
    <p class="kirby-text-normal row">
      @for (state of states; track state) {
        <a [attr.id]="'link-' + surface + '-anchor-' + state" href="#">{{ state }}</a>
      }
    </p>
    <p class="kirby-text-small-light">Button</p>
    <p class="kirby-text-normal row">
      @for (state of states; track state) {
        <button [attr.id]="'link-' + surface + '-button-' + state" class="kirby-button-link">
          {{ state }}
        </button>
      }
    </p>
  `,
    'max-content',
    { states: interactionStates }
  ),
};
