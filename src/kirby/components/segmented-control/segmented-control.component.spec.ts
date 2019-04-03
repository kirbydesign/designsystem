import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as ionic from '@ionic/angular';

import { MockComponent } from 'ng-mocks';

import { SegmentedControlComponent } from './segmented-control.component';
import { SegmentItem } from './segment-item';

describe('SegmentedControlComponent', () => {
  let component: SegmentedControlComponent;
  let fixture: ComponentFixture<SegmentedControlComponent>;
  let segmentItems: SegmentItem[] = [
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
        MockComponent(ionic.IonButton),
        MockComponent(ionic.IonSegment),
        MockComponent(ionic.IonSegmentButton),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentedControlComponent);
    component = fixture.componentInstance;
    component.segmentItems = segmentItems;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have 2 segments buttons', () => {
    expect(fixture.nativeElement.querySelectorAll('ion-segment-button').length).toBe(2);
  });
});
