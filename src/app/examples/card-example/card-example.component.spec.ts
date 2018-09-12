import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardExampleComponent } from './card-example.component';

describe('CardExampleComponent', () => {
  let component: CardExampleComponent;
  let fixture: ComponentFixture<CardExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
