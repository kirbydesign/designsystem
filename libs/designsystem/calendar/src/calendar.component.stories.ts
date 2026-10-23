import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { CalendarComponent } from '@kirbydesign/designsystem/calendar';
import { CardComponent } from '@kirbydesign/designsystem/card';
import { responsiveModes } from 'tools/storybook-config/shared-config';
// eslint-disable-next-line no-restricted-imports
import {
  gridStyles,
  interactionStates,
  pseudoStatesFor,
  surfaces,
} from '../../.storybook/story-helpers';

const meta: Meta<CalendarComponent> = {
  component: CalendarComponent,
  title: 'Components / Calendar',
  decorators: [
    moduleMetadata({
      imports: [CalendarComponent, CardComponent],
    }),
  ],
  parameters: {
    chromatic: {
      modes: {
        ...responsiveModes,
      },
    },
  },
};
export default meta;
type Story = StoryObj<CalendarComponent>;

export const Calendar: Story = {
  args: {
    timezone: 'local',
    disableWeekends: false,
    disablePastDates: false,
    disableFutureDates: false,
    alwaysEnableToday: false,
    customLocales: {},
    selectedDate: new Date(2024, 0, 1),
    disabledDates: [],
    enabledDates: [],
    todayDate: new Date(2024, 0, 2),
  },
};

export const DisabledDates: Story = {
  args: {
    todayDate: new Date(2024, 0, 1),
    selectedDate: new Date(2024, 0, 2),
    disabledDates: [new Date(2024, 0, 1)],
  },
};

export const InteractionStates: Story = {
  parameters: {
    pseudo: pseudoStatesFor(
      surfaces.map((surface) => `calendar-${surface}`),
      // Disabled days can't be interacted with
      'button.day:not([aria-disabled="true"])'
    ),
  },
  render: () => ({
    props: {
      surfaces,
      states: interactionStates,
      selectedDate: new Date(2024, 0, 10),
      todayDate: new Date(2024, 0, 15),
      disabledDates: [new Date(2024, 0, 17), new Date(2024, 0, 18)],
    },
    template: `
      <div class="grid">
        @for (state of states; track state) {
          <p class="kirby-text-small-light">{{ state }}</p>
        }
        @for (surface of surfaces; track surface) {
          @for (state of states; track state) {
            <kirby-card [variant]="surface" [hasPadding]="true">
              <kirby-calendar
                [attr.id]="'calendar-' + surface + '-' + state"
                [selectedDate]="selectedDate"
                [todayDate]="todayDate"
                [disabledDates]="disabledDates"
              ></kirby-calendar>
            </kirby-card>
          }
        }
      </div>
    `,
    styles: [gridStyles(interactionStates.length, '340px')],
  }),
};
