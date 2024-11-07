export interface CalendarCell {
  date: number;
  monthIndex: number;
  year: number;
  isToday: boolean;
  isPast: boolean;
  isWeekend: boolean;
  isCurrentMonth: boolean;
  isSelectable: boolean;
  isSelected: boolean;
  isFocussed: boolean;
  isFocusable: boolean;
  ariaLabel: string;
}
