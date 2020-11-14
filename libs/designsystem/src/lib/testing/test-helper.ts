export class TestHelper {
  private static readonly _init = TestHelper.muteIonicReInitializeWarning();

  private static muteIonicReInitializeWarning() {
    const originalWarn = console.warn;
    const patchedWarn = (warning: any, ...optionalParams: any[]) => {
      const suppress = `Ionic Angular was already initialized. Make sure IonicModule.forRoot() is just called once.`;
      if (warning !== suppress) originalWarn(warning, ...optionalParams);
    };
    console.warn = patchedWarn;
  }

  /*
   * Checks for the Web Component being ready,
   * ie. the component is hydrated, styles have been applied
   * and the Shadow DOM is ready for query
   */
  public static async whenReady(element: Element): Promise<void> {
    await TestHelper.whenDefined(element);
    await TestHelper.ionComponentOnReady(element);
  }

  /* Checks for the Web Component being defined, ie. the public methods are available */
  public static async whenDefined(element: Element): Promise<void> {
    await customElements.whenDefined(element.localName);
  }

  /* Checks for the Ionic Web Component being ready, ie. the component is hydrated and styles applied */
  public static async ionComponentOnReady(element: Element): Promise<void> {
    const componentOnReady = (element as any).componentOnReady as () => Promise<void>;
    if (typeof componentOnReady === 'function') {
      await componentOnReady.bind(element)();
    }
  }

  public static async whenTrue(
    pollFunc: () => boolean,
    timeoutInMs: number = 2000,
    pollIntervalInMs: number = 5
  ): Promise<void> {
    return new Promise((resolve, reject) => {
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

  public static getCssProperty(element: Element, propertyName: string) {
    return window
      .getComputedStyle(element)
      .getPropertyValue(propertyName)
      .trim();
  }

  public static screensize = {
    phonesmall: { width: '320px', height: '568px' },
    phone: { width: '375px', height: '667px' },
    tablet: { width: '768px', height: '1024px' },
    desktop: { width: '1024px', height: '1366px' },
  };

  public static resizeTestWindow(size: { width?: string; height?: string }): Promise<void> {
    return new Promise((resolve, reject) => {
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
    return TestHelper.waitForTimeout();
  }

  public static waitForTimeout(timeoutInMs?: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, timeoutInMs));
  }
}
