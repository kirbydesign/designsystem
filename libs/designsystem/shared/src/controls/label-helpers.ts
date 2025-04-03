import { Renderer2 } from '@angular/core';

export function findItemLabel(element: HTMLElement): HTMLElement {
  const itemEl = element.closest('kirby-item');
  if (itemEl) {
    return itemEl.querySelector('kirby-label');
  }

  return null;
}

export function setAccessibleLabel(element: HTMLElement): string {
  const label = findItemLabel(element);
  if (label) {
    label.setAttribute('aria-hidden', 'true');
    return label.textContent;
  }
}

export function inheritAriaLabelText(element: HTMLElement): string {
  const attribute = 'aria-label';
  if (element.hasAttribute(attribute)) {
    const value = element.getAttribute(attribute);
    element.removeAttribute(attribute);
    return value;
  }
}

/**
 * Forwards specified attributes from a source element to a target element.
 *
 * @param sourceElement - The HTML element from which attributes will be removed from.
 * @param attributes - An array of attribute names to inherit from the source element.
 * @param renderer - An instance of Angular's Renderer2.
 * @param targetElement - (Optional) The HTML element to which the attributes should be applied.
 *                        If not provided, the attributes will only be removed from the source element.
 *
 * @returns A record of the inherited attributes and their values. If no attributes are inherited, an empty object is returned.
 */
export function forwardAttributes(
  sourceElement: HTMLElement,
  attributes: string[],
  renderer: Renderer2,
  targetElement?: HTMLElement
): Record<string, any> {
  const inheritedAttributes: Record<string, any> = {};

  if (!sourceElement || !attributes || attributes.length === 0) {
    return inheritedAttributes;
  }

  attributes.forEach((attribute) => {
    if (sourceElement.hasAttribute(attribute)) {
      const value = sourceElement.getAttribute(attribute);
      inheritedAttributes[attribute] = value;

      if (targetElement) {
        renderer.setAttribute(targetElement, attribute, value);
      }

      renderer.removeAttribute(sourceElement, attribute);
    }
  });

  return inheritedAttributes;
}
