import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DividerShowcaseComponent } from './divider-showcase.component';

describe('DividerShowcaseComponent', () => {
  let component: DividerShowcaseComponent;
  let fixture: ComponentFixture<DividerShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DividerShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DividerShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
