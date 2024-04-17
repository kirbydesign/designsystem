export interface CalendarCell {
  date: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isSelectable: boolean;
  isSelected: boolean;
  cssClasses: string;
}
