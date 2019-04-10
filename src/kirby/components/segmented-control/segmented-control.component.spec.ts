import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { By } from '@angular/platform-browser';

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
      checked: false,
      badge: {
        content: '2',
        type: 'danger',
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
      imports: [IonicModule.forRoot()],
      declarations: [SegmentedControlComponent, BadgeComponent],
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

  it('should call onSegmentClick when clicking a segment button', (done) => {
    spyOn(component, 'onSegmentClick');
    const segmentBtn = fixture.debugElement.query(By.css('ion-segment-button'));
    segmentBtn.nativeElement.componentOnReady().then(() => {
      // Wait for Ionic's shadowRoot to be available:
      setTimeout(() => {
        segmentBtn.nativeElement.shadowRoot.querySelector('button').click();
        fixture.detectChanges();
        expect(component.onSegmentClick).toHaveBeenCalled();
        done();
      }, 50);
    });
  });

  it('should set activeSegment to second segmentItem', () => {
    const segmentElm = fixture.debugElement.queryAll(By.css('ion-segment-button'))[1];
    segmentElm.triggerEventHandler('ionSelect', null);
    expect(component.activeSegment).toBe(items[1]);
  });
});
