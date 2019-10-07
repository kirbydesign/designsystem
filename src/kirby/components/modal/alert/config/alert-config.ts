export interface AlertConfig {
  title: string;
  message?: string;

  /**
   * @deprecated Will be deprecated in next major version. Use okBtn instead.
   */
  okBtnText?: string;

  cancelBtnText?: string;

  icon?: {
    iconName: string;
    themeColor?: string;
  };

  okBtn?: {
    text: string;
    isDestructive?: boolean;
  };
}
