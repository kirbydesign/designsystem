import { NgModule } from '@angular/core';
import { IonicModule, isPlatform } from '@ionic/angular';

const getIonicConfig = () => {
  let config: any = {
    mode: 'ios',
    inputShims: true,
    scrollAssist: true,
    scrollPadding: false,
  };

  if (!isPlatform('hybrid')) {
    config = {
      ...config,
      navAnimation: () => null,
    };
  }

  return config;
};
@NgModule({
  imports: [IonicModule.forRoot(getIonicConfig())],
  exports: [IonicModule],
})
export class KirbyIonicModule {}
