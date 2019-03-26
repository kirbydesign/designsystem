import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullscreenModalComponent } from './fullscreen-modal.component';

describe('FullscreenModalComponent', () => {
  let component: FullscreenModalComponent;
  let fixture: ComponentFixture<FullscreenModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FullscreenModalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullscreenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
