import { CalendarDay } from './calendar-day';

export interface CalendarOptions {
  canNavigateBack: boolean;
  canNavigateForward: boolean;
  year: string;
  monthName: string;
  weekDays: string[];
  month: CalendarDay[][];
}
