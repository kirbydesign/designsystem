export interface ModalConfig {
  uid?: number;
  title: string;
  titleHorizontalAlignment?: 'left' | 'center';
  closeIcon?: 'close' | 'arrow';
  dim?: number;
  component: any;
}
