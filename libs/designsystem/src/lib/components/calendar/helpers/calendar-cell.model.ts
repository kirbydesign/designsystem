export interface CalendarCell {
  date: Date;
  isCurrentMonth: boolean;
  isSelectable: boolean;
  isSelected: boolean;
  cssClasses: string;
}
