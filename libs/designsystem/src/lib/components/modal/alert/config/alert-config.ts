import { Observable } from 'rxjs';

export interface AlertConfig {
  title: string | Observable<string>;
  message?: string | Observable<string>;
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
