export interface ListItem {
  id: number;
  title: string;
  subTitle: string;
  amount: string;
  detail: number;
  flagged: boolean;
  color: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'light';
}
