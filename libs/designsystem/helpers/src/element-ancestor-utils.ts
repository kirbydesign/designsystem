/* 
  Utility function to check if a given element 
  has an ancestor with a specific node name. 

  Can be given a 'stopNodeName' to limit the search
  as to not climb all the way up through the DOM tree. 

  Returns true when element has the ancestorNodeName 
  or an ancestor has the ancestorNodeName. 

  Returns false otherwise.
*/

export const elementHasAncestor = (
  element: HTMLElement,
  ancestorNodeName: string,
  stopNodeName?: string
) => {
  switch (element?.nodeName) {
    case undefined:
    case stopNodeName?.toUpperCase():
      return false;
    case ancestorNodeName.toUpperCase():
      return true;
    default:
      return elementHasAncestor(element.parentElement, ancestorNodeName, stopNodeName);
  }
};

/*
 * Utility function to find the closest ancestor modal and
 * get the element with a dialog role from within its shadow root.
 */
export function getIonModalDialogAncestor(currentElement: HTMLElement): HTMLElement | undefined {
  const ionModalElement = currentElement.closest('ion-modal');
  const modalElementDialog = ionModalElement?.shadowRoot?.querySelector(
    '[role="dialog"]'
  ) as HTMLElement;
  return modalElementDialog;
}
