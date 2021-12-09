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
