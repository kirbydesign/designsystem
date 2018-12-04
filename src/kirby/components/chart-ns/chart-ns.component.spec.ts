import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartNsComponent } from './chart-ns.component';

describe('ChartNsComponent', () => {
  let component: ChartNsComponent;
  let fixture: ComponentFixture<ChartNsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartNsComponent ],
      imports: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartNsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
