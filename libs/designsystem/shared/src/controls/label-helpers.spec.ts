import { Component, Renderer2 } from '@angular/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { forwardAttributes } from './label-helpers';

@Component({
  template: `
    <div id="source">
      <div id="target"></div>
    </div>
  `,
  imports: [],
})
class TestComponent {
  constructor(private renderer: Renderer2) {}

  myForwardAttributes(
    sourceElement: HTMLElement,
    attributes: string[],
    targetElement: HTMLElement
  ) {
    forwardAttributes(sourceElement, attributes, this.renderer, targetElement);
  }
}

describe('forwardAttributes', () => {
  let spectator: Spectator<TestComponent>;
  const createComponent = createComponentFactory(TestComponent);
  let sourceElement: HTMLElement;
  let targetElement: HTMLElement;

  beforeEach(() => {
    spectator = createComponent();
    sourceElement = spectator.query('div#source');
    targetElement = spectator.query('div#target');
  });

  it('should remove attributes from source element and add them target element', () => {
    sourceElement.setAttribute('aria-label', 'my-label');
    sourceElement.setAttribute('aria-labelledby', 'my-labelledby');

    spectator.component.myForwardAttributes(
      sourceElement,
      ['aria-label', 'aria-labelledby'],
      targetElement
    );

    expect(sourceElement.getAttribute('aria-label')).toBeNull();
    expect(sourceElement.getAttribute('aria-labelledby')).toBeNull();
    expect(targetElement.getAttribute('aria-label')).toBe('my-label');
    expect(targetElement.getAttribute('aria-labelledby')).toBe('my-labelledby');
  });
});
