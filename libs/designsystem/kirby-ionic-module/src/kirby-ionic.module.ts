import { NgModule } from '@angular/core';
import { AnimationController, IonicModule, isPlatform } from '@ionic/angular';
import { IonicConfig } from '@ionic/core';

const shouldHaveNoopAnimation = !isPlatform('hybrid');

const navAnimationConfig: IonicConfig = shouldHaveNoopAnimation && {
  navAnimation: () => new AnimationController().create(),
};

const config: IonicConfig = {
  mode: 'ios',
  inputShims: true,
  scrollAssist: true,
  scrollPadding: false,
  ...navAnimationConfig,
};

@NgModule({
  imports: [IonicModule.forRoot(config)],
  exports: [IonicModule],
})
export class KirbyIonicModule {}
