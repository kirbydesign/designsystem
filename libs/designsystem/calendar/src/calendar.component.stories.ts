import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';

import { CalendarComponent } from './calendar.component';

const meta: Meta<CalendarComponent> = {
  component: CalendarComponent,
  title: 'CalendarComponent',
};
export default meta;
type Story = StoryObj<CalendarComponent>;

export const TestGrid: Story = {
  args: {
    timezone: 'local',
    disableWeekends: false,
    disablePastDates: false,
    disableFutureDates: false,
    alwaysEnableToday: false,
    customLocales: {},
    usePopover: true,
    selectedDate: null,
    disabledDates: [],
    enabledDates: [],
  },
  render: (args: CalendarComponent) => ({
    props: args,
    template: `<kirby-calendar ${argsToTemplate(args)}></kirby-calendar>`,
  }),
};
