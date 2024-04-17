export interface CalendarCell {
  date: number;
  month: number;
  isCurrentMonth: boolean;
  isSelectable: boolean;
  isSelected: boolean;
  cssClasses: string;
}
