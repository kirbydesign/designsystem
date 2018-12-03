import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridShowcaseComponent } from './grid-showcase.component';

describe('GridShowcaseComponent', () => {
  let component: GridShowcaseComponent;
  let fixture: ComponentFixture<GridShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
