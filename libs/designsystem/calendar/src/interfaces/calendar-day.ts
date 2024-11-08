export interface CalendarDay extends CalendarDayMetadata {
  date: number;
  monthIndex: number;
  year: number;
  ariaLabel: string;
}

export interface CalendarDayMetadata {
  isToday: boolean;
  isPast: boolean;
  isFuture: boolean;
  isWeekend: boolean;
  isCurrentMonth: boolean;
  isSelectable: boolean;
  isSelected: boolean;
  isFocussed: boolean;
  isFocusable: boolean;
}
