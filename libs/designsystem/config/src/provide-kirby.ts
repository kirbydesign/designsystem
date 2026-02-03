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
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { createCustomElement } from '@angular/elements';
import { Injector } from '@angular/core';
//import { KirbyAccordionItemElement } from '@kirbydesign/core/accordion-item';

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
  //KirbyAccordionItemElement.define();
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
    {
      provide: 'KIRBY_REGISTER_ELEMENTS',
      multi: true,
      useFactory: (injector: Injector) => {
        if (!customElements.get('kirby-icon')) {
          const iconElement = createCustomElement(IconComponent, { injector });
          customElements.define('kirby-icon', iconElement);
        }
        return true;
      },
      deps: [Injector],
    },
  ]);
}

/**
 * Sets up global configuration when used with the provideKirby EnvironmentProvider function.
 * Should be called exactly once per application when bootstrapping, to set up Kirby in the browsers runtime.
 *
 * @param config - (Optional) Additional configuration via the `KirbyConfig` object.
 */
export function withGlobalSetup(config?: KirbyConfig): EnvironmentProviders {
  setGlobalConfig(config);

  const ionicConfig: IonicConfig = {
    ...getBaseIonicConfig(),
  };

  if (config?.focusManager) {
    ionicConfig.focusManagerPriority = ['heading'];
  }

  return makeEnvironmentProviders([provideIonicAngular(ionicConfig)]);
}

/**
 * Retrieves the global Kirby configuration object from the window object.
 */
export function getGlobalConfig(): KirbyConfig | undefined {
  return (window as any).__KIRBY_CONFIG__ as KirbyConfig | undefined;
}

/**
 * Private method to set the global Kirby configuration object on the window object.
 *
 * @param config - `KirbyConfig` object to configure Kirby globally.
 */
function setGlobalConfig(config: KirbyConfig | undefined): void {
  if (getGlobalConfig()) {
    console.warn(
      `Global Kirby configuration is already provided through withGlobalSetup() elsewhere. 
Overwriting the existing configuration is not recommended. Consider removing duplicate calls.`
    );
  }

  (window as any).__KIRBY_CONFIG__ = config ?? {};
}

/**
 * Returns the base Ionic configuration object with common defaults.
 */
function getBaseIonicConfig(): IonicConfig {
  const shouldHaveNoopAnimation = !isPlatform('hybrid');
  const navAnimationConfig: IonicConfig = shouldHaveNoopAnimation && {
    navAnimation: () => new AnimationController().create(),
  };

  return {
    mode: 'ios',
    ...navAnimationConfig,
  };
}

/**
 * Return same Ionic Angular providers as provideIonicAngular, but exclude the APP_INITIALIZER token.
 * https://github.com/ionic-team/ionic-framework/blob/v8.6.1/packages/angular/standalone/src/providers/ionic-angular.ts#L15
 * This is to ensure that we only initialize Ionic once in `withGlobalSetup`, where we use provideIonicAngular as intended,
 * but still allow other Angular contexts (e.g. Micro Frontends) to call provideKirby to get needed Kirby and Ionic config and providers in their context.
 */
function patchIonicProviders(): Provider[] {
  return [
    {
      provide: IonConfigToken,
      useValue: { ...getBaseIonicConfig(), ...(window as any)?.Ionic?.config },
    },
    provideComponentInputBinding(),
    IonAngularDelegate,
    IonPopoverController,
    IonModalController,
  ];
}
