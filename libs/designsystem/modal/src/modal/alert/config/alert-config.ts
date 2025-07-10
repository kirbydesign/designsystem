import { Observable } from 'rxjs';

export interface AlertConfig {
  title: string | Observable<string>;
  message?: string | Observable<string>;
  cancelBtn?: string | Observable<string>;

  icon?: {
    name: string;
    themeColor?: string;
  };

  okBtn?:
    | string
    | Observable<string>
    | {
        text: string | Observable<string>;
        isDestructive: boolean;
      };
}
