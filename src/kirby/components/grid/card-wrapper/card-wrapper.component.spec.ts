import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardWrapperComponent } from './card-wrapper.component';

describe('CardWrapperComponent', () => {
  let component: CardWrapperComponent;
  let fixture: ComponentFixture<CardWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
