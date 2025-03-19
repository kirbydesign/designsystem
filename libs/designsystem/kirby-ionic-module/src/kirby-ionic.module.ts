import {
  EnvironmentProviders,
  InjectionToken,
  makeEnvironmentProviders,
  Provider,
} from '@angular/core';
import { AnimationController, isPlatform, provideIonicAngular } from '@ionic/angular/standalone';
import type { IonicConfig } from '@ionic/core';

export interface KirbyConfig {
  moduleRootRoutePath?: string;
  focusManager?: boolean;
  setHtmlDocTitle?: boolean;
}

export const KIRBY_CONFIG = new InjectionToken<KirbyConfig>('KIRBY_CONFIG');

export function provideKirby(config?: KirbyConfig): EnvironmentProviders {
  const shouldHaveNoopAnimation = !isPlatform('hybrid');

  const navAnimationConfig: IonicConfig = shouldHaveNoopAnimation && {
    navAnimation: () => new AnimationController().create(),
  };

  const ionicConfig: IonicConfig = {
    mode: 'ios',
    ...navAnimationConfig,
    focusManagerPriority: config?.focusManager ? ['heading'] : undefined,
  };

  const providers: Provider[] = [];
  if (config) {
    providers.push({ provide: KIRBY_CONFIG, useValue: config });
  }

  return makeEnvironmentProviders([...providers, provideIonicAngular(ionicConfig)]);
}
