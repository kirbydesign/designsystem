import { Observable } from 'rxjs';

export interface AlertConfig {
  title: string | Observable<string>;
  message?: string | Observable<string>;

  /**
   * @deprecated Will be deprecated in next major version. Use `okBtn` instead.
   */
  okBtnText?: string;

  /**
   * @deprecated Will be deprecated in next major version. Use `cancelBtn` instead.
   */
  cancelBtnText?: string;

  cancelBtn?: string;

  icon?: {
    name: string;
    themeColor?: string;
  };

  okBtn?:
    | string
    | {
        text: string;
        isDestructive: boolean;
      };
}
