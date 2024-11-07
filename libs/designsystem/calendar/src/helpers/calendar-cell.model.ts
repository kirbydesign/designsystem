export interface CalendarCell extends CalendarCellMetadata {
  date: number;
  monthIndex: number;
  year: number;
  ariaLabel: string;
}

export interface CalendarCellMetadata {
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
