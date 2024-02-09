import type { Meta, StoryObj } from '@storybook/angular';

import { CalendarComponent } from './calendar.component';

const meta: Meta<CalendarComponent> = {
  component: CalendarComponent,
  title: 'CalendarComponent',
};
export default meta;
type Story = StoryObj<CalendarComponent>;

export const Primary: Story = {
  args: {
    timezone: 'local',
    disableWeekends: false,
    disablePastDates: false,
    disableFutureDates: false,
    alwaysEnableToday: false,
    // locales: '',
    customLocales: {},
    usePopover: false,
    // selectedDate: '',
    // disabledDates: '',
    // enabledDates: '',
    // todayDate: '',
    // minDate: '',
    // maxDate: '',
  },
};
