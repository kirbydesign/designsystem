import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingOverlayExampleComponent } from './loading-overlay-example.component';

describe('LoadingExampleComponent', () => {
  let component: LoadingOverlayExampleComponent;
  let fixture: ComponentFixture<LoadingOverlayExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingOverlayExampleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingOverlayExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
