import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingOverlayShowcaseComponent } from './loading-overlay-showcase.component';

describe('LoadingOverlayShowcaseComponent', () => {
  let component: LoadingOverlayShowcaseComponent;
  let fixture: ComponentFixture<LoadingOverlayShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingOverlayShowcaseComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingOverlayShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
