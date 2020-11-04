export class TestHelper {
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
    timeout: number = 2000,
    pollInterval: number = 5
  ): Promise<void> {
    return new Promise((resolve) => {
      let timeoutId, intervalId;
      const pollState = () => {
        if (pollFunc()) {
          clearTimeout(timeoutId);
          clearInterval(intervalId);
          resolve();
        }
      };
      timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        resolve();
      }, timeout);
      intervalId = setInterval(pollState, pollInterval);
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
}
