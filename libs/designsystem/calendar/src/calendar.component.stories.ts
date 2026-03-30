import { type Meta, type StoryObj } from '@storybook/angular';

import { CalendarComponent } from '@kirbydesign/designsystem/calendar';
import { responsiveModes } from 'tools/storybook-config/shared-config';

const meta: Meta<CalendarComponent> = {
  component: CalendarComponent,
  title: 'Components / Calendar',
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
    selectedDate: new Date(2026, 2, 28),
    disabledDates: [],
    enabledDates: [],
    todayDate: new Date(2026, 2, 29),
  },
};

export const DisabledDates: Story = {
  args: {
    timezone: 'local',
    disableWeekends: false,
    disablePastDates: false,
    disableFutureDates: false,
    alwaysEnableToday: false,
    customLocales: {},
    selectedDate: null,
    todayDate: new Date(2026, 2, 29),
    disabledDates: [new Date(2026, 2, 29), new Date(2026, 2, 30), new Date(2026, 2, 31)],
    enabledDates: [],
  },
};
