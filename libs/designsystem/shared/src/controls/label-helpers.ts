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

export function forwardAttributes(
  sourceElement: HTMLElement,
  targetElement: HTMLElement,
  attributes: string[],
  renderer: Renderer2
): void {
  console.log('sourceElement', sourceElement);
  console.log('targetElement', targetElement);
  if (!sourceElement || !targetElement) {
    return;
  }

  attributes.forEach((attribute) => {
    if (sourceElement.hasAttribute(attribute)) {
      const value = sourceElement.getAttribute(attribute);
      renderer.setAttribute(targetElement, attribute, value);
      renderer.removeAttribute(sourceElement, attribute);
    }
  });
}

export function inheritAttributes(
  element: HTMLElement,
  attributes: string[],
  renderer: Renderer2
): Record<string, any> {
  const inheritedAttributes: Record<string, any> = {};

  attributes.forEach((attribute) => {
    if (element.hasAttribute(attribute)) {
      inheritedAttributes[attribute] = element.getAttribute(attribute);
      renderer.removeAttribute(element, attribute);
    }
  });

  return inheritedAttributes;
}
