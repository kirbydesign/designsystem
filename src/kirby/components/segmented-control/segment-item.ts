export interface SegmentItem {
  text: string;
  value: string;
  checked: boolean;
  badge?: {
    content: string;
    type: string;
  };
}
