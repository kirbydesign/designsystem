export interface ModalWrapperConfig {
  title: string;
  titleHorizontalAlignment?: 'left' | 'center';
  closeIconName?: 'close' | 'arrow-back';
  dim?: number;
  component: any;
  componentProps?: undefined | { [key: string]: any };
}
