import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullscreenModalExperimentalComponent } from './fullscreen.component';

describe('FullscreenComponent', () => {
  let component: FullscreenModalExperimentalComponent;
  let fixture: ComponentFixture<FullscreenModalExperimentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullscreenModalExperimentalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullscreenModalExperimentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
