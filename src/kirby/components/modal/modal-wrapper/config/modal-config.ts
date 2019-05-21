export interface ModalConfig {
  title: string;
  closeBtnPlacement?: 'inside' | 'outside' | 'hidden';
  closeIconName?: 'close' | 'arrow-back';
  titleHorizontalAlignment?: 'left' | 'center' | 'right';
  dim?: number;
  component: any;
  componentProps?: { [key: string]: any };
}
