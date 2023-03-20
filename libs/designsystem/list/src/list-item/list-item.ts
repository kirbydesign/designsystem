export interface ListItem {
  id: number;
  title: string;
  subTitle: string;
  amount: string;
  detail: number;
  flagged?: boolean; // why do we need this? I can see it in the cookbook, but I'm not sure what it is needed for.
  color: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'light' | 'white'; // What colors are actually allowed?
}
