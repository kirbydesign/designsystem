import { View } from 'tns-core-modules/ui/content-view';

export class ViewHelper {
  /**
   * Used to safely invoke a function after a view is loaded. Prevents memory
   * leaks and issues when interacting with a view that may not yet be loaded.
   * @param view - A view which needs to be loaded before invoking a function.
   * @param func - A function which will be executed once the view is loaded.
   */
  public static invokeOnViewLoaded(view: View, func: Function): void {
    if (view.isLoaded) {
      // view may sometimes already be loaded before reaching on('loaded')
      func();
    } else {
      view.on('loaded', () => {
        func();
        view.off('loaded');
      });
    }
  }
}
