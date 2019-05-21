export interface ModalConfig {
  title: string;
  closeBtnPlacement?: 'inside' | 'outside';
  closeIconName?: 'close' | 'arrow-back';
  dim?: number;
  component: any;
  componentProps?: { [key: string]: any };
}
