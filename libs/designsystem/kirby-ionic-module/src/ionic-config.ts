import { AnimationController, isPlatform } from '@ionic/angular/standalone';
import { IonicConfig } from '@ionic/core';

const shouldHaveNoopAnimation = !isPlatform('hybrid');

const navAnimationConfig: IonicConfig = shouldHaveNoopAnimation && {
  navAnimation: () => new AnimationController().create(),
};

export const IONIC_CONFIG: IonicConfig = {
  mode: 'ios',
  ...navAnimationConfig,
};
