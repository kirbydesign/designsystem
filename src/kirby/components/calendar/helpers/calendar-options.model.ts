import { CalendarCell } from './calendar-cell.model';

export interface CalendarOptions {
  canNavigateBack: boolean;
  canNavigateForward: boolean;
  year: string;
  monthName: string;
  weekDays: string[];
  month: CalendarCell[][];
}
