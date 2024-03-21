import { type Meta, type StoryObj } from '@storybook/angular';

import { CalendarComponent } from './calendar.component';

const meta: Meta<CalendarComponent> = {
  component: CalendarComponent,
  title: 'CalendarComponent',
};
export default meta;
type Story = StoryObj<CalendarComponent>;

export const Default: Story = {
  args: {
    timezone: 'local',
    disableWeekends: false,
    disablePastDates: false,
    disableFutureDates: false,
    alwaysEnableToday: false,
    customLocales: {},
    usePopover: false,
    selectedDate: null,
    disabledDates: [],
    enabledDates: [],
    todayDate: new Date(2024, 0, 1),
  },
};
