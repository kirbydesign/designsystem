export interface SegmentItem {
  text: string;
  id: string;
  checked: boolean;
  badge?: {
    content: string;
    type: 'primary' | 'secondary' | 'tertiary' | 'alert' | 'success' | 'danger';
  };
}
