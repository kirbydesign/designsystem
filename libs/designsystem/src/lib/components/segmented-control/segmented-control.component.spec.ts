import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponents, MockDirective } from 'ng-mocks';
import { IonSegment, IonSegmentButton } from '@ionic/angular';

import { SegmentedControlComponent } from './segmented-control.component';
import { SegmentItem } from './segment-item';
import { BadgeComponent } from '../badge/badge.component';
import { ThemeColorDirective } from '../../directives';

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
      declarations: [
        SegmentedControlComponent,
        IonSegment,
        MockComponents(BadgeComponent, IonSegmentButton),
        MockDirective(ThemeColorDirective),
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

    it('should call onSegmentSelect when ionChange event fires', () => {
      spyOn(component, 'onSegmentSelect');
      const segmentElm = fixture.debugElement.query(By.css('ion-segment'));
      segmentElm.triggerEventHandler(
        'ionChange',
        new CustomEvent('ionChange', { detail: { value: items[1] } })
      );
      expect(component.onSegmentSelect).toHaveBeenCalledWith(items[1]);
    });

    it('should set activeSegment to second segmentItem when ionChange event fires', () => {
      const segmentElm = fixture.debugElement.query(By.css('ion-segment'));
      segmentElm.triggerEventHandler(
        'ionChange',
        new CustomEvent('ionChange', { detail: { value: items[1] } })
      );
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
