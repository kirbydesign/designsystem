import {
  EnvironmentProviders,
  InjectionToken,
  makeEnvironmentProviders,
  Provider,
} from '@angular/core';
import { AnimationController, isPlatform, provideIonicAngular } from '@ionic/angular/standalone';
import type { IonicConfig } from '@ionic/core';
import { LoadingOverlayService } from '@kirbydesign/designsystem/loading-overlay';
import {
  ActionSheetHelper,
  AlertHelper,
  CanDismissHelper,
  ModalController,
  ModalHelper,
} from '@kirbydesign/designsystem/modal';
import { ResizeObserverFactory, ResizeObserverService } from '@kirbydesign/designsystem/shared';
import { ToastController, ToastHelper } from '@kirbydesign/designsystem/toast';

/**
 * Configuration object for global configuration of Kirby.
 */
export interface KirbyConfig {
  moduleRootRoutePath?: string;

  /**
   * Activate focus management for components rendered in a kirby-router-outlet.
   * When a kirby-page enters the view, focus will be set to the pages primary heading (h1) inside the pages toolbar.
   */
  focusManager?: boolean;

  /**
   * Set the HTML documents title to match the title of any kirby-page entering the view.
   */
  setHtmlDocTitle?: boolean;
}

/**
 * Injection token for provided Kirby configuration.
 */
export const KIRBY_CONFIG = new InjectionToken<KirbyConfig>('KIRBY_CONFIG');

/**
 * Sets up top level configuration and providers needed for the Kirby components.
 *
 * @param config - Optional configuration for the Kirby design system.
 */
export function provideKirby(config?: KirbyConfig): EnvironmentProviders {
  const providers: Provider[] = [
    ModalController,
    ActionSheetHelper,
    ModalHelper,
    AlertHelper,
    ToastHelper,
    ToastController,
    LoadingOverlayService,
    ResizeObserverFactory,
    ResizeObserverService,
    CanDismissHelper,
  ];

  if (config) providers.push({ provide: KIRBY_CONFIG, useValue: config });

  const shouldHaveNoopAnimation = !isPlatform('hybrid');

  // A no-op animation is parsed here when we are not on a native device,
  // to disable animation between pages on desktop browsers.
  const navAnimationConfig: IonicConfig = shouldHaveNoopAnimation && {
    navAnimation: () => new AnimationController().create(),
  };

  const ionicConfig: IonicConfig = {
    mode: 'ios',
    ...navAnimationConfig,
  };

  if (config?.focusManager) {
    ionicConfig.focusManagerPriority = ['heading'];
  }

  // Provide both Kirby and Ionic config as environment providers,
  // to avoid multiple conflicting configurations of global options.
  return makeEnvironmentProviders([...providers, provideIonicAngular(ionicConfig)]);
}
