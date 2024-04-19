import { NgModule } from '@angular/core';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { componentOnReady } from '@ionic/core';

@NgModule({
  providers: [provideIonicAngular({ mode: 'ios', _testing: true })],
})
class IonicTestingModule {}

export class TestHelper {
  public static readonly _init = TestHelper.muteIonicReInitializeWarning();

  public static disableAnimationsInTest() {
    //@ts-ignore
    window.Ionic = {
      config: {
        _testing: true,
      },
    };
  }

  public static muteIonicReInitializeWarning() {
    const originalWarn = console.warn;
    const patchedWarn = (warning: any, ...optionalParams: any[]) => {
      const suppress = `Ionic Angular was already initialized. Make sure IonicModule.forRoot() is just called once.`;
      if (warning !== suppress) originalWarn(warning, ...optionalParams);
    };
    console.warn = patchedWarn;
  }

  public static ionicModuleForTest = IonicTestingModule;

  /*
   * Checks for the Web Component(s) being ready,
   * ie. the component is hydrated, styles have been applied
   * and the Shadow DOM is ready for query
   */
  public static async whenReady(
    elementOrNodeList: Element | NodeListOf<Element> | Element[]
  ): Promise<void> {
    if (elementOrNodeList === undefined || elementOrNodeList === null)
      return Promise.reject('TestHelper.whenReady: Element is null or undefined');
    if (elementOrNodeList instanceof Element) {
      await TestHelper.whenDefined(elementOrNodeList);
      await TestHelper.ionComponentOnReady(elementOrNodeList);
    } else {
      await Promise.all(
        Array.from(elementOrNodeList).map(async (element) => await TestHelper.whenReady(element))
      );
    }
  }

  /* Checks for the Web Component being defined, ie. the public methods are available */
  public static async whenDefined(element: Element): Promise<void> {
    await customElements.whenDefined(element.localName);
  }

  /* Checks for the Ionic Web Component being ready, ie. the component is hydrated and styles applied */
  public static async ionComponentOnReady(element: Element): Promise<void> {
    await new Promise<void>((resolve) => {
      componentOnReady(element, () => resolve());
    });
  }

  public static async whenTrue(
    pollFunc: () => boolean,
    timeoutInMs: number = 2000,
    pollIntervalInMs: number = 5
  ): Promise<void> {
    if (pollFunc() === true) return Promise.resolve();
    return new Promise<void>((resolve, reject) => {
      let timeoutId, intervalId;
      const pollState = () => {
        const result = pollFunc();
        if (result === true) {
          clearTimeout(timeoutId);
          clearInterval(intervalId);
          resolve();
        }
      };
      timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        reject(
          `Error: Timeout - TestHelper.whenTrue function did not complete within ${timeoutInMs}ms`
        );
      }, timeoutInMs);
      intervalId = setInterval(pollState, pollIntervalInMs);
    });
  }

  public static getCssProperty(element: Element, propertyName: string, pseudoElt?: string) {
    return window.getComputedStyle(element, pseudoElt).getPropertyValue(propertyName).trim();
  }

  public static screensize = {
    phonesmall: { width: '320px', height: '568px' },
    phone: { width: '375px', height: '667px' },
    phablet: { width: '575px', height: '767px' },
    'phablet-landscape': { width: '767px', height: '575px' },
    tablet: { width: '768px', height: '1024px' },
    desktop: { width: '1200px', height: '900px' },
  };

  public static resizeTestWindow(size: { width?: string; height?: string }): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!window.frameElement) {
        console.warn('window.frameElement is undefined. Cannot resize test window.');
        reject();
      } else {
        const query = [];
        if (size.width) {
          query.push(`(max-width: ${size.width})`);
        }
        if (size.height) {
          query.push(`(max-height: ${size.height})`);
        }
        console.log(`Set test window size to: ${JSON.stringify(size)}`);
        (window.frameElement as HTMLIFrameElement).style.width = size.width;
        (window.frameElement as HTMLIFrameElement).style.height = size.height;
        const mediaQuery = window.matchMedia(query.join(' and '));
        if (mediaQuery.matches) {
          resolve();
        } else {
          // Ensure window has resized before executing:
          mediaQuery.onchange = (ev) => {
            if (ev.matches) {
              // Stop listening for changes:
              mediaQuery.onchange = null;
              resolve();
            }
          };
          console.log(`Awaiting media query to match: ${mediaQuery.media}`);
        }
      }
    });
  }

  public static resetTestWindow(): void {
    if (!window.frameElement) {
      console.warn('window.frameElement is undefined. Cannot resize test window.');
      return;
    }
    console.log('Resetting test window width');
    (window.frameElement as HTMLIFrameElement).style.width = null;
    (window.frameElement as HTMLIFrameElement).style.height = null;
  }

  public static scrollMainWindowToTop() {
    if (
      window.parent &&
      window.parent.document &&
      window.parent.document.documentElement &&
      window.parent.document.documentElement.scrollTop > 0
    ) {
      window.parent.document.documentElement.scrollTop = 0;
    }
  }

  public static waitForResizeObserver(): Promise<void> {
    return TestHelper.waitForTimeout(1);
  }

  public static waitForTimeout(timeoutInMs?: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, timeoutInMs));
  }
}

export type ScreenSize = keyof typeof TestHelper.screensize;
