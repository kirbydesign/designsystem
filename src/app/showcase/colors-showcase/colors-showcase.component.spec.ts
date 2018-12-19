import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorsShowcaseComponent } from './colors-showcase.component';

describe('ColorsShowcaseComponent', () => {
  let component: ColorsShowcaseComponent;
  let fixture: ComponentFixture<ColorsShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorsShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorsShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
