import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { CardComponent } from '@kirbydesign/designsystem/card';

// eslint-disable-next-line no-restricted-imports
import {
  gridStyles,
  interactionStates,
  pseudoStatesFor,
  Surface,
  surfaces,
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

type LinkRow = {
  id: string;
  label: 'anchor' | 'button';
  surface: Surface;
};

const linkRows: LinkRow[] = surfaces.flatMap((surface) =>
  (['anchor', 'button'] as const).map((label) => ({
    label,
    surface,
    id: `link-${surface}-${label}`,
  }))
);

export const InteractionStates: Story = {
  parameters: {
    // Focus ring on anchors is scoped to `:link:focus-visible`
    pseudo: { ...pseudoStatesFor(linkRows.map((row) => row.id)), link: ['a[href]'] },
  },
  render: () => ({
    props: { rows: linkRows, states: interactionStates },
    template: `
      <div class="grid">
        @for (state of states; track state) {
          <p class="kirby-text-small-light">{{ state }}</p>
        }
        @for (row of rows; track row.id) {
          @for (state of states; track state) {
            <kirby-card [variant]="row.surface" [hasPadding]="true">
              <p class="kirby-text-normal">
                Text with
                @if (row.label === 'anchor') {
                  <a [attr.id]="row.id + '-' + state" href="#">anchor link</a>
                } @else {
                  <button [attr.id]="row.id + '-' + state" class="kirby-button-link">button link</button>
                }
                on {{ row.surface }}, {{ state }}
              </p>
            </kirby-card>
          }
        }
      </div>
    `,
    styles: [gridStyles(interactionStates.length, '220px')],
  }),
};
