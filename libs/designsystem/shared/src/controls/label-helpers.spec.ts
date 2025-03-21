import { Component, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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

  forwardAttributes(sourceElement: HTMLElement, targetElement: HTMLElement, attributes: string[]) {
    forwardAttributes(sourceElement, targetElement, attributes, this.renderer);
  }
}

describe('AttributesDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let sourceElement: HTMLElement;
  let targetElement: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    sourceElement = fixture.debugElement.query(By.css('div#source')).nativeElement;
    console.log('sourceElement', sourceElement);

    targetElement = fixture.debugElement.query(By.css('div#target')).nativeElement;
    console.log('targetElement', targetElement);
  });

  it('should set attributes on the element', () => {
    sourceElement.setAttribute('aria-label', 'label');
    sourceElement.setAttribute('aria-labelledby', 'labelledby');

    fixture.componentInstance.forwardAttributes(sourceElement, targetElement, [
      'aria-label',
      'aria-labelledby',
    ]);

    expect(sourceElement.getAttribute('aria-label')).toBeNull();
    expect(sourceElement.getAttribute('aria-labelledby')).toBeNull();
    expect(targetElement.getAttribute('aria-label')).toBe('label');
    expect(targetElement.getAttribute('aria-labelledby')).toBe('labelledby');
  });
});
