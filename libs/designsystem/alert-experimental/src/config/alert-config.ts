import { Observable } from 'rxjs';

export interface AlertExperimentalConfig {
  title: string | Observable<string>;
  message?: string | Observable<string>;
  cancelButton?: string;

  icon?: {
    name: string;
    themeColor?: string;
  };

  okButton?:
    | string
    | {
        text: string;
        isDestructive: boolean;
      };
}
