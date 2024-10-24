export interface CalendarCell {
  date: number;
  monthIndex: number;
  year: number;
  isCurrentMonth: boolean;
  isSelectable: boolean;
  isSelected: boolean;
  isFocussed: boolean;
  ariaLabel: string;
  cssClasses: string;
}
