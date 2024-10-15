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
