import { NgModule } from '@angular/core';
import { AnimationController, isPlatform, provideIonicAngular } from '@ionic/angular/standalone';
import { IonicConfig } from '@ionic/core';

const shouldHaveNoopAnimation = !isPlatform('hybrid');

const navAnimationConfig: IonicConfig = shouldHaveNoopAnimation && {
  navAnimation: () => new AnimationController().create(),
};

const config: IonicConfig = {
  mode: 'ios',
  ...navAnimationConfig,
};

@NgModule({
  providers: [provideIonicAngular(config)],
})
export class KirbyIonicModule {}
