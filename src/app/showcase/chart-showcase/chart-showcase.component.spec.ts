import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartShowcaseComponent } from './chart-showcase.component';

describe('ChartShowcaseComponent', () => {
  let component: ChartShowcaseComponent;
  let fixture: ComponentFixture<ChartShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
