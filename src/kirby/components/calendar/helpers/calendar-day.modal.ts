export interface CalendarDay {
  content: CalendarDayContent;
}

export interface CalendarDayContent {
  date: Date;
  past: boolean;
  today: boolean;
  currentMonth: boolean;
  disabled: boolean;
  weekend: boolean;
  key: string;
}
