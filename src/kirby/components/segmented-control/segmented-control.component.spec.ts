import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import * as ionic from '@ionic/angular';

import { MockComponent } from 'ng-mocks';

import { SegmentedControlComponent } from './segmented-control.component';
import { SegmentItem } from './segment-item';
import { BadgeComponent } from '../badge/badge.component';

describe('SegmentedControlComponent', () => {
  let component: SegmentedControlComponent;
  let fixture: ComponentFixture<SegmentedControlComponent>;
  let items: SegmentItem[] = [
    {
      text: 'First item',
      id: 'first',
      checked: true,
      badge: {
        content: '2',
        type: 'danger',
      },
    },
    {
      text: 'Second item',
      checked: false,
      id: 'second',
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SegmentedControlComponent,
        MockComponent(BadgeComponent),
        MockComponent(ionic.IonBadge),
        MockComponent(ionic.IonButton),
        MockComponent(ionic.IonSegment),
        MockComponent(ionic.IonSegmentButton),
      ],
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
    const segmentElm = fixture.nativeElement.querySelectorAll('ion-segment-button')[0];
    segmentElm.checked = true;
    segmentElm.click();
    segmentBtn.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.onSegmentClick).toHaveBeenCalled();
  });
});
