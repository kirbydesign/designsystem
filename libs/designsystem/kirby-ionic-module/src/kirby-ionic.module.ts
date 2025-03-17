import { EnvironmentProviders, makeEnvironmentProviders, NgModule, Provider } from '@angular/core';
import { AnimationController, isPlatform, provideIonicAngular } from '@ionic/angular/standalone';
import type { IonicConfig } from '@ionic/core';

import { InjectionToken } from '@angular/core';

export interface KirbyConfig {
  focusManager?: boolean;
}

export const KIRBY_CONFIG = new InjectionToken<any>('KIRBY_CONFIG');

export function provideKirby(config?: KirbyConfig): EnvironmentProviders {
  const shouldHaveNoopAnimation = !isPlatform('hybrid');

  const navAnimationConfig: IonicConfig = shouldHaveNoopAnimation && {
    navAnimation: () => new AnimationController().create(),
  };

  const ionicConfig: IonicConfig = {
    mode: 'ios',
    ...navAnimationConfig,
  };

  ionicConfig.focusManagerPriority = config?.focusManager ? ['heading'] : undefined;

  const providers: Provider[] = [{ provide: KIRBY_CONFIG, useValue: config }];
  return makeEnvironmentProviders([...providers, provideIonicAngular(ionicConfig)]);
}

@NgModule({
  providers: [provideKirby({ focusManager: true })],
})
export class KirbyIonicModule {}
