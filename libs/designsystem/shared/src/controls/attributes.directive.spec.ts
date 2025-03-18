import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttributesDirective } from './attributes.directive';

@Component({
  template: `
    <div [kirbyAttributes]="attributes"></div>
  `,
  imports: [AttributesDirective],
})
class TestComponent {
  attributes: Record<string, any> = {};
}

describe('AttributesDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let element: ElementRef;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    element = fixture.debugElement.children[0];
  });

  it('should set attributes on the element', () => {
    const testAttributes = { id: 'test-id', role: 'button', disabled: true };
    fixture.componentInstance.attributes = testAttributes;
    fixture.detectChanges();

    expect(element.nativeElement.getAttribute('id')).toBe('test-id');
    expect(element.nativeElement.getAttribute('role')).toBe('button');
    expect(element.nativeElement.getAttribute('disabled')).toBe('true');
  });

  it('should update attributes when input changes', () => {
    fixture.componentInstance.attributes = { id: 'initial-id' };
    fixture.detectChanges();
    expect(element.nativeElement.getAttribute('id')).toBe('initial-id');

    fixture.componentInstance.attributes = { id: 'updated-id', title: 'tooltip' };
    fixture.detectChanges();
    expect(element.nativeElement.getAttribute('id')).toBe('updated-id');
    expect(element.nativeElement.getAttribute('title')).toBe('tooltip');
  });

  it('should remove attributes not present in the new input', () => {
    fixture.componentInstance.attributes = { id: 'test-id', role: 'button' };
    fixture.detectChanges();
    expect(element.nativeElement.getAttribute('role')).toBe('button');

    fixture.componentInstance.attributes = { id: 'test-id' };
    fixture.detectChanges();
    expect(element.nativeElement.getAttribute('role')).toBeNull();
  });
});
