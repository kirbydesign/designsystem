import { type Meta, type StoryObj } from '@storybook/angular';

import { CalendarComponent } from '@kirbydesign/designsystem/calendar';
import { sharedChromaticModes } from 'tools/storybook-config/shared-parameters';

const meta: Meta<CalendarComponent> = {
  component: CalendarComponent,
  title: 'Components / Calendar',
  parameters: {
    chromatic: {
      modes: {
        ...sharedChromaticModes,
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
    usePopover: false,
    selectedDate: new Date(2024, 0, 1),
    disabledDates: [],
    enabledDates: [],
    todayDate: new Date(2024, 0, 2),
  },
};
