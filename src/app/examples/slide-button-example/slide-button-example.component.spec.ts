import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideButtonExampleComponent } from './slide-button-example.component';

describe('SlideButtonExampleComponent', () => {
  let component: SlideButtonExampleComponent;
  let fixture: ComponentFixture<SlideButtonExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SlideButtonExampleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideButtonExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
