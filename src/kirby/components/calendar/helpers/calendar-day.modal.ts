export interface CalendarDay {
  date: Date;
  past: boolean;
  today: boolean;
  weekend: boolean;
  currentMonth: boolean;
  selectable: boolean;
  selected: boolean;
  disabled: boolean;
}
