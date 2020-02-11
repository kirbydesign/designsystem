export class TestHelper {
  /** Checks for the Ionic Web Component being hydrated, ie. the Shadow DOM is ready for query */
  public static whenHydrated(node: HTMLElement, timeout: number = 2000): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if already hydrated:
      if (node.classList.contains('hydrated')) {
        resolve();
        return;
      }
      const timeoutId = setTimeout(() => {
        reject('Timed out when waiting for hydrated element...');
      }, timeout);
      const mutationCallback = (mutations, observer) => {
        const isHydrated = mutations.some((mutation) => {
          return mutation.type === 'attributes' && mutation.target.classList.contains('hydrated');
        });
        if (isHydrated) {
          observer.disconnect();
          clearTimeout(timeoutId);
          resolve();
        }
      };
      const config = { attributes: true, attributeFilter: ['class'] };
      const observer = new MutationObserver(mutationCallback);
      observer.observe(node, config);
    });
  }

  public static getCssProperty(element: Element, propertyName: string) {
    return window.getComputedStyle(element).getPropertyValue(propertyName);
  }
}
