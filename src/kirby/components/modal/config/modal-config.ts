export interface ModalConfig {
  uid?: number;
  title: string;
  titleHorizontalAlignment?: 'left' | 'center';
  closeIconName?: 'close' | 'arrow';
  dim?: number;
  component: any;
}
