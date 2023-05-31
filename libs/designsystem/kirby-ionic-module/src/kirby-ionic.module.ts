import { NgModule } from '@angular/core';
import { AnimationController, IonicModule, isPlatform } from '@ionic/angular';

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
      navAnimation: () => new AnimationController().create(),
    };
  }

  return config;
};
@NgModule({
  imports: [IonicModule.forRoot(getIonicConfig())],
  exports: [IonicModule],
})
export class KirbyIonicModule {}
