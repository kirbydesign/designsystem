import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProgressBarComponent } from './progress-bar.component';

fdescribe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressBarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Progress input', () => {
    it('should default to zero, if negative progress is given as input', () => {
      component.progress = -1;
      component.ngOnInit();

      expect(component.progress).toBe(0);
    });

    it('should be zero, if zero is given as input', () => {
      component.progress = 0;
      component.ngOnInit();

      expect(component.progress).toBe(0);
    });

    it('should be one, if one is given as input', () => {
      component.progress = 1;
      component.ngOnInit();

      expect(component.progress).toBe(1);
    });

    it('should default to one-hundred, if progress above one-hundred is given as input', () => {
      component.progress = 101;
      component.ngOnInit();

      expect(component.progress).toBe(100);
    });
  });
});
