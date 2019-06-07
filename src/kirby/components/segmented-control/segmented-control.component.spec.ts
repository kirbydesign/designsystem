import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, EventEmitter, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SegmentedControlComponent } from './segmented-control.component';
import { SegmentItem } from './segment-item';
import { BadgeComponent } from '../badge/badge.component';

// We were attempting to manipulate the shadow dom of IonSegmentButton to write a test
// that failed gloriously when changing unrelated code... creating a "good 'ol" Angular stub instead
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-segment-button',
  template: '',
})
class MockIonSegmentButtonComponent {
  @Output()
  ionSelect: EventEmitter<any> = new EventEmitter();
}

describe('SegmentedControlComponent', () => {
  let component: SegmentedControlComponent;
  let fixture: ComponentFixture<SegmentedControlComponent>;
  let items: SegmentItem[] = [
    {
      text: 'First item',
      id: 'first',
      checked: false,
      badge: {
        content: '2',
        themeColor: 'danger',
      },
    },
    {
      text: 'Second item',
      checked: true,
      id: 'second',
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SegmentedControlComponent, BadgeComponent, MockIonSegmentButtonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentedControlComponent);
    component = fixture.componentInstance;
    component.items = items;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 2 segments buttons', () => {
    expect(fixture.nativeElement.querySelectorAll('ion-segment-button').length).toBe(2);
  });

  it('should call onSegmentClick when clicking a segment button', () => {
    spyOn(component, 'onSegmentClick');
    const segmentBtn = fixture.debugElement.query(By.css('ion-segment-button'));
    const button = segmentBtn.componentInstance as MockIonSegmentButtonComponent;
    button.ionSelect.emit();
    expect(component.onSegmentClick).toHaveBeenCalled();
  });

  it('should set activeSegment to second segmentItem', () => {
    const segmentElm = fixture.debugElement.queryAll(By.css('ion-segment-button'))[1];
    segmentElm.triggerEventHandler('ionSelect', null);
    expect(component.activeSegment).toBe(items[1]);
  });
});
