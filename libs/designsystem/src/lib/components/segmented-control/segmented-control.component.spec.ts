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

  describe('default mode', () => {
    it("should have a 'default' mode when created", () => {
      expect(component.isDefaultMode).toBeTruthy();
      expect(component.isChipMode).toBeFalsy();
    });

    it('should have 2 segments buttons', () => {
      expect(fixture.nativeElement.querySelectorAll('ion-segment-button').length).toBe(2);
    });

    it('should not have any segmented chips', () => {
      expect(fixture.nativeElement.querySelectorAll('kirby-chip').length).toBe(0);
    });

    it('should call onSegmentSelect when clicking a segment button', () => {
      spyOn(component, 'onSegmentSelect');
      const segmentBtn = fixture.debugElement.query(By.css('ion-segment-button'));
      const button = segmentBtn.componentInstance as MockIonSegmentButtonComponent;
      button.ionSelect.emit();
      expect(component.onSegmentSelect).toHaveBeenCalled();
    });

    it('should set activeSegment to second segmentItem', () => {
      const segmentElm = fixture.debugElement.queryAll(By.css('ion-segment-button'))[1];
      segmentElm.triggerEventHandler('ionSelect', null);
      expect(component.activeSegment).toBe(items[1]);
    });
  });

  describe('chip mode', () => {
    beforeEach(() => {
      component.mode = 'chip';
      fixture.detectChanges();
    });

    it("should have a 'chip' mode when created", () => {
      expect(component.isDefaultMode).toBeFalsy();
      expect(component.isChipMode).toBeTruthy();
    });

    it('should not have any segments buttons', () => {
      expect(fixture.nativeElement.querySelectorAll('ion-segment-button').length).toBe(0);
    });

    it('should have 2 segmented chips', () => {
      expect(fixture.nativeElement.querySelectorAll('kirby-chip').length).toBe(2);
    });

    it('should call onSegmentSelect when clicking a segment chip', () => {
      spyOn(component, 'onSegmentSelect');
      fixture.debugElement.query(By.css('kirby-chip')).nativeElement.click();
      expect(component.onSegmentSelect).toHaveBeenCalled();
    });

    it('should set activeSegment to second segmentItem', () => {
      fixture.debugElement.queryAll(By.css('kirby-chip'))[1].nativeElement.click();
      expect(component.activeSegment).toBe(items[1]);
    });
  });
});
