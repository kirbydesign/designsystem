export interface AlertConfig {
  title: string;
  message?: string;

  /**
   * @deprecated Will be deprecated in next major version. Use okBtn instead.
   */
  okBtnText?: string;

  /**
   * @deprecated Will be deprecated in next major version. Use `cancelBtn` instead.
   */
  cancelBtnText?: string;
  
  cancelBtn?: string;

  icon?: {
    iconName: string;
    themeColor?: string;
  };

  okBtn?: string | {
    text: string;
    isDestructive?: boolean;
  };
}
