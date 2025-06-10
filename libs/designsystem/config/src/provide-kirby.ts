import {
  EnvironmentProviders,
  InjectionToken,
  makeEnvironmentProviders,
  Provider,
} from '@angular/core';
import { AnimationController, isPlatform, provideIonicAngular } from '@ionic/angular/standalone';
import { provideComponentInputBinding } from '@ionic/angular/common';
import {
  ModalController as IonModalController,
  PopoverController as IonPopoverController,
} from '@ionic/angular/standalone';
import {
  AngularDelegate as IonAngularDelegate,
  ConfigToken as IonConfigToken,
} from '@ionic/angular/common';
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
 *
 * @param features - Additional features to be provided to the Kirby environment:
 * @see {@link withGlobalSetup} for setting up global configuration.
 */
export function provideKirby(
  ...features: Provider[] | EnvironmentProviders[]
): EnvironmentProviders {
  return makeEnvironmentProviders([
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
    ...patchIonicProviders(),
    features,
  ]);
}

/**
 * Sets up global configuration when used with the provideKirby EnvironmentProvider function.
 * Should always be called exactly once per application when bootstrapping, to set up Kirby in the browsers runtime.
 *
 * @param config - (Optional) Additional configuration via the `KirbyConfig` object.
 */
export function withGlobalSetup(config?: KirbyConfig): EnvironmentProviders {
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

  // Store the configuration globally in the browser, so it can be accessed at runtime by components.
  setGlobalConfig(config);

  return makeEnvironmentProviders([provideIonicAngular(ionicConfig)]);
}

/**
 * Retrieves the global Kirby configuration object at runtime.
 * This function assumes that the configuration has been set up using `withGlobalConfig`.
 */
export function getGlobalConfig(): KirbyConfig | undefined {
  return (window as any).__KIRBY_CONFIG__ as KirbyConfig | undefined;
}

/**
 * Sets the global Kirby configuration object in the browser.
 *
 * @param config - `KirbyConfig` object to configure Kirby globally.
 */
function setGlobalConfig(config: KirbyConfig): void {
  if (!config) return;
  (window as any).__KIRBY_CONFIG__ = config;
}

function patchIonicProviders(): Provider[] {
  return [
    {
      provide: IonConfigToken,
      useValue: {},
    },
    provideComponentInputBinding(),
    IonAngularDelegate,
    IonPopoverController,
    IonModalController,
  ];
}
