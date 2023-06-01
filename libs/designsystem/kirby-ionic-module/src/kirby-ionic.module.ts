import { NgModule } from '@angular/core';
import { AnimationController, IonicModule, isPlatform } from '@ionic/angular';
import { IonicConfig } from '@ionic/core';

const navAnimation: IonicConfig = !isPlatform('hybrid') && {
  navAnimation: () => new AnimationController().create(),
};

const config: IonicConfig = {
  mode: 'ios',
  inputShims: true,
  scrollAssist: true,
  scrollPadding: false,
  ...navAnimation,
};

@NgModule({
  imports: [IonicModule.forRoot(config)],
  exports: [IonicModule],
})
export class KirbyIonicModule {}
